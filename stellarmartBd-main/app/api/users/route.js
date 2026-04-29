import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import { cookies } from 'next/headers';

// Helper function to verify admin token
function verifyAdminToken(token) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024'
    );
    // Check if token contains admin role
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
}

export async function GET() {
  try {
    await dbConnect();

    // Admin auth check (cookie-based)
    const cookieStore = cookies();
    const adminToken = cookieStore.get('adminToken')?.value;
    if (!adminToken) {
      return NextResponse.json({ error: 'Unauthorized - no admin token' }, { status: 401 });
    }

    // Verify admin token is valid
    if (!verifyAdminToken(adminToken)) {
      return NextResponse.json({ error: 'Unauthorized - invalid token' }, { status: 401 });
    }

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

    // Verify admin token is valid
    if (!verifyAdminToken(adminToken)) {
      return NextResponse.json({ error: 'Unauthorized - invalid token' }, { status: 401 });
    }

    const { userId } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
    }

    // Prevent admin from deleting themselves (admin user has fixed id 'admin')
    // Decode token to get current admin id
    const decoded = jwt.decode(adminToken);
    if (userId === decoded?.id) {
      return NextResponse.json({ error: 'Cannot delete yourself' }, { status: 400 });
    }

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
