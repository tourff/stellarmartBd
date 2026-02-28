import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Category } from '@/models';

export async function GET(request) {
  try {
    await dbConnect();
    
    // Fetch all active categories
    const allCategories = await Category.find({ isActive: true })
      .populate('parentId', 'name slug')
      .sort('orderBy');
    
    // Build nested structure
    const buildNestedCategories = (parentId = null) => {
      return allCategories
        .filter(cat => {
          if (parentId === null) return !cat.parentId;
          return cat.parentId && cat.parentId._id && cat.parentId._id.toString() === parentId.toString();
        })
        .map(cat => ({
          _id: cat._id,
          name: cat.name,
          slug: cat.slug,
          icon: cat.icon || '',
          children: buildNestedCategories(cat._id)
        }));
    };
    
    const nestedCategories = buildNestedCategories();
    
    return NextResponse.json({ categories: nestedCategories });
  } catch (error) {
    console.error('Get nested categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}
