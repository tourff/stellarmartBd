import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    await dbConnect();
    
    // Get token from cookie
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { user: null, message: 'Not authenticated' },
        { status: 200 }
      );
    }
    
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024'
    );
    
    // Get user from database
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { user: null, message: 'User not found' },
        { status: 200 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        address: user.address,
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json(
      { user: null, message: 'Invalid token' },
      { status: 200 }
    );
  }
}
