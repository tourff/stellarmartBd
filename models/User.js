import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/users'; // আপনার মডেলের পাথ অনুযায়ী চেক করে নিন

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'নাম দিন'],
    trim: true,
    maxlength: [50, 'নাম ৫০ অক্ষরের বেশি হতে পারবে না']
  },
  email: {
    type: String,
    required: [true, 'ইমেইল দিন'],
    unique: true,
    lowercase: true,
    match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'সঠিক ইমেইল লিখুন']
  },
  password: {
    type: String,
    required: [true, 'পাসওয়ার্ড দিন'],
    minlength: [6, 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'],
    select: false
  },
  phone: {
    type: String,
    unique: true,
    sparse: true,
    match: [/^(\+?88|0)?1[3-9]\d{8}$/, 'সঠিক বাংলাদেশি নম্বর দিন']
  },
  avatar: {
    type: String,
    default: ''
  },
  role: {
    type: String,
    enum: ['customer', 'admin', 'vendor'],
    default: 'customer'
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'suspended'],
    default: 'active'
  },
  lastLogin: {
    type: Date
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'Bangladesh'
    }
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true
});

// Password hashing before save
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(12);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Index for better query performance
userSchema.index({ email: 1 });
userSchema.index({ phone: 1 });
userSchema.index({ status: 1, role: 1 });

const User = mongoose.models.User || mongoose.model('User', userSchema);

    // যদি মঙ্গোডিবি থেকে Duplicate Key এরর আসে (যেমন ইমেইল বা ফোন ডুপ্লিকেট)
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'ইমেইল বা ফোন নম্বরটি ইতিমধ্যে ব্যবহার করা হয়েছে' },
        { status: 400 }
      );
    }

    // মঙ্গুজ ভ্যালিডেশন এরর হলে
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map(val => val.message);
      return NextResponse.json({ error: messages[0] }, { status: 400 });
    }

    return NextResponse.json(
      { error: 'সার্ভারে সমস্যা হয়েছে। দয়া করে আবার চেষ্টা করুন।' },
      { status: 500 }
    );
  }
}