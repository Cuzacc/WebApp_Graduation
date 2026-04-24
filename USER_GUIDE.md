# 📖 Hướng dẫn Sử dụng Hệ thống Quản lý Tiệc Tốt nghiệp (Graduation App)

Chào mừng anh/chị đến với ứng dụng quản lý tiệc tốt nghiệp. Đây là tài liệu hướng dẫn nhanh để người dùng (Khách mời) và Quản trị viên (Admin) làm chủ hệ thống.

---

## 🌟 1. Dành cho Khách mời (Guest)

Giao diện chính của web là nơi khách mời tương tác. Hệ thống hỗ trợ song ngữ **Tiếng Việt (VNI)** và **Tiếng Anh (ENG)**.

### 📩 Gửi RSVP (Xác nhận tham dự)
1. Tại trang chủ, tìm mục **"Xác nhận tham dự / RSVP"**.
2. Điền đầy đủ thông tin: Họ tên, Email, Mối quan hệ.
3. Nhấn **Gửi (Submit)**.
4. **Lưu ý:** Sau khi được Admin duyệt, bạn sẽ nhận được một email xác nhận tự động.

### ✍️ Gửi Lời chúc (Guestbook)
1. Tìm mục **"Lời chúc / Guestbook"**.
2. Viết những lời chúc ý nghĩa của bạn dành cho chủ nhân bữa tiệc.
3. Sau khi gửi, lời chúc sẽ ở trạng thái **Chờ duyệt** (không hiển thị ngay lập tức để tránh tin nhắn rác).

---

## 🔐 2. Dành cho Quản trị viên (Admin Dashboard)

Đây là nơi kiểm soát toàn bộ dữ liệu của bữa tiệc.

### 🔑 Đăng nhập
1. Truy cập vào đường dẫn: `[URL_WEB]/admin` (hoặc nút Admin ở chân trang).
2. Tài khoản mặc định: `admin` / `password123`.

### 🗃️ Quản lý dữ liệu (Duyệt/Xóa)
Hệ thống chia làm 3 khu vực chính:
1. **Pending (Chờ duyệt):** Nơi chứa RSVP và Lời chúc mới gửi đến.
    - Nhấn **Approve (Duyệt):** Dữ liệu sẽ được hiển thị công khai và gửi mail (đối với RSVP).
    - Nhấn **Reject (Từ chối):** Dữ liệu sẽ bị đẩy vào Thùng rác.
2. **Approved (Đang hiển thị):** Nơi chứa những khách và lời chúc đã được duyệt.
    - Anh có thể nhấn **Revoke (Thu hồi)** nếu muốn đưa trở lại Thùng rác.
3. **Trash (Thùng rác):** Nơi chứa dữ liệu đã bị xóa tạm thời (Soft Delete).
    - **Restore (Khôi phục):** Đưa dữ liệu trở lại trạng thái ban đầu.
    - **Delete Forever (Xóa vĩnh viễn):** Xóa hoàn toàn khỏi cơ sở dữ liệu.

---

## 🌐 3. Tính năng Đa ngôn ngữ
- Ở góc trên cùng bên phải màn hình, nhấn vào biểu tượng **VNI/ENG** để chuyển đổi ngôn ngữ toàn bộ giao diện.

---

## 🛠️ Hỗ trợ kỹ thuật
Dự án được vận hành trên nền tảng Docker. Nếu web gặp sự cố hoặc cần bảo trì:
1. SSH vào server.
2. Chạy lệnh: `docker-compose restart` để khởi động lại toàn bộ dịch vụ.

---
*Chúc anh có một buổi lễ tốt nghiệp thật tuyệt vời!* 🎓
