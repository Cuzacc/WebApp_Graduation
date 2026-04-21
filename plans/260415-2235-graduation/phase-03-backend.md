# Phase 03: Backend API (FastAPI)
Status: ✅ Complete
Dependencies: Phase-02

## Objective
Xây dựng các REST / GraphQL API để Frontend gọi xuống tương tác với DB.

## Requirements
- [x] API gởi RSVP (có field `email`), gửi lưu bút.
- [x] API riêng cho Admin (Có kiểm tra bảo mật bằng Token/Cookie) để lấy dữ liệu PENDING và duyệt APPROVED.
- [x] **Background Task**: Khởi tạo logic gửi email hàng loạt để gửi lời cảm ơn và link hình ảnh cho khách đã để lại Email. Tích hợp Python `smtplib` hoặc thư viện Mailer.

## Implementation Steps
1. [x] Tạo endpoint `POST /api/rsvp`
2. [x] Tạo endpoint `POST /api/guestbook`
3. [x] Tạo endpoint `GET /api/admin/pending` (Requires Auth)
4. [x] Tạo endpoint `PUT /api/admin/approve/{id}` (Requires Auth)
5. [x] Tạo logic worker/background task gửi mail cực kỳ ngầu.

---
Next Phase: phase-04-frontend.md
