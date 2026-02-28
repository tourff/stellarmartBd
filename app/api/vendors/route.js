import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vendor from '@/models/Vendor';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    const verified = searchParams.get('verified');
    
    let query = {};
    
    if (active === 'true') query.isActive = true;
    if (active === 'false') query.isActive = false;
    if (verified === 'true') query.isVerified = true;
    if (verified === 'false') query.isVerified = false;
    
    const vendors = await Vendor.find(query)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ vendors });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Check if email already exists
    const existingVendor = await Vendor.findOne({ email: data.email });
    if (existingVendor) {
      return NextResponse.json({ error: 'Vendor with this email already exists' }, { status: 400 });
    }
    
    // Check if slug already exists
    const existingSlug = await Vendor.findOne({ slug: data.slug });
    if (existingSlug) {
      return NextResponse.json({ error: 'Vendor slug already exists' }, { status: 400 });
    }
    
    const vendor = await Vendor.create(data);
    
    return NextResponse.json({ vendor }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
