import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    await User.findByIdAndDelete(id);
    
    return NextResponse.json({ 
      success: true, 
      message: 'User deleted successfully' 
    });
  } catch (error) {
    console.error('Delete user error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to delete user' 
    }, { status: 500 });
  }
}

export async function PATCH(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const { status } = await request.json();
    
    const user = await User.findByIdAndUpdate(
      id, 
      { status }, 
      { new: true }
    ).select('-password');
    
    return NextResponse.json({ 
      success: true, 
      data: user 
    });
  } catch (error) {
    console.error('Update user error:', error);
    return NextResponse.json({ 
      success: false, 
      error: 'Failed to update user' 
    }, { status: 500 });
  }
}
