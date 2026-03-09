import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request) {
  const token = request.cookies.get('token')?.value;
  const adminToken = request.cookies.get('adminToken')?.value;
  
  // Public paths that don't require authentication
  const publicPaths = [
    '/',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/logout',
    '/api/auth/admin-login',
    '/api/auth/admin-logout',
    '/api/auth/admin-me',
    '/api/products',
    '/api/categories',
    '/api/banners',
    '/login',
    '/register',
    '/admin/login',
    '/admin-login',
  ];
  
  const path = request.nextUrl.pathname;
  
  // Check if path is public
  const isPublicPath = publicPaths.some(p => path.startsWith(p));
  
  if (isPublicPath) {
    return NextResponse.next();
  }
  
  // For admin routes, require admin authentication
  if (path.startsWith('/admin')) {
    if (!adminToken) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
    
    try {
      const decoded = jwt.verify(adminToken, process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024');
      request.user = decoded;
      
      // Check if user is admin
      if (decoded.role !== 'admin') {
        return NextResponse.redirect(new URL('/', request.url));
      }
    } catch (error) {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
