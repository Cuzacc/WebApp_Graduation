from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from models import ApprovalStatus, RelationshipType

# --- GUEST (Khách mời) ---
class GuestBase(BaseModel):
    name: str = Field(..., max_length=100, description="Tên khách mời")
    email: Optional[EmailStr] = None
    relationship_type: RelationshipType = RelationshipType.FRIEND
    attendees_count: int = Field(1, gt=0, le=50, description="Số người đi cùng (1-50)")

class GuestCreate(GuestBase):
    pass

class GuestResponse(GuestBase):
    id: int
    status: ApprovalStatus
    created_at: datetime

    class Config:
        from_attributes = True

# --- MESSAGE (Lưu bút) ---
class MessageBase(BaseModel):
    sender_name: str = Field(..., max_length=100, description="Tên người gửi")
    content: str = Field(..., max_length=1000, description="Nội dung lời chúc")

class MessageCreate(MessageBase):
    pass

class MessageResponse(MessageBase):
    id: int
    status: ApprovalStatus
    created_at: datetime

    class Config:
        from_attributes = True

# --- ADMIN (Tài khoản) ---
class AdminCreate(BaseModel):
    username: str
    password: str

class AdminResponse(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True
