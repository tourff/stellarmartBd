const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  order_number: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  // Billing
  billing_name: {
    type: DataTypes.STRING(100)
  },
  billing_email: {
    type: DataTypes.STRING(255)
  },
  billing_phone: {
    type: DataTypes.STRING(20)
  },
  billing_address: {
    type: DataTypes.TEXT
  },
  billing_city: {
    type: DataTypes.STRING(100)
  },
  billing_postal_code: {
    type: DataTypes.STRING(20)
  },
  billing_country: {
    type: DataTypes.STRING(100),
    defaultValue: 'Bangladesh'
  },
  // Shipping
  shipping_name: {
    type: DataTypes.STRING(100)
  },
  shipping_phone: {
    type: DataTypes.STRING(20)
  },
  shipping_address: {
    type: DataTypes.TEXT
  },
  shipping_city: {
    type: DataTypes.STRING(100)
  },
  shipping_postal_code: {
    type: DataTypes.STRING(20)
  },
  shipping_country: {
    type: DataTypes.STRING(100),
    defaultValue: 'Bangladesh'
  },
  // Totals
  subtotal: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  shipping_cost: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  tax_amount: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  discount_amount: {
    type: DataTypes.DECIMAL(12, 2),
    defaultValue: 0
  },
  total_amount: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  // Payment
  payment_method: {
    type: DataTypes.STRING(50)
  },
  payment_status: {
    type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
    defaultValue: 'pending'
  },
  transaction_id: {
    type: DataTypes.STRING(255)
  },
  // Status
  order_status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded'),
    defaultValue: 'pending'
  },
  // Shipping Info
  shipping_method: {
    type: DataTypes.STRING(50)
  },
  tracking_number: {
    type: DataTypes.STRING(100)
  },
  shipped_date: {
    type: DataTypes.DATE
  },
  delivered_date: {
    type: DataTypes.DATE
  },
  // Notes
  customer_notes: {
    type: DataTypes.TEXT
  },
  admin_notes: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'orders',
  timestamps: true
});

module.exports = Order;