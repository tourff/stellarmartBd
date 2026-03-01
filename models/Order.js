import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  productImage: String,
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  unitPrice: {
    type: Number,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  variant: {
    type: mongoose.Schema.Types.Mixed,
  },
});

const orderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  
  // Billing & Shipping
  billingName: String,
  billingEmail: String,
  billingPhone: String,
  billingAddress: String,
  billingCity: String,
  billingPostalCode: String,
  billingCountry: {
    type: String,
    default: 'Bangladesh',
  },
  
  shippingName: String,
  shippingPhone: String,
  shippingAddress: String,
  shippingCity: String,
  shippingPostalCode: String,
  shippingCountry: {
    type: String,
    default: 'Bangladesh',
  },
  
  // Order Items
  items: [orderItemSchema],
  
  // Order Totals
  subtotal: {
    type: Number,
    required: true,
  },
  shippingCost: {
    type: Number,
    default: 0,
  },
  taxAmount: {
    type: Number,
    default: 0,
  },
  discountAmount: {
    type: Number,
    default: 0,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  
  // Payment
  paymentMethod: String,
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded', 'cancelled'],
    default: 'pending',
  },
  transactionId: String,
  paymentDetails: {
    type: mongoose.Schema.Types.Mixed,
  },
  
  // Order Status
  orderStatus: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'pending',
  },
  
  // Shipping
  shippingMethod: String,
  trackingNumber: String,
  shippedDate: Date,
  deliveredDate: Date,
  
  // Notes
  customerNotes: String,
  adminNotes: String,
}, {
  timestamps: true,
});

// Indexes
orderSchema.index({ orderNumber: 1 });
orderSchema.index({ user: 1 });
orderSchema.index({ orderStatus: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);

export default Order;
