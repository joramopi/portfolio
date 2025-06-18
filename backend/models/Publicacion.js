const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Publicacion = sequelize.define('Publicacion', {
  titulo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  anio: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  revista: {
    type: DataTypes.STRING,
    allowNull: false
  },
  doi: {
    type: DataTypes.STRING,
    allowNull: false
  },
  portada: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

module.exports = Publicacion;
