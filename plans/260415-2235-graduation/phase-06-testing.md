# Phase 06: Testing & CI/CD Docker Environment
Status: ⬜ Pending
Dependencies: Phase-05

## Objective
Containerize môi trường ứng dụng và đảm bảo nó chạy ổn định, tự động deploy cơ bản cho chuẩn hóa DevOps.

## Requirements
- [ ] Backend và Frontend có thể chạy bằng Docker.
- [ ] Docker Compose có chứa Backend, Frontend và PostgreSQL.
- [ ] CI/CD pipeline test/build cơ bản trên GitHub Actions.

## Implementation Steps
1. [ ] Viết `Dockerfile` cho Frontend Next.js.
2. [ ] Viết `Dockerfile` cho Backend FastAPI.
3. [ ] Tạo `docker-compose.yml` ghép nối cả 3 dịch vụ: DB, API, Web.
4. [ ] Viết script `deploy.yml` cho GitHub Actions báo cáo kết quả build.

---
Next Phase: Done
