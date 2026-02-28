import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Product, Category } from '@/models';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');
    const sort = searchParams.get('sort') || '-createdAt';
    
    const query = { isActive: true };
    
    // Category filter
    if (category) {
      query.category = category;
    }
    
    // Search filter
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { tags: { $in: [new RegExp(search, 'i')] } },
      ];
    }
    
    // Featured filter
    if (featured === 'true') {
      query.isFeatured = true;
    }
    
    // Also check isNewArrival for new arrivals
    const isNewArrival = searchParams.get('isNewArrival');
    if (isNewArrival === 'true') {
      query.isNewArrival = true;
    }
    
    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('category', 'name slug')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query),
    ]);
    
    return NextResponse.json({
      products,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
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
    const existingProduct = await Product.findOne({ slug });
    if (existingProduct) {
      return NextResponse.json(
        { error: 'Product with this name already exists' },
        { status: 400 }
      );
    }
    
    // Calculate discount percentage
    if (data.regularPrice && data.sellingPrice) {
      data.discountPercent = Math.round(
        ((data.regularPrice - data.sellingPrice) / data.regularPrice) * 100
      );
    }
    
    // Set stock status
    if (data.stockQuantity <= 0) {
      data.stockStatus = 'out_of_stock';
    } else if (data.stockQuantity <= data.lowStockThreshold) {
      data.stockStatus = 'low_stock';
    }
    
    const product = await Product.create({
      ...data,
      slug,
    });
    
    return NextResponse.json(
      { message: 'Product created successfully', product },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { error: 'Failed to create product' },
      { status: 500 }
    );
  }
}
