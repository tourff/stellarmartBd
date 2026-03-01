import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import jwt from 'jsonwebtoken';

// Helper function to verify token
const verifyToken = (request) => {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;
  
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024'
    );
  } catch (error) {
    return null;
  }
};

// GET - Get user profile
export async function GET(request) {
  try {
    await dbConnect();
    
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        status: user.status,
        address: user.address,
        createdAt: user.createdAt,
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    return NextResponse.json(
      { error: 'Failed to get profile' },
      { status: 500 }
    );
  }
}

// PUT - Update user profile
export async function PUT(request) {
  try {
    await dbConnect();
    
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const data = await request.json();
    const { name, phone, avatar, address } = data;
    
    // Build update object
    const updateData = {};
    if (name) updateData.name = name;
    if (phone) updateData.phone = phone;
    if (avatar !== undefined) updateData.avatar = avatar;
    if (address) updateData.address = address;
    
    const user = await User.findByIdAndUpdate(
      decoded.id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      message: 'Profile updated successfully',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        avatar: user.avatar,
        role: user.role,
        address: user.address,
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    return NextResponse.json(
      { error: 'Failed to update profile' },
      { status: 500 }
    );
  }
}

// PATCH - Change password
export async function PATCH(request) {
  try {
    await dbConnect();
    
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { currentPassword, newPassword } = await request.json();
    
    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: 'Current password and new password are required' },
        { status: 400 }
      );
    }
    
    // Get user with password
    const user = await User.findById(decoded.id).select('+password');
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Verify current password
    const isMatch = await user.comparePassword(currentPassword);
    if (!isMatch) {
      return NextResponse.json(
        { error: 'Current password is incorrect' },
        { status: 400 }
      );
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    return NextResponse.json({
      message: 'Password changed successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    return NextResponse.json(
      { error: 'Failed to change password' },
      { status: 500 }
    );
  }
}
