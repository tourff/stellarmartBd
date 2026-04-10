import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Coupon from '@/models/Coupon';
import Category from '@/models/Category';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    const code = searchParams.get('code');
    
    let query = {};
    
    if (active === 'true') {
      query.isActive = true;
      query.expiresAt = { $gt: new Date() };
      if (query.usageLimit) {
        query.$expr = { $gt: ['$usageLimit', '$usageCount'] };
      }
    }
    
    if (code) {
      query.code = code.toUpperCase();
    }
    
    const coupons = await Coupon.find(query)
      .populate('createdBy', 'name email')
      .populate('applicableCategories', 'name')
      .populate('applicableProducts', 'name')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({ coupons });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const data = await request.json();
    
    // Check if coupon code already exists
    const existingCoupon = await Coupon.findOne({ code: data.code.toUpperCase() });
    if (existingCoupon) {
      return NextResponse.json({ error: 'Coupon code already exists' }, { status: 400 });
    }
    
    const coupon = await Coupon.create({
      ...data,
      code: data.code.toUpperCase()
    });
    
    return NextResponse.json({ coupon }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
