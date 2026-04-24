# Changelog

## [2026-04-21]
### Added
- **Docker Infrastructure**: Added Dockerfiles for Backend (Python-slim) and Frontend (Multi-stage build).
- **Docker Compose**: Orchestrated Frontend, Backend, and Nginx Gateway for automated deployment.
- **Nginx Reverse Proxy**: Configured Nginx as a gateway for routing traffic between App and API.
- **Deployment Guide**: Created `GCE_DEPLOY_GUIDE.md` with step-by-step instructions for Google Cloud Platform.
- **Security Hardening**: Implemented Pydantic Field validation for input sanitization (length/value constraints).

### Changed
- **Unified Configuration**: Refactored backend to use a single `config.py` and centralized `.env` file management.
- **Global Deployment Readiness**: Updated CORS to support dynamic origins from environment variables.
- **Code Refactor**: Standardized datetime handling and removed dead code/redundant environment loading.

### Fixed
- Fixed insecure Secret Key fallback by generating a random cryptographically secure key in `.env`.
- Fixed potential Denial of Service (DoS) vulnerability via input validation.
- Fixed deprecated `utcnow()` calls in backend auth logic.

## [2026-04-19]
... (giữ nguyên phần cũ)
