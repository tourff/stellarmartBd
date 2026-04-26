# Comprehensive E-Commerce Bug Fixing & Feature Development Guide

**Role & Objective:**
Act as a Senior Full-Stack Developer and Architect. I am currently building a full-stack E-commerce web application. I have encountered several critical bugs and need to implement some complex core features. I need your expert guidance to resolve these issues permanently and efficiently.

**CRITICAL WORKFLOW RULE:**
Do **NOT** give me solutions for all tasks at once. We will follow a strict **step-by-step, interactive process**. 
1. I will present the task.
2. You will tell me exactly which code files or components you need to see from my project to understand the current implementation.
3. Once I provide the code, you will give me the exact modifications needed.
4. Only after I confirm a task is 100% fixed, we will move to the next task.

Here is the complete list of tasks we need to accomplish:

---

## Task 1: Fix "CategoryItem is not defined" Error on Mobile Navbar
* **Symptom:** The desktop category menu works perfectly. However, on the mobile view, when a user clicks the 3-dot hamburger/category menu, the application crashes entirely with a white screen showing: `Application error: a client-side exception has occurred`.
* **Console Log Details:** The browser console shows `ReferenceError: CategoryItem is not defined at Array.map...`.
* **Action Required:** This is a client-side rendering error caused by an unimported or missing component inside a `.map()` function. Once we start this task, ask me for my mobile navigation component or header layout file so we can correctly import `CategoryItem` or fix the logic.

## Task 2: Implement Strict Route Protection for Admin Panel
* **Symptom:** Currently, my base admin route (`/admin`) correctly redirects unauthorized users to a login page. However, the system is flawed because a user can completely bypass authentication by manually typing sub-routes like `/admin/dashboard` in the browser URL.
* **Action Required:** We need to secure the entire `/admin/*` directory. Depending on my framework (which I will confirm when we start this task), guide me on how to set up robust route protection. This could be through Next.js Middleware, React Router protected routes, or an Auth Context wrapper, ensuring no deep link inside `/admin` can be accessed without a valid admin session.

## Task 3: Build robust Email Notification System (Auth & Password Reset)
* **Symptom:** The account creation process currently has no email verification. Furthermore, the "Forgot Password" flow is inactive—it doesn't trigger any password reset emails.
* **Action Required:** We need to build a secure email service. 
    * Guide me on setting up a mail transporter (e.g., Nodemailer with SMTP, Resend, or SendGrid).
    * Write the backend logic to generate secure, time-limited cryptographic tokens.
    * Create the API endpoints to handle saving these tokens to the database and dispatching the emails with proper verification/reset links.

## Task 4: Fix Admin Panel "User Deletion" & Counter Synchronization
* **Symptom:** Inside the admin panel, clicking "Delete" on a user account does not permanently remove them from the database. Consequently, the "Total Users" counter displayed at the top of the dashboard remains unchanged and incorrectly counts deleted/inactive users.
* **Action Required:** * First, we need to inspect my backend Delete User API route and fix the database query so it actually drops the document/row.
    * Second, we need to ensure the dashboard counter query dynamically counts only active users, or update the frontend state immediately upon successful deletion to reflect the new count without a page reload.

## Task 5: Architect and Implement a Complete Wishlist System
* **Symptom:** The e-commerce site is missing a wishlist functionality.
* **Action Required:** Guide me through a full-stack implementation:
    1. **Database Schema:** How to structure the wishlist (e.g., an array of product IDs inside the User model, or a separate Wishlist table).
    2. **Backend APIs:** Creating RESTful endpoints or Server Actions to Add, Remove, and Fetch wishlist items.
    3. **Frontend UI & State:** Adding interactive "Heart" toggle buttons on product cards, and creating a dedicated `/wishlist` page. We also need to manage the global state so the wishlist counter updates instantly.

## Task 6: Integrate Firebase "Login with Google" authentication
* **Symptom:** I need to provide social login via Google.
* **Current Assets:** I already have my Firebase configuration ready:

```javascript
// My Firebase Config
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDqm4nmVat2hmcUijB6t37ttZotGsCc6hc",
  authDomain: "stellarmartbd-a0d4b.firebaseapp.com",
  projectId: "stellarmartbd-a0d4b",
  storageBucket: "stellarmartbd-a0d4b.firebasestorage.app",
  messagingSenderId: "108894961552",
  appId: "1:108894961552:web:9f909d9b566c3845c7fd15",
  measurementId: "G-HPH0XPK1FQ"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);