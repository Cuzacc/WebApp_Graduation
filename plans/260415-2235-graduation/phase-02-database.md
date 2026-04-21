# Phase 02: Database Schema & Authentication
Status: ✅ Complete
Dependencies: Phase-01

## Objective
Xây dựng mô hình cơ sở dữ liệu (PostgreSQL) phục vụ lưu lời chúc, số RSVP và trạng thái chờ duyệt. Thiết lập cơ chế đăng nhập Admin.

## Requirements
- [x] Bảng cấu trúc lưu lời chúc và thông tin người đến tham dự (RSVP).
- [x] Form lấy thông tin RSVP có thêm trường `email` (Optional) để tiện việc gửi thư cảm ơn.
- [x] Có cơ chế Authentication cho Admin bằng tài khoản tĩnh hoặc JWT cơ bản.

## Implementation Steps
1. [x] Cài đặt SQLAlchemy/Alembic cho FastAPI.
2. [x] Cấu hình Models (Guest với `email` nullable, Message, AdminAuth, Status).
3. [x] Viết Scripts init database.

---
Next Phase: phase-03-backend.md
