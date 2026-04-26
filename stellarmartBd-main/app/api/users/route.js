import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { cookies } from 'next/headers';

export async function GET() {
  try {
    await dbConnect();

    // Admin auth check (cookie-based)
    const cookieStore = cookies();
    const adminToken = cookieStore.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized - no admin token' }, { status: 401 });
    }

    // TODO: Verify admin token against DB/session

    const users = await User.find({})
      .select('-password -resetPasswordToken -resetPasswordExpire')
      .populate('wishlist', '_id name image')
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

export async function DELETE(request) {
  try {
    await dbConnect();

    // Admin auth check (cookie-based)
    const cookieStore = cookies();
    const adminToken = cookieStore.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized - no admin token' }, { status: 401 });
    }

    // TODO: Verify admin token against DB/session

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Prevent admin from deleting themselves
    // TODO: Add admin token verification to get current admin user

    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Delete the user
    await User.findByIdAndDelete(userId);

    return NextResponse.json({ message: 'User deleted successfully' });

  } catch (error) {
    console.error('Users DELETE error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
