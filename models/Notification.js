import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  message: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['order', 'payment', 'user', 'product', 'system', 'promotion', 'alert', 'info'],
    default: 'info'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  link: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  isRead: {
    type: Boolean,
    default: false
  },
  readAt: {
    type: Date,
    default: null
  },
  recipients: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  // For broadcast notifications
  isBroadcast: {
    type: Boolean,
    default: false
  },
  // Target roles for broadcast
  targetRoles: [{
    type: String,
    enum: ['super_admin', 'admin', 'moderator', 'editor', 'vendor', 'customer']
  }],
  // Schedule notification for later
  scheduledAt: {
    type: Date,
    default: null
  },
  // Expire notification after certain time
  expiresAt: {
    type: Date,
    default: null
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Index for faster queries
notificationSchema.index({ createdAt: -1 });
notificationSchema.index({ isRead: 1 });
notificationSchema.index({ type: 1 });

export default mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
