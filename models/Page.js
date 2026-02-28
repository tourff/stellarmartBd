import mongoose from 'mongoose';

const pageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Page title is required'],
    trim: true,
  },
  titleBn: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    required: [true, 'Page slug is required'],
    unique: true,
    lowercase: true,
  },
  content: {
    type: String,
  },
  contentBn: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  metaDescription: {
    type: String,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Indexes
pageSchema.index({ slug: 1 });
pageSchema.index({ isActive: 1 });

const Page = mongoose.models.Page || mongoose.model('Page', pageSchema);

export default Page;
