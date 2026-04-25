from fastapi import FastAPI, Depends, HTTPException, status, BackgroundTasks
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List, Dict
import jwt

# Module nội bộ
import models, schemas, auth, mailer
from database import engine, get_db
from config import settings
from init_db import init_database

# Khởi tạo Database ngay khi code được load
init_database()

app = FastAPI(title="Graduation Web App API", description="Sức mạnh ngầm từ FastAPI và BackgroundTasks", version="1.0.0")

# ================= CẤU HÌNH CORS (Lấy từ biến môi trường) ================= #
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.ALLOWED_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ================= AUTHENTICATION CORES ================= #
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/admin/login")

def get_current_admin(token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Sói đóng giả cừu? Đừng hòng. Vui lòng xác thực lại Token.",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, auth.SECRET_KEY, algorithms=[auth.ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise credentials_exception
    except jwt.PyJWTError:
        raise credentials_exception
    
    admin = db.query(models.Admin).filter(models.Admin.username == username).first()
    if admin is None:
        raise credentials_exception
    return admin

# ================= PUBLIC ROUTES ================= #

@app.post("/api/rsvp", response_model=schemas.GuestResponse, tags=["Giao Diện Khách (Public)"])
def rsvp_submit(guest: schemas.GuestCreate, db: Session = Depends(get_db)):
    """Khách gửi biểu mẫu tham gia tiệc. Tất cả mặc định khóa ở trạng thái PENDING."""
    new_guest = models.Guest(**guest.model_dump())
    db.add(new_guest)
    db.commit()
    db.refresh(new_guest)
    return new_guest

@app.post("/api/guestbook", response_model=schemas.MessageResponse, tags=["Giao Diện Khách (Public)"])
def guestbook_submit(msg: schemas.MessageCreate, db: Session = Depends(get_db)):
    """Khách viết lưu bút gửi lên server."""
    new_msg = models.Message(**msg.model_dump())
    db.add(new_msg)
    db.commit()
    db.refresh(new_msg)
    return new_msg

@app.get("/api/messages", tags=["Giao Diện Khách (Public)"])
def get_approved_messages(db: Session = Depends(get_db)):
    """Lấy danh sách lời chúc đã được duyệt để hiển thị Public."""
    messages = db.query(models.Message).filter(models.Message.status == models.ApprovalStatus.APPROVED).order_by(models.Message.created_at.desc()).all()
    return messages


# ================= ADMIN ROUTES ================= #

@app.post("/api/admin/login", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    """Cửa lấy Token mở khóa cho Admin"""
    admin = db.query(models.Admin).filter(models.Admin.username == form_data.username).first()
    if not admin or not auth.verify_password(form_data.password, admin.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Tên đăng nhập hoặc Mật khẩu không đúng, vui lòng thử lại.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = auth.create_access_token(data={"sub": admin.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/api/admin/pending", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def get_pending_items(current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Quét và gom tất cả Rác/Thư chờ vào một JSON cho Bảng điều khiển (Dashboard)"""
    pending_guests = db.query(models.Guest).filter(models.Guest.status == models.ApprovalStatus.PENDING).all()
    pending_messages = db.query(models.Message).filter(models.Message.status == models.ApprovalStatus.PENDING).all()
    
    return {
        "pending_guests": pending_guests,
        "pending_messages": pending_messages
    }

@app.put("/api/admin/approve/guest/{guest_id}", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def approve_guest(guest_id: int, background_tasks: BackgroundTasks, current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Chốt hồ sơ Khách và Tự động xả Cò gửi Mail qua Background Worker"""
    guest = db.query(models.Guest).filter(models.Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Không truy xuất được hồ sơ khách VIP trong DB.")
    
    # 1. Logic Đổi trạng thái hiển thị
    guest.status = models.ApprovalStatus.APPROVED
    db.commit()
    
    # ======== TINH HOA DEVOPS: BACKGROUND WORKER ========
    # 2. Logic Ủy quyền gửi Mail cho Process chạy ngầm
    if guest.email:
        background_tasks.add_task(mailer.send_thank_you_email_background, guest.email, guest.name)
        
    return {"status": "success", "message": f"Duyệt danh tính {guest.name} thành công. Thư ngầm đã đưa vào hàng đợi."}

@app.put("/api/admin/approve/message/{msg_id}", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def approve_message(msg_id: int, current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Chốt thư rác xuất ra trang Public"""
    msg = db.query(models.Message).filter(models.Message.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Không truy xuất được bức thư.")
    
    msg.status = models.ApprovalStatus.APPROVED
    db.commit()
    return {"status": "success", "message": "Thư đã hiển thị thành công ngoài mặt tiền."}

@app.get("/api/admin/trash", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def get_trash_items(current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Lấy danh sách các rác nằm trong Thùng."""
    rejected_guests = db.query(models.Guest).filter(models.Guest.status == models.ApprovalStatus.REJECTED).order_by(models.Guest.created_at.desc()).all()
    rejected_messages = db.query(models.Message).filter(models.Message.status == models.ApprovalStatus.REJECTED).order_by(models.Message.created_at.desc()).all()
    return {
        "trash_guests": rejected_guests,
        "trash_messages": rejected_messages
    }

@app.get("/api/admin/approved", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def get_approved_items(current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Lấy danh sách các bản ghi ĐÃ DUYỆT (Đang Public)."""
    approved_guests = db.query(models.Guest).filter(models.Guest.status == models.ApprovalStatus.APPROVED).order_by(models.Guest.created_at.desc()).all()
    approved_messages = db.query(models.Message).filter(models.Message.status == models.ApprovalStatus.APPROVED).order_by(models.Message.created_at.desc()).all()
    return {
        "approved_guests": approved_guests,
        "approved_messages": approved_messages
    }

@app.put("/api/admin/reject/guest/{guest_id}", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def reject_guest(guest_id: int, current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Ném RSVP vào thùng rác (Soft Delete)."""
    guest = db.query(models.Guest).filter(models.Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Không tìm thấy.")
    guest.status = models.ApprovalStatus.REJECTED
    db.commit()
    return {"status": "success"}

@app.put("/api/admin/reject/message/{msg_id}", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def reject_message(msg_id: int, current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Ném thư vào thùng rác (Soft Delete)."""
    msg = db.query(models.Message).filter(models.Message.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Không tìm thấy.")
    msg.status = models.ApprovalStatus.REJECTED
    db.commit()
    return {"status": "success"}

@app.put("/api/admin/restore/guest/{guest_id}", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def restore_guest(guest_id: int, current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Phục hồi RSVP từ thùng rác về lại PENDING."""
    guest = db.query(models.Guest).filter(models.Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Không tìm thấy.")
    guest.status = models.ApprovalStatus.PENDING
    db.commit()
    return {"status": "success"}

@app.put("/api/admin/restore/message/{msg_id}", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def restore_message(msg_id: int, current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Phục hồi thư từ thùng rác về lại PENDING."""
    msg = db.query(models.Message).filter(models.Message.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Không tìm thấy.")
    msg.status = models.ApprovalStatus.PENDING
    db.commit()
    return {"status": "success"}

@app.delete("/api/admin/guest/{guest_id}", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def delete_guest_hard(guest_id: int, current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Xóa vĩnh viễn RSVP (Hard Delete)."""
    guest = db.query(models.Guest).filter(models.Guest.id == guest_id).first()
    if not guest:
        raise HTTPException(status_code=404, detail="Không tìm thấy.")
    db.delete(guest)
    db.commit()
    return {"status": "success"}

@app.delete("/api/admin/message/{msg_id}", tags=["Khu Vực Tuỵệt Mật (Admin)"])
def delete_message_hard(msg_id: int, current_admin: models.Admin = Depends(get_current_admin), db: Session = Depends(get_db)):
    """Xóa vĩnh viễn thư (Hard Delete)."""
    msg = db.query(models.Message).filter(models.Message.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Không tìm thấy.")
    db.delete(msg)
    db.commit()
    return {"status": "success"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
