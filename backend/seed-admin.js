require('dotenv').config();
const bcrypt = require('bcryptjs');
const { connectDatabase } = require('./src/config/database');
const User = require('./src/models/User');

async function createAdmin() {
  try {
    // Connect to database
    await connectDatabase();
    
    console.log('Creating admin user...');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@stellarmartbd.com' } });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      process.exit(0);
    }
    
    // Create admin user
    const admin = await User.create({
      name: 'Super Admin',
      email: 'admin@stellarmartbd.com',
      password: 'turjo0424',
      role: 'admin',
      status: 'active',
      phone: '+8801234567890'
    });
    
    console.log('Admin user created successfully!');
    console.log('Admin email: admin@stellarmartbd.com');
    console.log('Admin password: turjo0424');
    
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();
