import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import jwt from 'jsonwebtoken';

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
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    const response = NextResponse.json(
      { 
        message: 'Registration successful', 
        user: { 
          id: user._id, 
          name: user.name, 
          email: user.email, 
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
        token 
      },
      { status: 201 }
    );
    
    // Set cookie
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}
