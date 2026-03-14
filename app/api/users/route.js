import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    await dbConnect();

    // Admin auth check
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const users = await User.find({})
      .select('-password')
      .populate('wishlist')
      .sort({ createdAt: -1 })
      .limit(100);

    const total = await User.countDocuments();
    const active = await User.countDocuments({ status: 'active' });
    const vendors = await User.countDocuments({ role: 'vendor' });

    return NextResponse.json({
      users,
      stats: { total, active, vendors }
    });
  } catch (error) {
    console.error('Users GET error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
