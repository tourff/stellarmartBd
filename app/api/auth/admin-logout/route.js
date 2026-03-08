import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const response = NextResponse.json(
      { message: 'Admin logout successful' },
      { status: 200 }
    );
    
    // Clear the admin token cookie
    response.cookies.set('adminToken', '', {
      httpOnly: true,
      maxAge: 0,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Admin logout error:', error);
    return NextResponse.json(
      { error: 'Logout failed' },
      { status: 500 }
    );
  }
}
