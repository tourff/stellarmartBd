import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await dbConnect();
    const { uid, email, name, photoURL } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    // Check if user exists
    let user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      // Create new user from Google data
      user = await User.create({
        name: name || 'Google User',
        email: email.toLowerCase(),
        avatar: photoURL || '',
        emailVerified: true, // Google accounts are pre-verified
        status: 'active',
        role: 'customer'
      });
    } else {
      // Update user info if needed
      if (photoURL && !user.avatar) {
        user.avatar = photoURL;
      }
      if (!user.emailVerified) {
        user.emailVerified = true;
      }
      await user.save();
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024',
      { expiresIn: process.env.JWT_EXPIRE || '7d' }
    );

    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
          role: user.role,
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
      { status: 200 }
    );

    // Set cookie
    const isProduction = process.env.NODE_ENV === 'production';
    response.cookies.set('token', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
      sameSite: 'lax',
      secure: isProduction,
    });

    return response;
  } catch (error) {
    console.error('Google login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}