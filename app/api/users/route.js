import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';

export async function GET(request) {
  try {
    await dbConnect();
    
    const users = await User.find({})
      .select('-password') // Exclude password
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    console.error('Users fetch error:', error);
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch users'
    }, { status: 500 });
  }
}
