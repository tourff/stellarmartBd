import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { User, Category } from '@/models';
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
    
    // Create sample categories
    const categoriesData = [
      // Electronics
      { name: 'Electronics', nameBn: 'ইলেকট্রনিক্স', slug: 'electronics', description: 'Latest electronics and gadgets', icon: 'laptop', isFeatured: true, isActive: true, orderBy: 1 },
      { name: 'Fashion', nameBn: 'ফ্যাশন', slug: 'fashion', description: 'Trending fashion items', icon: 'shirt', isFeatured: true, isActive: true, orderBy: 2 },
      { name: 'Home & Living', nameBn: 'বাড়ি ও লিভিং', slug: 'home-living', description: 'Furniture and home decor', icon: 'sofa', isFeatured: true, isActive: true, orderBy: 3 },
      { name: 'Beauty & Health', nameBn: 'সৌন্দর্য ও স্বাস্থ্য', slug: 'beauty-health', description: 'Beauty and health products', icon: 'heart', isFeatured: true, isActive: true, orderBy: 4 },
      { name: 'Sports & Outdoors', nameBn: 'স্পোর্টস ও আউটডোরস', slug: 'sports-outdoors', description: 'Sports equipment and outdoor gear', icon: 'dumbbell', isFeatured: true, isActive: true, orderBy: 5 },
      { name: 'Books & Stationery', nameBn: 'বই ও স্টেশনারি', slug: 'books-stationery', description: 'Books and office supplies', icon: 'book', isFeatured: false, isActive: true, orderBy: 6 },
      { name: 'Automobile', nameBn: 'অটোমোবাইল', slug: 'automobile', description: 'Car and bike accessories', icon: 'car', isFeatured: false, isActive: true, orderBy: 7 },
      { name: 'Toys & Games', nameBn: 'খেলনা ও গেমস', slug: 'toys-games', description: 'Toys and video games', icon: 'gamepad-2', isFeatured: true, isActive: true, orderBy: 8 },
    ];
    
    const createdCategories = await Category.insertMany(categoriesData);
    
    // Create subcategories for Electronics
    const electronicsId = createdCategories.find(c => c.slug === 'electronics')._id;
    const electronicsSubcategories = [
      { name: 'Mobile Phones', nameBn: 'মোবাইল ফোন', slug: 'mobile-phones', description: 'Smartphones and feature phones', parentId: electronicsId, isFeatured: true, isActive: true, orderBy: 1 },
      { name: 'Laptops', nameBn: 'ল্যাপটপ', slug: 'laptops', description: 'Laptops and notebooks', parentId: electronicsId, isFeatured: true, isActive: true, orderBy: 2 },
      { name: 'Tablets', nameBn: 'ট্যাবলেট', slug: 'tablets', description: 'Tablets and iPads', parentId: electronicsId, isFeatured: false, isActive: true, orderBy: 3 },
      { name: 'Accessories', nameBn: 'অ্যাক্সেসোরিজ', slug: 'electronics-accessories', description: 'Phone and laptop accessories', parentId: electronicsId, isFeatured: false, isActive: true, orderBy: 4 },
      { name: 'Cameras', nameBn: 'ক্যামেরা', slug: 'cameras', description: 'Digital cameras and action cams', parentId: electronicsId, isFeatured: false, isActive: true, orderBy: 5 },
      { name: 'Audio', nameBn: 'অডিও', slug: 'audio', description: 'Headphones, speakers and audio gear', parentId: electronicsId, isFeatured: false, isActive: true, orderBy: 6 },
      { name: 'Gaming', nameBn: 'গেমিং', slug: 'gaming', description: 'Gaming consoles and accessories', parentId: electronicsId, isFeatured: true, isActive: true, orderBy: 7 },
      { name: 'Smart Watches', nameBn: 'স্মার্ট ওয়াচ', slug: 'smart-watches', description: 'Smart watches and fitness trackers', parentId: electronicsId, isFeatured: true, isActive: true, orderBy: 8 },
    ];
    
    // Create subcategories for Fashion
    const fashionId = createdCategories.find(c => c.slug === 'fashion')._id;
    const fashionSubcategories = [
      { name: "Men's Fashion", nameBn: 'পুরুষ', slug: 'mens-fashion', description: "Men clothing and accessories", parentId: fashionId, isFeatured: true, isActive: true, orderBy: 1 },
      { name: "Women's Fashion", nameBn: 'নারী', slug: 'womens-fashion', description: "Women clothing and accessories", parentId: fashionId, isFeatured: true, isActive: true, orderBy: 2 },
      { name: "Kids Fashion", nameBn: 'শিশু', slug: 'kids-fashion', description: "Kids clothing and toys", parentId: fashionId, isFeatured: false, isActive: true, orderBy: 3 },
      { name: 'Watches', nameBn: 'ঘড়ি', slug: 'watches', description: 'Men and women watches', parentId: fashionId, isFeatured: false, isActive: true, orderBy: 4 },
      { name: 'Jewelry', nameBn: 'আভরণ', slug: 'jewelry', description: 'Gold, silver and fashion jewelry', parentId: fashionId, isFeatured: false, isActive: true, orderBy: 5 },
      { name: 'Bags', nameBn: 'ব্যাগ', slug: 'bags', description: 'Handbags, wallets and luggage', parentId: fashionId, isFeatured: false, isActive: true, orderBy: 6 },
      { name: 'Shoes', nameBn: 'জুতা', slug: 'shoes', description: 'Shoes for men and women', parentId: fashionId, isFeatured: false, isActive: true, orderBy: 7 },
    ];
    
    // Create subcategories for Home & Living
    const homeId = createdCategories.find(c => c.slug === 'home-living')._id;
    const homeSubcategories = [
      { name: 'Furniture', nameBn: 'ফার্নিচার', slug: 'furniture', description: 'Sofas, beds and cabinets', parentId: homeId, isFeatured: true, isActive: true, orderBy: 1 },
      { name: 'Home Decor', nameBn: 'হোম ডেকর', slug: 'home-decor', description: 'Wall art, clocks and decorations', parentId: homeId, isFeatured: false, isActive: true, orderBy: 2 },
      { name: 'Lighting', nameBn: 'লাইটিং', slug: 'lighting', description: 'LED lights, lamps and bulbs', parentId: homeId, isFeatured: false, isActive: true, orderBy: 3 },
      { name: 'Kitchen', nameBn: 'রান্নাঘর', slug: 'kitchen', description: 'Kitchen appliances and utensils', parentId: homeId, isFeatured: false, isActive: true, orderBy: 4 },
      { name: 'Bedding', nameBn: 'বেডিং', slug: 'bedding', description: 'Mattresses, pillows and blankets', parentId: homeId, isFeatured: false, isActive: true, orderBy: 5 },
      { name: 'Curtains', nameBn: 'পর্দা', slug: 'curtains', description: 'Curtains and blinds', parentId: homeId, isFeatured: false, isActive: true, orderBy: 6 },
    ];
    
    // Create subcategories for Beauty & Health
    const beautyId = createdCategories.find(c => c.slug === 'beauty-health')._id;
    const beautySubcategories = [
      { name: 'Skincare', nameBn: 'স্কিনকেয়ার', slug: 'skincare', description: 'Creams, lotions and serums', parentId: beautyId, isFeatured: true, isActive: true, orderBy: 1 },
      { name: 'Makeup', nameBn: 'মেকআপ', slug: 'makeup', description: 'Lipstick, foundation and cosmetics', parentId: beautyId, isFeatured: true, isActive: true, orderBy: 2 },
      { name: 'Hair Care', nameBn: 'হেয়ার কেয়ার', slug: 'hair-care', description: 'Shampoo, oil and hair products', parentId: beautyId, isFeatured: false, isActive: true, orderBy: 3 },
      { name: 'Fragrances', nameBn: 'পারফিউম', slug: 'fragrances', description: 'Perfumes and deodorants', parentId: beautyId, isFeatured: false, isActive: true, orderBy: 4 },
      { name: 'Health Supplements', nameBn: 'হেল সাপ্লিমেন্ট', slug: 'health-supplements', description: 'Vitamins and supplements', parentId: beautyId, isFeatured: false, isActive: true, orderBy: 5 },
      { name: 'Fitness', nameBn: 'ফিটনেস', slug: 'fitness', description: 'Gym equipment and fitness gear', parentId: beautyId, isFeatured: false, isActive: true, orderBy: 6 },
    ];
    
    // Create subcategories for Sports & Outdoors
    const sportsId = createdCategories.find(c => c.slug === 'sports-outdoors')._id;
    const sportsSubcategories = [
      { name: 'Cricket', nameBn: 'ক্রিকেট', slug: 'cricket', description: 'Cricket bats, balls and gear', parentId: sportsId, isFeatured: true, isActive: true, orderBy: 1 },
      { name: 'Football', nameBn: 'ফুটবল', slug: 'football', description: 'Football shoes and accessories', parentId: sportsId, isFeatured: true, isActive: true, orderBy: 2 },
      { name: 'Badminton', nameBn: 'ব্যাডমিন্টন', slug: 'badminton', description: 'Rackets, shuttles and nets', parentId: sportsId, isFeatured: false, isActive: true, orderBy: 3 },
      { name: 'Cycling', nameBn: 'সাইক্লিং', slug: 'cycling', description: 'Bicycles and cycling gear', parentId: sportsId, isFeatured: false, isActive: true, orderBy: 4 },
      { name: 'Camping', nameBn: 'ক্যাম্পিং', slug: 'camping', description: 'Tents and outdoor equipment', parentId: sportsId, isFeatured: false, isActive: true, orderBy: 5 },
    ];
    
    // Create subcategories for Toys & Games
    const toysId = createdCategories.find(c => c.slug === 'toys-games')._id;
    const toysSubcategories = [
      { name: 'Action Figures', nameBn: 'অ্যাকশন ফিগার', slug: 'action-figures', description: 'Superhero and cartoon figures', parentId: toysId, isFeatured: false, isActive: true, orderBy: 1 },
      { name: 'Remote Control', nameBn: 'রিমোট কন্ট্রোল', slug: 'remote-control', description: 'RC cars and drones', parentId: toysId, isFeatured: false, isActive: true, orderBy: 2 },
      { name: 'Puzzles', nameBn: 'পাজল', slug: 'puzzles', description: 'Brain teasers and puzzles', parentId: toysId, isFeatured: false, isActive: true, orderBy: 3 },
      { name: 'Video Games', nameBn: 'ভিডিও গেমস', slug: 'video-games', description: 'PS, Xbox and PC games', parentId: toysId, isFeatured: true, isActive: true, orderBy: 4 },
    ];
    
    // Insert all subcategories
    await Category.insertMany([
      ...electronicsSubcategories,
      ...fashionSubcategories,
      ...homeSubcategories,
      ...beautySubcategories,
      ...sportsSubcategories,
      ...toysSubcategories
    ]);
    
    return NextResponse.json(
      { 
        message: 'Admin user and categories created successfully',
        email: adminUser.email,
        password: 'turjo0424',
        categoriesCreated: categoriesData.length + electronicsSubcategories.length + fashionSubcategories.length + homeSubcategories.length + beautySubcategories.length + sportsSubcategories.length + toysSubcategories.length
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json(
      { error: 'Failed to seed data: ' + error.message },
      { status: 500 }
    );
  }
}
