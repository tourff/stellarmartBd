import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [255, 'Name cannot be more than 255 characters'],
  },
  nameBn: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Product slug is required'],
    unique: true,
    lowercase: true,
  },
  sku: {
    type: String,
    unique: true,
    sparse: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category is required'],
  },
  subcategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
  brand: {
    type: String,
    trim: true,
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  
  // Pricing
  regularPrice: {
    type: Number,
    required: [true, 'Regular price is required'],
    min: 0,
  },
  sellingPrice: {
    type: Number,
    required: [true, 'Selling price is required'],
    min: 0,
  },
  discountPrice: {
    type: Number,
    default: 0,
  },
  discountPercent: {
    type: Number,
    default: 0,
  },
  discountStartDate: {
    type: Date,
  },
  discountEndDate: {
    type: Date,
  },
  
  // Stock Management
  stockQuantity: {
    type: Number,
    default: 0,
    min: 0,
  },
  stockStatus: {
    type: String,
    enum: ['in_stock', 'out_of_stock', 'pre_order'],
    default: 'in_stock',
  },
  lowStockThreshold: {
    type: Number,
    default: 5,
  },
  
  // Product Details
  description: {
    type: String,
  },
  descriptionBn: {
    type: String,
  },
  specification: {
    type: String,
  },
  specificationBn: {
    type: String,
  },
  
  // Media
  images: [{
    type: String,
  }],
  featuredImage: {
    type: String,
  },
  videoUrl: {
    type: String,
  },
  
  // SEO
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
  
  // Status
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isNewArrival: {
    type: Boolean,
    default: false,
  },
  isBestSeller: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  
  // Tags
  tags: [{
    type: String,
  }],
  
  // Created By
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

// Indexes
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ isFeatured: 1 });
productSchema.index({ isNewArrival: 1 });
productSchema.index({ isBestSeller: 1 });
productSchema.index({ stockStatus: 1 });
productSchema.index({ tags: 1 });
productSchema.index({ createdAt: -1 });

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

export default Product;
