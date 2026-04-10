import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User, Product } from '@/models';
import jwt from 'jsonwebtoken';

// Helper function to verify token
const verifyToken = (request) => {
  const token = request.cookies.get('token')?.value;
  if (!token) return null;
  
  try {
    return jwt.verify(
      token,
      process.env.JWT_SECRET || 'stellarmartbd_secret_key_2024'
    );
  } catch (error) {
    return null;
  }
};

// GET - Get user's wishlist
export async function GET(request) {
  try {
    await dbConnect();
    
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Get user with wishlist populated
    const user = await User.findById(decoded.id).populate({
      path: 'wishlist',
      select: 'name slug images price salePrice stock status category'
    }).lean();
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    // Transform wishlist items
    const wishlist = user.wishlist.map(item => ({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      image: item.images?.[0] || '/placeholder.jpg',
      price: item.price,
      salePrice: item.salePrice,
      inStock: item.stock > 0,
      category: item.category
    }));
    
    return NextResponse.json({
      wishlist
    });
  } catch (error) {
    console.error('Get wishlist error:', error);
    return NextResponse.json(
      { error: 'Failed to get wishlist' },
      { status: 500 }
    );
  }
}

// POST - Add item to wishlist
export async function POST(request) {
  try {
    await dbConnect();
    
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    // Check if product exists
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }
    
    // Add to wishlist (push only if not already in wishlist)
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $addToSet: { wishlist: productId } },
      { new: true }
    ).populate({
      path: 'wishlist',
      select: 'name slug images price salePrice stock status'
    });
    
    const wishlist = user.wishlist.map(item => ({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      image: item.images?.[0] || '/placeholder.jpg',
      price: item.price,
      salePrice: item.salePrice,
      inStock: item.stock > 0
    }));
    
    return NextResponse.json({
      message: 'Product added to wishlist',
      wishlist
    });
  } catch (error) {
    console.error('Add to wishlist error:', error);
    return NextResponse.json(
      { error: 'Failed to add to wishlist' },
      { status: 500 }
    );
  }
}

// DELETE - Remove item from wishlist
export async function DELETE(request) {
  try {
    await dbConnect();
    
    const decoded = verifyToken(request);
    if (!decoded) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    const { productId } = await request.json();
    
    if (!productId) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }
    
    // Remove from wishlist
    const user = await User.findByIdAndUpdate(
      decoded.id,
      { $pull: { wishlist: productId } },
      { new: true }
    ).populate({
      path: 'wishlist',
      select: 'name slug images price salePrice stock status'
    });
    
    const wishlist = user.wishlist.map(item => ({
      _id: item._id,
      name: item.name,
      slug: item.slug,
      image: item.images?.[0] || '/placeholder.jpg',
      price: item.price,
      salePrice: item.salePrice,
      inStock: item.stock > 0
    }));
    
    return NextResponse.json({
      message: 'Product removed from wishlist',
      wishlist
    });
  } catch (error) {
    console.error('Remove from wishlist error:', error);
    return NextResponse.json(
      { error: 'Failed to remove from wishlist' },
      { status: 500 }
    );
  }
}
