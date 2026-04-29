import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import dbConnect from '@/lib/db';
import { Category } from '@/models';

// Cache categories for 5 minutes, revalidate on-demand
export const revalidate = 300;

// Helper function to verify admin token
function verifyAdminToken(token) {
  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024'
    );
    return decoded.role === 'admin';
  } catch (error) {
    return false;
  }
}

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const parent = searchParams.get('parent');
    const featured = searchParams.get('featured');
    const nested = searchParams.get('nested');
    const activeOnly = searchParams.get('active');

    let dbReady = true;
    try {
      await dbConnect();
    } catch (dbError) {
      console.warn('Categories GET fallback: database unavailable', dbError?.message || dbError);
      dbReady = false;
    }

    if (!dbReady) {
      return NextResponse.json({
        categories: [],
      });
    }
    
    // Handle nested categories query
    
    // Handle nested categories query
    if (nested === 'true') {
      // Get all categories (active and inactive for admin)
      const query = activeOnly === 'false' ? {} : { isActive: true };
      const allCategories = await Category.find(query)
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
    
    const query = activeOnly === 'false' ? {} : { isActive: true };
    
    if (parent === 'true') {
      query.parentId = null;
    }
    
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    // If admin is requesting (active=false), show all categories
    const categories = activeOnly === 'false' 
      ? await Category.find().populate('parentId', 'name slug').sort('orderBy')
      : await Category.find(query).populate('parentId', 'name slug').sort('orderBy');
    
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
