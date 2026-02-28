const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Banner = sequelize.define('Banner', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Banner title is required' }
    }
  },
  subtitle: {
    type: DataTypes.STRING,
    allowNull: true
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Banner image is required' }
    }
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true
  },
  position: {
    type: DataTypes.ENUM('hero', 'middle', 'bottom'),
    defaultValue: 'hero'
  },
  isActive: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'banners',
  timestamps: true,
  underscored: true
});

module.exports = Banner;
