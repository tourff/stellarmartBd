# Fix Plan for Vercel Build Error

## Issue
Error: `TypeError: Cannot destructure property 'auth' of 'a' as it is undefined` during `npm run build`

## Root Cause
The zustand store with persist middleware tries to access localStorage during server-side rendering (SSR/SSG), which doesn't exist on the server.

## Solution
1. Fix authStore.js to properly handle SSR hydration
2. Add onRehydrateStorage callback to track when hydration is complete

## Files to Edit
- frontend/lib/hooks/authStore.js
