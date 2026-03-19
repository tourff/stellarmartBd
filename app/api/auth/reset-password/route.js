import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import { sendResetSuccessEmail, clearResetToken } from '@/lib/authUtils';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { resetToken, newPassword } = await request.json();

    if (!resetToken || !newPassword) {
      return NextResponse.json({ error: 'Token and new password required' }, { status: 400 });
    }

    // Verify token
    const decoded = jwt.verify(resetToken, process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024');
    
    const user = await User.findById(decoded.id).select('+password');
    if (!user) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await clearResetToken(user._id);
    await user.save();

    // Send success email
    await sendResetSuccessEmail(user.email, user.name);

    return NextResponse.json({ message: 'Password reset successful' });

  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return NextResponse.json({ error: 'Reset token expired' }, { status: 400 });
    }
    if (error.name === 'JsonWebTokenError') {
      return NextResponse.json({ error: 'Invalid token' }, { status: 400 });
    }
    console.error('Reset password error:', error);
    return NextResponse.json({ error: 'Reset failed' }, { status: 500 });
  }
}

