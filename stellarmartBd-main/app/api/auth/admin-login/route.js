import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

// Hardcoded admin credentials
const ADMIN_CREDENTIALS = {
  username: 'turjo',
  password: 'turjo0424'
};

export async function POST(request) {
  try {
    const { username, password } = await request.json();
    
    // Check credentials
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      // Generate JWT token
      const token = jwt.sign(
        { id: 'admin', username: username, role: 'admin' },
        process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024',
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );
      
      const response = NextResponse.json(
        { 
          message: 'Admin login successful', 
          user: {
            id: 'admin',
            username: username,
            role: 'admin',
          },
          token 
        },
        { status: 200 }
      );
      
      // Set cookie with proper settings for production
      const isProduction = process.env.NODE_ENV === 'production';
      response.cookies.set('adminToken', token, {
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/',
        sameSite: 'lax',
        secure: isProduction,
      });
      
      return response;
    }
    
    return NextResponse.json(
      { error: 'Invalid username or password' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'Admin login failed' },
      { status: 500 }
    );
  }
}
