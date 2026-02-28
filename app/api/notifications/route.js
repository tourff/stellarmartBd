import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Notification from '@/models/Notification';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const unread = searchParams.get('unread');
    const type = searchParams.get('type');
    
    let query = {};
    
    if (unread === 'true') query.isRead = false;
    if (type) query.type = type;
    
    const notifications = await Notification.find(query)
      .populate('createdBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(50);
    
    const unreadCount = await Notification.countDocuments({ isRead: false });
    
    return NextResponse.json({ notifications, unreadCount });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const notification = await Notification.create(data);
    
    return NextResponse.json({ notification }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const markAllRead = searchParams.get('markAllRead');
    
    if (markAllRead === 'true') {
      await Notification.updateMany({ isRead: false }, { isRead: true, readAt: new Date() });
      return NextResponse.json({ message: 'All notifications marked as read' });
    }
    
    const data = await request.json();
    const notification = await Notification.findByIdAndUpdate(
      data.id,
      { isRead: true, readAt: new Date() },
      { new: true }
    );
    
    return NextResponse.json({ notification });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
