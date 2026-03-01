import mongoose from 'mongoose';

const shippingZoneSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  countries: [{
    type: String,
    required: true
  }],
  regions: [{
    type: String
  }],
  isActive: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

const shippingMethodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    default: ''
  },
  type: {
    type: String,
    enum: ['flat_rate', 'weight_based', 'price_based', 'free_shipping', 'local_pickup'],
    default: 'flat_rate'
  },
  cost: {
    type: Number,
    default: 0
  },
  minimumOrderAmount: {
    type: Number,
    default: 0
  },
  maximumOrderAmount: {
    type: Number,
    default: null
  },
  freeShippingThreshold: {
    type: Number,
    default: null
  },
  weightFrom: {
    type: Number,
    default: 0
  },
  weightTo: {
    type: Number,
    default: null
  },
  priceFrom: {
    type: Number,
    default: 0
  },
  priceTo: {
    type: Number,
    default: null
  },
  estimatedDeliveryDays: {
    type: Number,
    default: 3
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDefault: {
    type: Boolean,
    default: false
  },
  zone: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShippingZone'
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
shippingMethodSchema.index({ isActive: 1 });
shippingMethodSchema.index({ type: 1 });

export const ShippingZone = mongoose.models.ShippingZone || mongoose.model('ShippingZone', shippingZoneSchema);
export const ShippingMethod = mongoose.models.ShippingMethod || mongoose.model('ShippingMethod', shippingMethodSchema);
