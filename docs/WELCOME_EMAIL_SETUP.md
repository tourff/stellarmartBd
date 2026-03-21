# Gmail App Password দিয়ে Email Setup (সহজ উপায়) 

## Step 1: Gmail App Password তৈরি করুন
1. Gmail > Settings > See all settings > Security
2. 2-Step Verification চালু করুন
3. App passwords > Select app "Mail" > Select device "Other" > "StellarMartBD" লিখুন
4. 16 digit password কপি করুন (spaces ছাড়া)

## Step 2: .env.sample কপি
```
copy .env.sample .env
```

## Step 3: .env এ Gmail সেট করুন
```
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=yourgmail@gmail.com
EMAIL_PASS=abcd efgh ijkl mnop  # আপনার 16 digit app password
FROM_EMAIL="StellarMartBD <yourgmail@gmail.com>"
```

## Step 4: MongoDB (ঐচ্ছিক, test এর জন্য দরকার)
- mongodb.com/cloud/atlas > Free cluster > Connection string কপি

## Step 5: Restart server (Ctrl+C > npm run dev)

## Test
1. localhost:3000/register
2. নতুন signup
3. আপনার Gmail "Sent" folder চেক (welcome email পাঠানো হবে)

**হয়ে গেল! Gmail এ real email যাবে** 📧

**সমস্যা:** "535-5.7.8 Username and Password not accepted" = App Password ভুল / 2FA off
