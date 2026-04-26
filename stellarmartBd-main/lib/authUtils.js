import sendEmail from './email.js';
import { welcomeEmailHTML, otpEmailHTML, resetSuccessHTML, emailVerificationHTML } from './emailTemplates.js';
import { User } from '@/models';
import dbConnect from './db.js';
import crypto from 'crypto';

export const sendWelcomeEmail = async (email, name) => {
  const subject = 'Welcome to StellarMartBD!';
  const html = welcomeEmailHTML(name);
  await sendEmail(email, subject, html);
};

export const sendOtpEmail = async (email, name, otp) => {
  const subject = 'Your Password Reset OTP - StellarMartBD';
  const html = otpEmailHTML(name, otp);
  await sendEmail(email, subject, html);
};

export const sendResetSuccessEmail = async (email, name) => {
  const subject = 'Password Reset Successful';
  const html = resetSuccessHTML(name);
  await sendEmail(email, subject, html);
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const saveResetToken = async (email, otp) => {
  await dbConnect();
  const user = await User.findOneAndUpdate(
    { email },
    { 
      resetPasswordToken: otp,
      resetPasswordExpire: Date.now() + 10 * 60 * 1000 // 10 min
    },
    { new: true }
  );
  return user;
};

export const verifyOTP = async (email, otp) => {
  await dbConnect();
  const user = await User.findOne({
    email,
    resetPasswordToken: otp,
    resetPasswordExpire: { $gt: Date.now() }
  });
  return user;
};

export const clearResetToken = async (userId) => {
  await dbConnect();
  await User.findByIdAndUpdate(userId, {
    resetPasswordToken: null,
    resetPasswordExpire: null
  });
};

export const sendEmailVerification = async (email, name) => {
  const token = crypto.randomBytes(32).toString('hex');
  const verificationLink = `${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/auth/verify-email?token=${token}`;
  
  await dbConnect();
  await User.findOneAndUpdate(
    { email },
    { 
      emailVerificationToken: token,
      emailVerificationExpire: Date.now() + 24 * 60 * 60 * 1000 // 24 hours
    }
  );

  const subject = 'Verify Your Email - StellarMartBD';
  const html = emailVerificationHTML(name, verificationLink);
  await sendEmail(email, subject, html);
};

export const verifyEmailToken = async (token) => {
  await dbConnect();
  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpire: { $gt: Date.now() }
  });
  
  if (user) {
    user.emailVerified = true;
    user.status = 'active'; // Activate the account
    user.emailVerificationToken = null;
    user.emailVerificationExpire = null;
    await user.save();
    return user;
  }
  return null;
};

