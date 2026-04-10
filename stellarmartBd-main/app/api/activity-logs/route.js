import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import ActivityLog from '@/models/ActivityLog';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const action = searchParams.get('action');
    const entityType = searchParams.get('entityType');
    const limit = parseInt(searchParams.get('limit') || '100');
    
    let query = {};
    if (userId) query.user = userId;
    if (action) query.action = action;
    if (entityType) query.entityType = entityType;
    
    const logs = await ActivityLog.find(query)
      .populate('user', 'name email')
      .sort({ createdAt: -1 })
      .limit(limit);
    
    const total = await ActivityLog.countDocuments(query);
    
    return NextResponse.json({ logs, total });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const log = await ActivityLog.create(data);
    
    return NextResponse.json({ log }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
