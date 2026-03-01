# TODO: Navbar Theme Update & User Account Section

## Plan:

1. [ ] Create `app/context/AuthContext.jsx` - Auth context to track user login state
2. [ ] Update `app/layout.js` - Add AuthProvider around children
3. [ ] Update `app/components/Navbar.jsx`:
   - [ ] Change theme: white background with blue accents (#083b66)
   - [ ] Check login state and show account dropdown instead of "Sign In" button
4. [ ] Update `app/login/page.jsx` - Update auth state after successful login
