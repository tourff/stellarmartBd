export const welcomeEmailHTML = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Welcome to StellarMartBD!</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #f8f9ff; padding: 40px 20px; border-radius: 0 0 12px 12px; }
    .button { background: #4f46e5; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: 600; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    h1 { margin: 0 0 10px 0; font-size: 28px; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Welcome, ${name}!</h1>
    <p>Thanks for joining StellarMartBD</p>
  </div>
  <div class="content">
    <h2>Let's get started!</h2>
    <p>We're excited to have you on board. Your account is ready to use.</p>
    <ul style="padding-left: 20px;">
      <li>Browse thousands of products</li>
      <li>Add items to your cart</li>
      <li>Checkout securely</li>
      <li>Track your orders</li>
    </ul>
    <div style="text-align: center; margin: 30px 0;">
      <a href="http://localhost:3000" class="button">Shop Now</a>
    </div>
    <p>If you need help, our support team is here 24/7.</p>
  </div>
  <div class="footer">
    <p>StellarMartBD - Bangladesh's Premium Online Marketplace</p>
    <p><a href="http://localhost:3000/contact">Contact Us</a> | <a href="http://localhost:3000/privacy">Privacy</a></p>
  </div>
</body>
</html>
`;

export const otpEmailHTML = (name, otp) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Your OTP Code - StellarMartBD</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #f8f9ff; padding: 40px 20px; border-radius: 0 0 12px 12px; text-align: center; }
    .otp-box { background: white; border: 2px solid #4f46e5; border-radius: 12px; font-size: 36px; font-weight: bold; color: #4f46e5; letter-spacing: 10px; margin: 30px auto; padding: 20px 40px; width: 300px; font-family: monospace; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    h1 { margin: 0 0 10px 0; font-size: 28px; }
    .expires { color: #ef4444; font-weight: 600; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Password Reset Request</h1>
  </div>
  <div class="content">
    <h2>Hi ${name},</h2>
    <p>Use this one-time password (OTP) to reset your password:</p>
    <div class="otp-box">${otp}</div>
    <p class="expires">Valid for 10 minutes only</p>
    <p>If you didn't request this, ignore this email.</p>
  </div>
  <div class="footer">
    <p>StellarMartBD Team</p>
  </div>
</body>
</html>
`;

export const resetSuccessHTML = (name) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Password Reset Successful</title>
</head>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
  <div style="background: #f0f9ff; padding: 40px; text-align: center; border-radius: 12px;">
    <h1 style="color: #0ea5e9;">Password Updated!</h1>
    <p>Hi ${name}, your password has been successfully reset.</p>
    <p>You can now <a href="http://localhost:3000/login" style="background: #0ea5e9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold;">Login</a></p>
    <p style="color: #64748b; font-size: 14px; margin-top: 30px;">StellarMartBD Security Team</p>
  </div>
</body>
</html>
`;
