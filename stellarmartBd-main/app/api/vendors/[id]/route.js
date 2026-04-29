import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import Vendor from '@/models/Vendor';

// Helper function to verify admin token
function verifyAdminToken(token) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024'
    );
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
}

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const vendor = await Vendor.findById(params.id).populate('user', 'name email phone');
    
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }
    
    return NextResponse.json({ vendor });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  try {
    // Verify admin authentication
    const cookieStore = cookies();
    const adminToken = cookieStore.get('adminToken')?.value;
    if (!adminToken || !verifyAdminToken(adminToken)) {
      return NextResponse.json({ error: 'Unauthorized - admin access required' }, { status: 401 });
    }

    await dbConnect();
    const data = await request.json();
    
    const vendor = await Vendor.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }
    
    return NextResponse.json({ vendor });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    // Verify admin authentication
    const cookieStore = cookies();
    const adminToken = cookieStore.get('adminToken')?.value;
    if (!adminToken || !verifyAdminToken(adminToken)) {
      return NextResponse.json({ error: 'Unauthorized - admin access required' }, { status: 401 });
    }

    await dbConnect();
    const vendor = await Vendor.findByIdAndDelete(params.id);
    
    if (!vendor) {
      return NextResponse.json({ error: 'Vendor not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Vendor deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
