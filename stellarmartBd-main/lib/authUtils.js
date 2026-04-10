import sendEmail from './email.js';
import { welcomeEmailHTML, otpEmailHTML, resetSuccessHTML } from './emailTemplates.js';
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

