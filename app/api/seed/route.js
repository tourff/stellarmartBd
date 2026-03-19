import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User } from '@/models/index.js';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await dbConnect();
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'admin@stellarmartbd.com' });
    
    if (existingAdmin) {
      return NextResponse.json(
        { message: '✅ Admin already exists', email: existingAdmin.email },
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
        message: '✅ Admin created! Login: admin@stellarmartbd.com / turjo0424',
        email: adminUser.email
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Seeding failed: ' + error.message },
      { status: 500 }
    );
  }
}
