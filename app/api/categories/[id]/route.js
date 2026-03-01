import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Category } from '@/models';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const category = await Category.findById(id)
      .populate('parentId', 'name slug');
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ category });
  } catch (error) {
    console.error('Get category error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    const data = await request.json();
    
    // If name is being updated, generate new slug
    if (data.name) {
      data.slug = data.name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
      
      // Check if slug exists for other categories
      const existingCategory = await Category.findOne({ 
        slug: data.slug,
        _id: { $ne: id }
      });
      
      if (existingCategory) {
        return NextResponse.json(
          { error: 'Category with this name already exists' },
          { status: 400 }
        );
      }
    }
    
    const category = await Category.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ 
      message: 'Category updated successfully', 
      category 
    });
  } catch (error) {
    console.error('Update category error:', error);
    return NextResponse.json(
      { error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const { id } = params;
    
    // Check if category has subcategories
    const subcategories = await Category.find({ parentId: id });
    if (subcategories.length > 0) {
      return NextResponse.json(
        { error: 'Cannot delete category with subcategories. Delete subcategories first.' },
        { status: 400 }
      );
    }
    
    const category = await Category.findByIdAndDelete(id);
    
    if (!category) {
      return NextResponse.json(
        { error: 'Category not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { error: 'Failed to delete category' },
      { status: 500 }
    );
  }
}
