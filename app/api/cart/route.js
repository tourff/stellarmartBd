import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Cart } from '@/models';
import jwt from 'jsonwebtoken';

// Helper function to get user from token
const getUserFromToken = (request) => {
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

// Helper to merge guest cart with user cart
const mergeCarts = async (userId, sessionId) => {
  const userCart = await Cart.findOne({ user: userId });
  const guestCart = await Cart.findOne({ sessionId });
  
  if (!guestCart || guestCart.items.length === 0) {
    return userCart;
  }
  
  if (!userCart) {
    // Move guest cart to user
    await Cart.findByIdAndUpdate(guestCart._id, {
      user: userId,
      sessionId: null
    });
    await guestCart.populate('items.product');
    return guestCart;
  }
  
  // Merge items
  for (const guestItem of guestCart.items) {
    const existingItem = userCart.items.find(
      item => item.product.toString() === guestItem.product.toString()
    );
    
    if (existingItem) {
      existingItem.quantity += guestItem.quantity;
    } else {
      userCart.items.push({
        product: guestItem.product,
        quantity: guestItem.quantity,
        variant: guestItem.variant
      });
    }
  }
  
  await userCart.save();
  
  // Delete guest cart
  await Cart.findByIdAndDelete(guestCart._id);
  
  await userCart.populate('items.product');
  return userCart;
};

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');
    
    // Check if user is logged in
    const user = getUserFromToken(request);
    
    let cart;
    
    if (user) {
      // Get or create user cart
      cart = await Cart.findOne({ user: user.id }).populate('items.product');
      
      if (!cart) {
        cart = await Cart.create({ user: user.id, items: [] });
      }
      
      // Merge with guest cart if sessionId provided
      if (sessionId) {
        cart = await mergeCarts(user.id, sessionId);
      }
    } else if (sessionId) {
      // Guest cart
      cart = await Cart.findOne({ sessionId }).populate('items.product');
    } else {
      cart = await Cart.findOne({}).populate('items.product');
    }
    
    if (!cart) {
      cart = await Cart.create({ sessionId, items: [] });
    }
    
    return NextResponse.json({ cart });
  } catch (error) {
    console.error('Get cart error:', error);
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
    
    // Check if user is logged in
    const user = getUserFromToken(request);
    
    let cart;
    
    if (user) {
      // User cart
      cart = await Cart.findOne({ user: user.id });
      
      if (!cart) {
        cart = await Cart.create({ user: user.id, items: [] });
      }
    } else {
      // Guest cart
      cart = await Cart.findOne({ sessionId });
      
      if (!cart) {
        cart = await Cart.create({ sessionId, items: [] });
      }
    }
    
    // Check if product already in cart
    const existingItem = cart.items.find(
      item => item.product && item.product.toString() === productId
    );
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }
    
    await cart.save();
    await cart.populate('items.product');
    
    return NextResponse.json({ cart, message: 'Product added to cart' });
  } catch (error) {
    console.error('Add to cart error:', error);
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
    
    // Check if user is logged in
    const user = getUserFromToken(request);
    
    let cart;
    
    if (user) {
      cart = await Cart.findOne({ user: user.id });
    } else {
      cart = await Cart.findOne({ sessionId });
    }
    
    if (!cart) {
      return NextResponse.json(
        { error: 'Cart not found' },
        { status: 404 }
      );
    }
    
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
    console.error('Update cart error:', error);
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
    
    // Check if user is logged in
    const user = getUserFromToken(request);
    
    let cart;
    
    if (user) {
      cart = await Cart.findOne({ user: user.id });
    } else {
      cart = await Cart.findOne({ sessionId });
    }
    
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
    console.error('Remove from cart error:', error);
    return NextResponse.json(
      { error: 'Failed to remove from cart' },
      { status: 500 }
    );
  }
}
