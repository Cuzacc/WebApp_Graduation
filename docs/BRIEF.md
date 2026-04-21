# 💡 BRIEF: Graduation App

**Ngày tạo:** 2026-04-15
**Hình thức:** Web App

---

## 1. VẤN ĐỀ CẦN GIẢI QUYẾT
- Cần một công cụ để hỗ trợ và lưu trữ kỷ niệm lễ tốt nghiệp (gom thông tin, hình ảnh, lời chúc từ bạn bè/người thân về một chỗ).
- Tạo ra một dự án cá nhân hoàn chỉnh, có người thật sử dụng thật, để anh có thể đưa vào CV ứng tuyển vị trí DevOps.

## 2. GIẢI PHÁP ĐỀ XUẤT
Phát triển một Web App có frontend thân thiện với khách mời và một backend + hạ tầng được thiết kế chỉn chu để khoe kỹ năng giám sát, tự động hóa (CI/CD) trong quá trình vận hành dự án.

## 3. ĐỐI TƯỢNG SỬ DỤNG
- **Khách mời (Friends & Family):** Xem thông tin lễ tốt nghiệp, nhập lời chúc, tải ảnh chụp chung lên.
- **Admin (Anh):** Theo dõi số người đến duyệt, kiểm duyệt ảnh và giám sát các thông số hệ thống.

## 4. TÍNH NĂNG VÀ LỘ TRÌNH PHÁT TRIỂN

### 🚀 Phase 1: Bản MVP (Ra mắt trước)
Tập trung vào giá trị cốt lõi, hoàn thành nhanh nhất có thể:
- [ ] **Trang Chủ & Đếm ngược:** Giao diện đếm ngược tới lễ nhận bằng.
- [ ] **RSVP (Xác nhận tham gia):** Form thu thập thông tin xem ai đi được.
- [ ] **Sổ lưu bút cơ bản:** Khách có thể viết lưu bút và hệ thống lưu vào cơ sở dữ liệu.
- [ ] **Hiển thị thư viện ảnh:** (Chỉ ở mức hiển thị một vài bức hình tĩnh anh tự chọn trước).

### 🎁 Phase 2: Feature Expansion (Nâng cấp & Trải nghiệm)
- [ ] **Bản đồ & Lịch trình:** Trạm đỗ xe và khu vực chụp ảnh theo giờ.
- [ ] **Upload ảnh từ khách:** Cho phép khách tải ảnh chất lượng lên.
- [ ] **Lọc thư viện ảnh:** Filter bằng thẻ (Gia đình, Bạn đại học, Thầy cô).
- [ ] **Dashboard Admin:** Quản lý dữ liệu người thân đăng ký và duyệt/xóa ảnh mờ/lỗi.
- [ ] **Mã QR:** In ra thiệp + Nhạc nền Lofi.

### 🛠️ Phase 3: DevOps Showpiece (Vũ khí cho CV)
- [ ] **Background Processing (Worker):** Chuyên đi nén (resize) ảnh do khách up lên.
- [ ] **Live System Dashboard:** Một trang để show off trạng thái CPU, tốc độ phản hồi server.
- [ ] **Cơ sở hạ tầng Code:** Tự động hóa Deploy CI/CD và Containerize (Docker).

## 5. ƯỚC TÍNH
- **Độ phức tạp ban đầu (Phase 1):** Đơn giản - phù hợp làm nhanh để kiểm thử.
- **Điểm cần lưu ý:** Cần phân chia Database và Backend khéo léo ở Phase 1 để đón đầu phần cấu trúc Hạ tầng (DevOps) rất phức tạp ở Phase 3.

## 6. BƯỚC TIẾP THEO
→ Chạy `/plan` để bắt đầu lên thiết kế chi tiết (Database, Frontend/Backend tech stack).
