import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Analytics from '@/models/Analytics';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const days = parseInt(searchParams.get('days') || '30');
    const date = searchParams.get('date');
    
    if (date) {
      const analytics = await Analytics.findOne({ date: new Date(date) });
      return NextResponse.json({ analytics });
    }
    
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    
    const analytics = await Analytics.find({
      date: { $gte: startDate }
    }).sort({ date: -1 });
    
    // Calculate totals
    const totals = analytics.reduce((acc, item) => ({
      pageViews: acc.pageViews + (item.pageViews || 0),
      uniqueVisitors: acc.uniqueVisitors + (item.uniqueVisitors || 0),
      sessions: acc.sessions + (item.sessions || 0),
      conversions: acc.conversions + (item.conversions || 0),
      revenue: acc.revenue + (item.revenue || 0)
    }), { pageViews: 0, uniqueVisitors: 0, sessions: 0, conversions: 0, revenue: 0 });
    
    return NextResponse.json({ analytics, totals, days });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Get today's date without time
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Check if analytics for today already exists
    let analytics = await Analytics.findOne({ date: today });
    
    if (analytics) {
      // Update existing record
      analytics.pageViews += data.pageViews || 0;
      analytics.uniqueVisitors += data.uniqueVisitors || 0;
      analytics.sessions += data.sessions || 0;
      await analytics.save();
    } else {
      // Create new record
      analytics = await Analytics.create({
        date: today,
        ...data
      });
    }
    
    return NextResponse.json({ analytics }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
