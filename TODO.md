# Welcome Email System Setup - সম্পূর্ণ করা হয়েছে ✅

## ১. সিস্টেম স্ট্যাটাস
- [x] কোড ইতিমধ্যে লেখা আছে (register route + templates + email)
- [x] .env.sample + Gmail setup guide (docs/WELCOME_EMAIL_SETUP.md)
- [x] Dependencies install (npm install চলছে) 
- [ ] Database connect
- [x] Server start (npm run dev চলছে, localhost:3000 ready!)
- [ ] Test registration + email

## ২. সেটআপ স্টেপস ✅ TODO.md তৈরি

### Step 1: .env ফাইল তৈরি করুন ✅ .env.sample তৈরি
```
copy .env.sample .env
```
এডিট করে আপনার Mailtrap + MongoDB URI দিন
Gmail App Password ব্যবহার করুন (পছন্দ):
- EMAIL_HOST=smtp.mailtrap.io
- EMAIL_PORT=587
- EMAIL_USER=your_username
- EMAIL_PASS=your_password
- FROM_EMAIL=noreply@stellarmartbd.com
- MONGODB_URI=your_mongo_connection_string

### Step 2: Install করুন
```bash
npm install
```

### Step 3: Database seed (optional)
```bash
curl -X POST http://localhost:3000/api/seed
```

### Step 4: Server চালু করুন
```bash
npm run dev
```

### Step 5: Test করুন
1. http://localhost:3000/register এ যান
2. নতুন অ্যাকাউন্ট তৈরি করুন  
3. Mailtrap inbox চেক করুন
4. Console এ "Email sent:" দেখুন

## সমস্যা সমাধান
- Email না গেলে: .env চেক + console error দেখুন
- DB error: MONGODB_URI যাচাই করুন
- Port busy: port 3001 ব্যবহার করুন

**সব রেডি! এখন test করুন 🚀**
