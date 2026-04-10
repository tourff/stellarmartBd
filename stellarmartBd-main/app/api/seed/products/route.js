import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Product from '@/models/Product';
import Category from '@/models/Category';

export async function GET() {
  try {
    await dbConnect();

    // Check if products already exist
    const count = await Product.countDocuments();
    if (count > 5) {
      return NextResponse.json({ message: 'Products already seeded', count });
    }

    // Create sample categories first if none exist
    let mobileCategory = await Category.findOne({ slug: 'mobile-phones' });
    if (!mobileCategory) {
      mobileCategory = await Category.create({
        name: 'Mobile Phones',
        nameBn: 'মোবাইল ফোন',
        slug: 'mobile-phones',
        description: 'Smartphones and feature phones'
      });
    }

    // Sample products with real placeholder images
    const sampleProducts = [
      {
        name: 'iPhone 15 Pro Max',
        slug: 'iphone-15-pro-max',
        category: mobileCategory._id,
        regularPrice: 150000,
        sellingPrice: 140000,
        stockQuantity: 10,
        images: ['https://i.postimg.cc/1XwZ1K2f/iphone.jpg'],
        featuredImage: 'https://i.postimg.cc/1XwZ1K2f/iphone.jpg',
        brand: 'Apple',
        description: 'Latest iPhone with A17 Pro chip',
        isFeatured: true
      },
      {
        name: 'Samsung Galaxy S24 Ultra',
        slug: 'samsung-galaxy-s24-ultra',
        category: mobileCategory._id,
        regularPrice: 130000,
        sellingPrice: 120000,
        stockQuantity: 15,
        images: ['https://i.postimg.cc/RCmK1J3L/samsung.jpg'],
        featuredImage: 'https://i.postimg.cc/RCmK1J3L/samsung.jpg',
        brand: 'Samsung',
        description: 'Flagship Android phone',
        isFeatured: true
      },
      {
        name: 'MacBook Air M2',
        slug: 'macbook-air-m2',
        category: mobileCategory._id,
        regularPrice: 120000,
        sellingPrice: 110000,
        stockQuantity: 8,
        images: ['https://i.postimg.cc/7Y6fP5Qh/macbook.jpg'],
        featuredImage: 'https://i.postimg.cc/7Y6fP5Qh/macbook.jpg',
        brand: 'Apple',
        description: 'Lightweight laptop with M2 chip'
      }
    ];

    await Product.insertMany(sampleProducts);

    return NextResponse.json({ 
      message: '✅ Sample products created successfully!',
      count: sampleProducts.length,
      visit: '/shop to see products'
    });
  } catch (error) {
    console.error('Seed products error:', error);
    return NextResponse.json({ error: 'Seeding failed: ' + error.message }, { status: 500 });
  }
}

