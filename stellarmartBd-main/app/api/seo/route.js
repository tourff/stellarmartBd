import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import SeoSettings from '@/models/SeoSettings';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');
    
    if (key) {
      const seo = await SeoSettings.findOne({ key });
      return NextResponse.json({ seo });
    }
    
    const seoSettings = await SeoSettings.find().sort({ key: 1 });
    return NextResponse.json({ seoSettings });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Check if SEO setting for this key already exists
    const existing = await SeoSettings.findOne({ key: data.key });
    if (existing) {
      return NextResponse.json({ error: 'SEO settings for this page already exists' }, { status: 400 });
    }
    
    const seo = await SeoSettings.create(data);
    return NextResponse.json({ seo }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    const seo = await SeoSettings.findOneAndUpdate(
      { key: data.key },
      data,
      { new: true, runValidators: true }
    );
    
    if (!seo) {
      return NextResponse.json({ error: 'SEO settings not found' }, { status: 404 });
    }
    
    return NextResponse.json({ seo });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
