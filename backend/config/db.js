// backend/config/db.js

const { Sequelize } = require('sequelize');

// Conexión con SQLite
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_FILE || './database.sqlite',
  logging: process.env.NODE_ENV === 'development' ? console.log : false // opcional: elimina mensajes en consola
});

module.exports = sequelize;
