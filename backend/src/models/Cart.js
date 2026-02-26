const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  session_id: {
    type: DataTypes.STRING(100)
  },
  user_id: {
    type: DataTypes.INTEGER
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  variant_data: {
    type: DataTypes.JSON
  }
}, {
  tableName: 'carts',
  timestamps: true
});

module.exports = Cart;