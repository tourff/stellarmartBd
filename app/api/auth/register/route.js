import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/users';

export async function POST(request) {
  try {
    await dbConnect();
    const { name, email, password, phone } = await request.json();

    // ১. ডাটাবেসে এই ইমেইল অলরেডি আছে কি না চেক
    const normalizedEmail = email.toLowerCase().trim();
    const existingUser = await User.findOne({ email: normalizedEmail });
    
    if (existingUser) {
      return NextResponse.json(
        { error: 'এই ইমেইলটি ইতিমধ্যে ব্যবহার করা হয়েছে।' },
        { status: 400 }
      );
    }

    // ২. নতুন ইউজার তৈরি (মডেলের pre-save হুক পাসওয়ার্ড হ্যাশ করে দিবে)
    const newUser = await User.create({
      name,
      email: normalizedEmail,
      password,
      phone,
    });

    return NextResponse.json(
      { message: 'Registration successful', userId: newUser._id },
      { status: 201 }
    );

  } catch (error) {
    console.error("Registration Error:", error);
    
    // মঙ্গুজ ভ্যালিডেশন এরর হ্যান্ডেলিং
    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0].message;
      return NextResponse.json({ error: firstError }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'সার্ভারে সমস্যা হয়েছে। ডাটাবেস চেক করুন।' },
      { status: 500 }
    );
  }
}