import mongoose from 'mongoose';

const activityLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  action: {
    type: String,
    required: true,
    enum: [
      'login',
      'logout',
      'create',
      'update',
      'delete',
      'view',
      'export',
      'import',
      'backup',
      'restore',
      'settings_change',
      'password_change',
      'role_change',
      'status_change',
      'approve',
      'reject',
      'cancel',
      'refund'
    ]
  },
  entityType: {
    type: String,
    enum: ['user', 'product', 'category', 'order', 'coupon', 'banner', 'vendor', 'shipping', 'settings', 'page', 'media', 'notification', 'other'],
    default: 'other'
  },
  entityId: {
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  description: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    default: ''
  },
  userAgent: {
    type: String,
    default: ''
  },
  location: {
    country: String,
    city: String,
    ip: String
  },
  metadata: {
    type: mongoose.Schema.Types.Mixed,
    default: {}
  },
  status: {
    type: String,
    enum: ['success', 'failed', 'pending'],
    default: 'success'
  },
  errorMessage: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Index for faster queries
activityLogSchema.index({ createdAt: -1 });
activityLogSchema.index({ user: 1 });
activityLogSchema.index({ action: 1 });
activityLogSchema.index({ entityType: 1, entityId: 1 });

// TTL index to auto-delete logs after 90 days
activityLogSchema.index({ createdAt: 1 }, { expireAfterSeconds: 90 * 24 * 60 * 60 });

export default mongoose.models.ActivityLog || mongoose.model('ActivityLog', activityLogSchema);
