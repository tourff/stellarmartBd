import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Banner } from '@/models';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const position = searchParams.get('position');
    
    const query = { isActive: true };
    
    // Filter by position
    if (position) {
      query.position = position;
    }
    
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
    
    const banners = await Banner.find(query).sort('orderBy');
    
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
