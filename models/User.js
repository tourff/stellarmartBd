import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/users'; // আপনার মডেলের পাথ অনুযায়ী চেক করে নিন

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const { name, email, password, phone } = body;

    // ১. বেসিক ভ্যালিডেশন
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // ২. চেক করা ইউজার অলরেডি আছে কি না
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'এই ইমেইল দিয়ে আগেই অ্যাকাউন্ট খোলা হয়েছে' },
        { status: 400 }
      );
    }

    // ৩. নতুন ইউজার তৈরি 
    // নোট: আপনার মডেলে pre-save hook আছে, তাই এখানে password hash করার দরকার নেই
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password, // এটি আপনার মডেলের pre('save') ফাংশন দিয়ে অটো হ্যাশ হবে
      phone,
      role: 'customer',
      status: 'active',
    });

    // ৪. সাকসেস রেসপন্স (পাসওয়ার্ড ছাড়া)
    return NextResponse.json(
      { 
        message: 'Registration successful', 
        user: { id: user._id, name: user.name, email: user.email } 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration Error Detail:', error);

    // যদি মঙ্গোডিবি থেকে Duplicate Key এরর আসে (যেমন ইমেইল বা ফোন ডুপ্লিকেট)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'ইমেইল বা ফোন নম্বরটি ইতিমধ্যে ব্যবহার করা হয়েছে' },
        { status: 400 }
      );
    }

    // মঙ্গুজ ভ্যালিডেশন এরর হলে
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return NextResponse.json({ error: messages[0] }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'সার্ভারে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}