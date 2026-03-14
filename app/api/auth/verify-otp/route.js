import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { verifyOTP } from '@/lib/authUtils';

export async function POST(request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ error: 'Email and OTP required' }, { status: 400 });
    }

    const user = await verifyOTP(email, otp);
    if (!user) {
      return NextResponse.json({ error: 'Invalid or expired OTP' }, { status: 400 });
    }

    // Generate reset token (JWT)
    const resetToken = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024',
      { expiresIn: '15m' }
    );

    return NextResponse.json({ 
      message: 'OTP verified', 
      resetToken 
    });

  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 });
  }
}

