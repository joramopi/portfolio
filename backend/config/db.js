// backend/config/db.js

const { Sequelize } = require('sequelize');

// Conexión con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false // opcional: elimina mensajes en consola
});

module.exports = sequelize;
