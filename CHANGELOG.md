# StellarMartBD Changelog

## [v1.2.0] - Password Reset Verification (2024-12-04)
### Added
- README_PASSWORD_RESET.md - Complete Gmail OTP setup guide
- .env.local template with MongoDB + SMTP config

### Fixed
- Admin `/admin/users` blank page (useState/useEffect syntax)
- MongoDB connection error (env validation)
- CartDrawer.jsx syntax error blocking compilation

### Verified
- Password reset flow: /forgot-password → Gmail OTP → Reset
- Registration → Instant admin user list

**Live:** PR blackboxai/password-reset-verification
