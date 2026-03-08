import mongoose from 'mongoose';

const settingSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  value: {
    type: mongoose.Schema.Types.Mixed,
  },
  type: {
    type: String,
    enum: ['text', 'number', 'boolean', 'json', 'image'],
    default: 'text',
  },
  description: String,
}, {
  timestamps: true,
});

// Indexes
settingSchema.index({ key: 1 });

const Setting = mongoose.models.Setting || mongoose.model('Setting', settingSchema);

export default Setting;
