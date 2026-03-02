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
    
    // Create new user with default notification and privacy settings
    const user = await User.create({
      name,
      email,
      password,
      phone,
      role: 'customer',
      status: 'active',
      lastLogin: new Date(),
      notificationPreferences: {
        orderUpdates: true,
        promotionalEmails: true,
        smsNotifications: false,
        pushNotifications: true,
      },
      privacySettings: {
        profileVisibility: 'public',
        showOrders: true,
        showWishlist: true,
      },
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
          avatar: user.avatar,
          status: user.status,
          address: user.address,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          notificationPreferences: user.notificationPreferences,
          privacySettings: user.privacySettings,
          createdAt: user.createdAt,
          lastLogin: user.lastLogin,
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
