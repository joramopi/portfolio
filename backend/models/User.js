// backend/models/User.js

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // <-- ¡aquí está el cambio!

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'editor'),
    defaultValue: 'editor'
  }
});

module.exports = User;
