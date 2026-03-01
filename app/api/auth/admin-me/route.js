import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import jwt from 'jsonwebtoken';

export async function GET(request) {
  try {
    await dbConnect();
    
    const token = request.cookies.get('adminToken')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }
    
    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024'
    );
    
    // Get user
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Check if admin
    if (user.role !== 'admin' && user.role !== 'super_admin') {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        avatar: user.avatar,
      }
    });
  } catch (error) {
    console.error('Admin auth check error:', error);
    return NextResponse.json(
      { error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
