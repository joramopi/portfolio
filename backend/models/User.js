const { DataTypes } = require('sequelize');
const { sequelize } = require('../index');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'editor',
    validate: {
      isIn: [['admin', 'editor']],
    },
  },
});

module.exports = User;
