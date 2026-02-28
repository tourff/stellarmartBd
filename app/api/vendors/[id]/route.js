import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Vendor from '@/models/Vendor';

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
