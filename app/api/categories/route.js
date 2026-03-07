import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Category } from '@/models';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const parent = searchParams.get('parent');
    const featured = searchParams.get('featured');
    const nested = searchParams.get('nested');
    const active = searchParams.get('active');
    
    // Handle nested categories query
    if (nested === 'true') {
      // Get all categories (or active only if specified)
      const filter = active === 'false' ? {} : { isActive: true };
      const allCategories = await Category.find(filter)
        .populate('parentId', 'name slug')
        .sort('orderBy');
      
      // Build tree structure
      const categoryMap = new Map();
      const rootCategories = [];
      
      // First pass: create map of all categories
      allCategories.forEach(cat => {
        categoryMap.set(cat._id.toString(), {
          _id: cat._id,
          name: cat.name,
          slug: cat.slug,
          image: cat.image,
          parentId: cat.parentId?._id || null,
          subcategories: []
        });
      });
      
      // Second pass: build tree
      allCategories.forEach(cat => {
        const category = categoryMap.get(cat._id.toString());
        if (cat.parentId) {
          const parent = categoryMap.get(cat.parentId._id?.toString());
          if (parent) {
            parent.subcategories.push(category);
          } else {
            rootCategories.push(category);
          }
        } else {
          rootCategories.push(category);
        }
      });
      
      return NextResponse.json({ categories: rootCategories });
    }
    
    // Build query - by default show ALL categories (not just active)
    const query = {};
    
    // Only filter by isActive if explicitly requested
    if (active === 'true') {
      query.isActive = true;
    }
    
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
      { error: 'Failed to fetch categories', message: error.message },
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
      { error: 'Failed to create category', message: error.message },
      { status: 500 }
    );
  }
}
