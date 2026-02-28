import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { name, email, password, phone } = await request.json();
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 400 }
      );
    }
    
    // Create new user
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'customer',
      status: 'active',
    });
    
    return NextResponse.json(
      { message: 'Registration successful', user: { id: user._id, name: user.name, email: user.email, role: user.role } },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
