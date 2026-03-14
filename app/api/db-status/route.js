import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';

export async function GET() {
  try {
    console.log('🔍 Checking DB connection...');
    
    const start = Date.now();
    await dbConnect();
    const end = Date.now();

    return NextResponse.json({ 
      status: '✅ Connected successfully!',
      time: `${end - start}ms`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ DB connection failed:', error.message);
    return NextResponse.json({ 
      status: '❌ Connection failed',
      error: error.message,
      uri_set: !!process.env.MONGODB_URI
    }, { status: 500 });
  }
}

