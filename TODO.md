# StellarMartBD - Comprehensive Fix Plan

## Issues Found:

### 1. Database Mismatch (CRITICAL)
- Backend uses Mongoose (MongoDB) in models but Sequelize with PostgreSQL in package.json
- Need to choose ONE database (PostgreSQL recommended for production)

### 2. Backend server.js Issues
- Doesn't properly import/use app.js
- Doesn't connect to database

### 3. Frontend API Configuration
- API points to localhost:5000 - needs environment variable for production

### 4. Already Fixed
- ✅ authStore.js - SSR handling
- ✅ globals.css - @import order

## Fix Plan:

- [ ] 1. Fix backend/server.js - Properly integrate app.js and database connection
- [ ] 2. Fix backend/src/models - Use Sequelize consistently (matching package.json)
- [ ] 3. Fix frontend/lib/api.js - Use environment variable for API URL
- [ ] 4. Create .env.example files for both frontend and backend
- [ ] 5. Verify all routes and controllers are properly connected
