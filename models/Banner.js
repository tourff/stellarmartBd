import mongoose from 'mongoose';

const bannerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Banner title is required'],
    trim: true,
  },
  titleBn: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
  },
  descriptionBn: {
    type: String,
  },
  image: {
    type: String,
    required: [true, 'Banner image is required'],
  },
  link: {
    type: String,
  },
  linkText: {
    type: String,
    default: 'Shop Now',
  },
  position: {
    type: String,
    enum: ['hero', 'top', 'middle', 'bottom', 'popup'],
    default: 'hero',
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  orderBy: {
    type: Number,
    default: 0,
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Indexes
bannerSchema.index({ position: 1 });
bannerSchema.index({ isActive: 1 });
bannerSchema.index({ orderBy: 1 });

const Banner = mongoose.models.Banner || mongoose.model('Banner', bannerSchema);

export default Banner;
