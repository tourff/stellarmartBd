import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { ShippingMethod, ShippingZone } from '@/models/Shipping';

export async function GET(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'methods' or 'zones'
    const active = searchParams.get('active');
    
    let query = {};
    if (active === 'true') query.isActive = true;
    if (active === 'false') query.isActive = false;
    
    if (type === 'zones') {
      const zones = await ShippingZone.find(query).sort({ createdAt: -1 });
      return NextResponse.json({ zones });
    } else if (type === 'methods') {
      const methods = await ShippingMethod.find(query)
        .populate('zone', 'name')
        .sort({ createdAt: -1 });
      return NextResponse.json({ methods });
    } else {
      const [zones, methods] = await Promise.all([
        ShippingZone.find(query),
        ShippingMethod.find(query).populate('zone', 'name')
      ]);
      return NextResponse.json({ zones, methods });
    }
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const data = await request.json();
    
    let result;
    if (type === 'zone') {
      result = await ShippingZone.create(data);
    } else {
      result = await ShippingMethod.create(data);
    }
    
    return NextResponse.json({ result }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const data = await request.json();
    
    let result;
    if (type === 'zone') {
      result = await ShippingZone.findByIdAndUpdate(data.id, data, { new: true });
    } else {
      result = await ShippingMethod.findByIdAndUpdate(data.id, data, { new: true });
    }
    
    return NextResponse.json({ result });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');
    
    let result;
    if (type === 'zone') {
      result = await ShippingZone.findByIdAndDelete(id);
    } else {
      result = await ShippingMethod.findByIdAndDelete(id);
    }
    
    return NextResponse.json({ message: 'Deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
