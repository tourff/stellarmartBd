import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Cart } from '@/models';
import mongoose from 'mongoose';

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    if (!sessionId) {
      return NextResponse.json({ cart: { items: [] } });
    }
    
    let cart = await Cart.findOne({ sessionId }).populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] });
      cart = await cart.populate('items.product');
    }
    
    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    const { productId, quantity = 1, sessionId } = data;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    let cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] });
    }
    
    const objectId = new mongoose.Types.ObjectId(productId);
    
    const existingItem = cart.items.find(
      item => item.product.toString() === productId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: objectId, quantity });
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    return NextResponse.json({ cart, message: 'Product added to cart' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add to cart' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    
    const data = await request.json();
    const { productId, quantity, sessionId } = data;
    
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return NextResponse.json(
        { error: 'Invalid product ID' },
        { status: 400 }
      );
    }
    
    const cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }
    
    const objectId = new mongoose.Types.ObjectId(productId);
    
    const item = cart.items.find(
      item => item.product.toString() === productId
    );
    
    if (item) {
      if (quantity <= 0) {
        cart.items = cart.items.filter(
          item => item.product.toString() !== productId
        );
      } else {
        item.quantity = quantity;
      }
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    return NextResponse.json({ cart });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update cart' },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const sessionId = searchParams.get('sessionId');
    
    const cart = await Cart.findOne({ sessionId });
    
    if (!cart) {
      return NextResponse.json({ message: 'Cart is empty' });
    }
    
    if (productId) {
      cart.items = cart.items.filter(
        item => item.product.toString() !== productId
      );
    } else {
      cart.items = [];
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    return NextResponse.json({ cart, message: 'Item removed from cart' });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}
