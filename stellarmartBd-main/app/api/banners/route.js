import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Banner } from '@/models';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position');
    const admin = searchParams.get('admin');
    
    let query = {};
    
    // If not admin, only show active banners
    if (!admin) {
      query.isActive = true;
      
      // Check date validity
      const now = new Date();
      query.$or = [
        { startDate: { $exists: false } },
        { startDate: { $lte: now } },
      ];
      query.$or.push({
        $or: [
          { endDate: { $exists: false } },
          { endDate: { $gte: now } },
        ],
      });
    }
    
    // Filter by position
    if (position) {
      query.position = position;
    }
    
    const banners = await Banner.find(query).sort({ orderBy: 1, createdAt: -1 });
    
    return NextResponse.json({ banners });
  } catch (error) {
    console.error('Get banners error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch banners' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    
    const banner = await Banner.create(data);
    
    return NextResponse.json(
      { message: 'Banner created successfully', banner },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create banner error:', error);
    return NextResponse.json(
      { error: 'Failed to create banner' },
      { status: 500 }
    );
  }
}
