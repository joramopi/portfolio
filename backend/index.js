// backend/index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Sequelize } = require('sequelize');
const authRoutes = require('./routes/authRoutes'); // Asegúrate de crear esto después

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Base de datos SQLite con Sequelize
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Probar conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a la base de datos SQLite');
  })
  .catch(err => {
    console.error('❌ Error al conectar a SQLite:', err);
  });

// Rutas
app.use('/api', authRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

module.exports = { sequelize }; // Para que otros archivos puedan usar la conexión
