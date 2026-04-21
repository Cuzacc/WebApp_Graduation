# 🚀 Hướng dẫn Triển khai dự án lên Google Compute Engine (GCE)

Đây là bản hướng dẫn "pháp bảo" giúp anh đưa dự án từ máy nhà lên thẳng server của Google.

## Bước 1: Chuẩn bị máy ảo (GCE Instance)
1. Truy cập **Google Cloud Console**.
2. Tạo 1 **VM Instance** (Khuyên dùng dòng `e2-micro` hoặc `e2-small` cho tiết kiệm).
3. **QUAN TRỌNG:** Trong phần Firewall, hãy tích chọn **"Allow HTTP traffic"** và **"Allow HTTPS traffic"**.

## Bước 2: Cài đặt Docker trên Server
Sau khi SSH vào server, anh hãy chạy các lệnh sau để cài đặt môi trường:

```bash
# Cài đặt Docker
sudo apt-get update
sudo apt-get install -y docker.io docker-compose

# Cho phép user hiện tại chạy docker mà không cần sudo
sudo usermod -aG docker $USER
# (Sau lệnh này anh hãy thoát SSH ra và đăng nhập lại để cập nhật quyền)
```

## Bước 3: Đưa code lên và chạy
1. Dùng Git để kéo code về:
   ```bash
   git clone [LINK_GITHUB_CỦA_ANH]
   cd Graduation
   ```
2. Tạo file `.env` trên server và điền thông tin (dùng bản mẫu từ máy nhà của anh).
3. Kích hoạt toàn bộ hệ thống:
   ```bash
   docker-compose up -d --build
   ```

## Bước 4: Kiểm chứng
1. Copy **External IP** của VM Instance dán vào trình duyệt.
2. Tận hưởng thành quả! 🎉

---
**Ghi chú:** Sau khi chạy lệnh ở Bước 3, dự án sẽ tự động chạy ngầm. Kể cả khi anh đóng cửa sổ SSH, web vẫn sẽ online 24/7!
