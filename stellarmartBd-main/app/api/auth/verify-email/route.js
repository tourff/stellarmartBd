import { NextResponse } from 'next/server';
import { verifyEmailToken } from '@/lib/authUtils';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
      return NextResponse.redirect(new URL('/login?error=Invalid verification link', request.url));
    }

    const user = await verifyEmailToken(token);
    
    if (!user) {
      return NextResponse.redirect(new URL('/login?error=Verification link expired or invalid', request.url));
    }

    // Redirect to login with success message
    return NextResponse.redirect(new URL('/login?message=Email verified successfully! You can now login.', request.url));

  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.redirect(new URL('/login?error=Verification failed', request.url));
  }
}
