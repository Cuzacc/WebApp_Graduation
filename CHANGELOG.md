# Changelog

## [2026-04-19]
### Added
- **Multi-language Support**: Integrated VNI/ENG toggle for the Landing Page.
- **Admin Trash System**: Implementation of soft-deletion (moves to Trash) and hard-deletion for RSVPs and Guestbook messages.
- **Live Management**: New Admin tab to view and "Revoke" (soft-delete) data that is currently live.
- **Smooth Navigation**: Improved UX with smooth scrolling for landing page sections.
- **Admin Setup**: Initial admin user creation script and database initialization.

### Changed
- **Database Architecture**: Moved `graduation.db` from `backend/data` to a dedicated top-level `database/` directory for better DevOps volume management.
- **Backend Auth**: Downgraded `bcrypt` to version 3.2.2 to fix compatibility issues with `passlib`.
- **Frontend Logic**: Switched link navigation to programmatic scroll for better compatibility.

### Fixed
- Fixed API connectivity issues between Frontend and Backend (CORS and Path issues).
- Fixed a bug where admin login failed due to missing user in the new database location.
- Fixed `Not Found` errors on root backend access by clarifying API-only nature.
