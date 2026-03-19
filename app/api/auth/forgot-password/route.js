import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import { generateOTP, sendOtpEmail, saveResetToken } from '@/lib/authUtils';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: 'No user found with this email' }, { status: 404 });
    }

    // Rate limit check (simple - check if recent attempt)
    if (user.resetPasswordExpire && user.resetPasswordExpire > Date.now()) {
      return NextResponse.json({ error: 'Please wait before requesting another OTP' }, { status: 429 });
    }

    const otp = generateOTP();
    await saveResetToken(email, otp);
    await sendOtpEmail(email, user.name, otp);

    return NextResponse.json({ 
      message: 'OTP sent to your email. It expires in 10 minutes.' 
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json({ error: 'Failed to send OTP' }, { status: 500 });
  }
}

