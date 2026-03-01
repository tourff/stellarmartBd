import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    trim: true,
    maxlength: [100, 'Name cannot be more than 100 characters'],
  },
  nameBn: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Category slug is required'],
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
  },
  icon: {
    type: String,
  },
  image: {
    type: String,
  },
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  isFeatured: {
    type: Boolean,
    default: false,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  orderBy: {
    type: Number,
    default: 0,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  metaKeywords: {
    type: String,
  },
}, {
  timestamps: true,
});

// Virtual for subcategories
categorySchema.virtual('subcategories', {
  ref: 'Category',
  localField: '_id',
  foreignField: 'parentId'
});

// Indexes
categorySchema.index({ slug: 1 });
categorySchema.index({ parentId: 1 });
categorySchema.index({ isFeatured: 1 });
categorySchema.index({ orderBy: 1 });

// Ensure virtuals are included in JSON
categorySchema.set('toJSON', { virtuals: true });
categorySchema.set('toObject', { virtuals: true });

const Category = mongoose.models.Category || mongoose.model('Category', categorySchema);

export default Category;
