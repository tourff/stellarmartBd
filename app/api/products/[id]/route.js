import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request, { params }) {
  try {
    await dbConnect();
    const product = await Product.findById(params.id).populate('category', 'name slug');
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ product });
  } catch (error) {
    console.error('Get product error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await dbConnect();
    
    const data = await request.json();
    
    // Calculate discount percentage
    if (data.regularPrice && data.sellingPrice) {
      data.discountPercent = Math.round(
        ((data.regularPrice - data.sellingPrice) / data.regularPrice) * 100
      );
    }
    
    // Set stock status
    if (data.stockQuantity <= 0) {
      data.stockStatus = 'out_of_stock';
    } else if (data.stockQuantity <= (data.lowStockThreshold || 5)) {
      data.stockStatus = 'low_stock';
    } else {
      data.stockStatus = 'in_stock';
    }
    
    const product = await Product.findByIdAndUpdate(
      params.id,
      { ...data, isActive: true }, // Always set to active when updated
      { new: true, runValidators: true }
    );
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Product updated successfully', product },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await dbConnect();
    
    const product = await Product.findByIdAndDelete(params.id);
    
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Product deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { error: 'Failed to delete product' },
      { status: 500 }
    );
  }
}
