import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Category } from '@/models';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const parent = searchParams.get('parent');
    const featured = searchParams.get('featured');
    
    const query = { isActive: true };
    
    if (parent === 'true') {
      query.parentId = null;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    const categories = await Category.find(query)
      .populate('parentId', 'name slug')
      .sort('orderBy');
    
    return NextResponse.json({ categories });
  } catch (error) {
    console.error('Get categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    
    // Generate slug from name
    const slug = data.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Check if slug exists
    const existingCategory = await Category.findOne({ slug });
    if (existingCategory) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 400 }
      );
    }
    
    const category = await Category.create({
      ...data,
      slug,
    });
    
    return NextResponse.json(
      { message: 'Category created successfully', category },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { error: 'Failed to create category' },
      { status: 500 }
    );
  }
}
