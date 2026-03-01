import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();
    
    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
    
    // Check if admin
    if (user.role !== 'admin' && user.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Access denied. Admin privileges required.' },
        { status: 403 }
      );
    }
    
    // Check status
    if (user.status !== 'active') {
      return NextResponse.json(
        { error: 'Account is suspended or inactive' },
        { status: 401 }
      );
    }
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );
    
    // Remove password from response
    user.password = undefined;
    
    const response = NextResponse.json(
      { 
        message: 'Admin login successful', 
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          avatar: user.avatar,
        },
        token 
      },
      { status: 200 }
    );
    
    // Set cookie
    response.cookies.set('adminToken', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
    });
    
    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Admin login failed' },
      { status: 500 }
    );
  }
}
