import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  
  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/logout',
    '/api/products',
    '/api/categories',
    '/api/banners',
    '/login',
    '/register',
  ];
  
  const path = request.nextUrl.pathname;
  
  // Check if path is public
  const isPublicPath = publicPaths.some(p => path.startsWith(p));
  
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // For admin routes, require authentication
  if (path.startsWith('/admin')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024');
      request.user = decoded;
      
      // Check if user is admin
      if (!['admin', 'moderator', 'editor'].includes(decoded.role)) {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
