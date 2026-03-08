import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Banner } from '@/models';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const banner = await Banner.findById(params.id);
    
    if (!banner) {
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ banner });
  } catch (error) {
    console.error('Get banner error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banner' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const data = await request.json();
    
    const banner = await Banner.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!banner) {
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Banner updated successfully', banner });
  } catch (error) {
    console.error('Update banner error:', error);
    return NextResponse.json(
      { error: 'Failed to update banner' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const banner = await Banner.findByIdAndDelete(params.id);
    
    if (!banner) {
      return NextResponse.json(
        { error: 'Banner not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Banner deleted successfully' });
  } catch (error) {
    console.error('Delete banner error:', error);
    return NextResponse.json(
      { error: 'Failed to delete banner' },
      { status: 500 }
    );
  }
}
