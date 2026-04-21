# Design Specifications

## 🎨 Color Palette & Theming (Giao Diện Khách - Crimson/Gold)
| Name | Hex | Usage |
|------|-----|-------|
| Primary | #800000 | Crimson Red chủ đạo (Header, Nút nhấn) |
| Accent | #D4AF37 | Vàng Gold (Highlight viền, chữ nhấn mạnh) |
| Background | #FAFAFA | Nền xám khói nhẹ giữ sự sạch sẽ |
| Surface | #FFFFFF | Khung bao form RSVP, Lưu bút |
| Text Dark | #1F2937 | Chữ hiển thị thường |
| Text Light | #F9FAFB | Chữ hiển thị trên nền Đỏ |

## 🎨 Color Palette (Admin Dashboard - Tech/Dark Mode)
| Name | Hex | Usage |
|------|-----|-------|
| Admin Bg | #0f172a | Nền đen xanh thẫm |
| Admin Card | #1e293b | Nền của Layout/Metric boxes |
| Admin Text | #f1f5f9 | Chữ đọc trên nền tối |
| Success | #10b981 | Xanh lá cho nút Approve |
| Danger | #ef4444 | Đỏ gắt cho nút Reject, Delete |

## 📝 Typography
| Element | Font | Size | Weight |
|---------|------|------|--------|
| H1 (Tiêu đề chính)| Lora (hoặc Serif) | 48px | 700 |
| H2 (Đầu mục) | Lora | 36px | 600 |
| Body Text | Inter | 16px | 400 |
| Button/Menu | Inter | 14px | 600 |

## 🌍 Ngôn Ngữ (Internationalization)
App hỗ trợ Song Ngữ:
- **Tiếng Việt (Mặc định)**
- **Tiếng Anh (English)**
Công tắc chuyển ngôn ngữ (EN/VN Dropdown) tích hợp ngay trên Thanh điều hướng (Sticky Nav) ở màn hình khách.

## 📱 Breakpoints
| Name | Width | Description |
|------|-------|-------------|
| mobile | 375px | Thiết kế tối ưu Cuộn Dọc |
| tablet | 768px | Pad ngang |
| desktop | 1280px| Màn hình rộng hiển thị đầy đủ |

## 🔲 UI Components Specs (Cốt lõi)
- **Navigation (Sticky)**: Kéo màn hình thì thanh Menu luôn di chuyển theo trên đỉnh, ghim với nền bóng mờ (Blur Backdrop).
- **Trạng thái Pending Mode**: Admin xem rác với layout dạng Table hoặc Grid nhỏ để lướt siêu nhanh.
- **Glassmorphism (Trang Admin)**: Khung kính trong suốt cho các Widget báo Metrics.
