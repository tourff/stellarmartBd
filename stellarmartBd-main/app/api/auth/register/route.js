import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import { sendEmailVerification } from '@/lib/authUtils';

export async function POST(request) {
  try {
    await dbConnect();
    const body = await request.json();
    const { name, email, password, phone } = body;

    // ১. চেক করা ইউজার অলরেডি আছে কি না
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে' },
        { status: 400 }
      );
    }

    // ২. নতুন ইউজার তৈরি (inactive until email verified)
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      phone,
      status: 'inactive', // Will be activated after email verification
    });

    // Send email verification
    try {
      await sendEmailVerification(email, name);
    } catch (emailError) {
      console.error('Email verification failed:', emailError);
      // Don't fail registration if email fails, but log it
    }

    return NextResponse.json(
      { message: 'Registration successful! Please check your email to verify your account.' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration error:', error);

    // ডুপ্লিকেট ইনডেক্স এরর (যেমন: ফোন নম্বর আগে থেকে থাকলে)
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return NextResponse.json({ error: `${field} ইতিমধ্যে ব্যবহার করা হয়েছে` }, { status: 400 });
    }

    // মঙ্গুজ ভ্যালিডেশন এরর (যেমন: কোনো ফিল্ড মিসিং বা ফরমেট ভুল)
    if (error.name === 'ValidationError') {
      const message = Object.values(error.errors).map(val => val.message);
      return NextResponse.json({ error: message[0] }, { status: 400 });
    }

    // অন্য যেকোনো এরর সরাসরি মেসেজ হিসেবে দেখাবে
    return NextResponse.json(
      { error: error.message || 'সার্ভারে সমস্যা হয়েছে' },
      { status: 500 }
    );
  }
}