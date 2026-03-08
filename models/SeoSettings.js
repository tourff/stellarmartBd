import mongoose from 'mongoose';

const seoSettingsSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    enum: [
      'global',
      'homepage',
      'products',
      'categories',
      'blog',
      'contact',
      'about',
      'privacy_policy',
      'terms_conditions',
      'faq'
    ]
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  keywords: [{
    type: String
  }],
  ogImage: {
    type: String,
    default: ''
  },
  canonicalUrl: {
    type: String,
    default: ''
  },
  robots: {
    type: String,
    default: 'index, follow'
  },
  // Structured data (JSON-LD)
  schemaMarkup: {
    type: String,
    default: ''
  },
  // Open Graph settings
  ogTitle: {
    type: String,
    default: ''
  },
  ogDescription: {
    type: String,
    default: ''
  },
  ogType: {
    type: String,
    default: 'website'
  },
  // Twitter Card settings
  twitterCardType: {
    type: String,
    default: 'summary_large_image'
  },
  twitterSite: {
    type: String,
    default: ''
  },
  twitterCreator: {
    type: String,
    default: ''
  },
  isActive: {
    type: Boolean,
    default: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

export default mongoose.models.SeoSettings || mongoose.model('SeoSettings', seoSettingsSchema);
