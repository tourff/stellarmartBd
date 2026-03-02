import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models';
import bcrypt from 'bcryptjs';

export async function POST(request) {
  try {
    await dbConnect();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@stellarmartbd.com' });
    
    if (existingAdmin) {
      return NextResponse.json(
        { message: 'Admin user already exists' },
        { status: 200 }
      );
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('turjo0424', 10);
    
    const adminUser = await User.create({
      name: 'Super Admin',
      email: 'admin@stellarmartbd.com',
      password: hashedPassword,
      phone: '+8801234567890',
      role: 'admin',
      status: 'active',
      emailVerified: true,
    });
    
    return NextResponse.json(
      { 
        message: 'Admin user created successfully',
        email: adminUser.email,
        password: 'turjo0424'
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to create admin user' },
      { status: 500 }
    );
  }
}
