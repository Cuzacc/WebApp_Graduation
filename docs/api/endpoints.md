# API Documentation - Graduation Web App

**Date Updated**: 2026-04-19
**Base URL**: `http://localhost:8000`

---

## 🌍 Public Interface

### POST `/api/rsvp`
Submit RSVP request.
- **Request Body**: `name`, `email` (opt), `relationship_type`, `attendees_count`.
- **Status**: Mặc định là `PENDING`.

### POST `/api/guestbook`
Submit a new message/wish to the guestbook.
- **Request Body**: `sender_name`, `content`.
- **Status**: Mặc định là `PENDING`.

### GET `/api/messages`
Fetch all `APPROVED` messages for public display.

---

## 🔐 Admin Protected (Requires JWT)

### POST `/api/admin/login`
Authenticate admin and receive token.
- **Form Data**: `username`, `password`.
- **Response**: `access_token`, `token_type: bearer`.

### GET `/api/admin/pending`
Retrieve all `PENDING` rsvps and messages.

### GET `/api/admin/approved`
Retrieve all `APPROVED` data currently visible on the site.

### GET `/api/admin/trash`
Retrieve all `REJECTED` items in the Recycle Bin.

### PUT `/api/admin/approve/{type}/{id}`
Approve a pending item. For RSVP with email, triggers background email sender.

### PUT `/api/admin/reject/{type}/{id}`
Soft-delete an item (Move to Trash).

### PUT `/api/admin/restore/{type}/{id}`
Restore an item from Trash back to Pending.

### DELETE `/api/admin/{type}/{id}`
Hard-delete (Permanently remove) an item from the database.
