import mongoose from 'mongoose';

const pageViewSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true
  },
  title: {
    type: String,
    default: ''
  },
  views: {
    type: Number,
    default: 0
  },
  uniqueViews: {
    type: Number,
    default: 0
  },
  avgTimeOnPage: {
    type: Number,
    default: 0 // in seconds
  },
  bounceRate: {
    type: Number,
    default: 0
  }
});

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
    unique: true
  },
  // Traffic metrics
  pageViews: {
    type: Number,
    default: 0
  },
  uniqueVisitors: {
    type: Number,
    default: 0
  },
  sessions: {
    type: Number,
    default: 0
  },
  // User metrics
  newVisitors: {
    type: Number,
    default: 0
  },
  returningVisitors: {
    type: Number,
    default: 0
  },
  // Geographic data
  countries: [{
    country: String,
    visitors: Number,
    percentage: Number
  }],
  cities: [{
    city: String,
    country: String,
    visitors: Number
  }],
  // Device data
  devices: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 }
  },
  browsers: [{
    browser: String,
    sessions: Number,
    percentage: Number
  }],
  operatingSystems: [{
    os: String,
    sessions: Number,
    percentage: Number
  }],
  // Source/Referral data
  sources: [{
    source: String,
    medium: String,
    sessions: Number,
    newSessions: Number,
    bounceRate: Number
  }],
  // Top pages
  topPages: [pageViewSchema],
  // E-commerce metrics
  conversions: {
    type: Number,
    default: 0
  },
  conversionRate: {
    type: Number,
    default: 0
  },
  revenue: {
    type: Number,
    default: 0
  },
  // Engagement metrics
  avgSessionDuration: {
    type: Number,
    default: 0 // in seconds
  },
  pagesPerSession: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for faster queries
analyticsSchema.index({ date: -1 });

export default mongoose.models.Analytics || mongoose.model('Analytics', analyticsSchema);
