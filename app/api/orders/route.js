import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { Order } from '@/models';
import jwt from 'jsonwebtoken';

// Force dynamic rendering - this route uses cookies
export const dynamic = 'force-dynamic';

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

// GET - Get user's orders
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
    
    // Get orders for the logged-in user, sorted by creation date (newest first)
    const orders = await Order.find({ user: decoded.id })
      .sort({ createdAt: -1 })
      .lean();
    
    // Transform orders for frontend
    const transformedOrders = orders.map(order => ({
      _id: order._id,
      orderNumber: order.orderNumber,
      createdAt: order.createdAt,
      status: order.orderStatus,
      total: order.totalAmount,
      items: order.items.map(item => ({
        name: item.productName,
        quantity: item.quantity,
        price: item.unitPrice,
        image: item.productImage
      })),
      paymentStatus: order.paymentStatus,
      shippingAddress: {
        name: order.shippingName,
        address: order.shippingAddress,
        city: order.shippingCity,
        phone: order.shippingPhone
      }
    }));
    
    return NextResponse.json({
      orders: transformedOrders
    });
  } catch (error) {
    console.error('Get orders error:', error);
    return NextResponse.json(
      { error: 'Failed to get orders' },
      { status: 500 }
    );
  }
}
