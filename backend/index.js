// backend/index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db'); // <-- nuevo import
const authRoutes = require('./routes/authRoutes');
const publicacionesRoutes = require('./routes/publicacionesRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', publicacionesRoutes);
app.use('/api', authRoutes);

// Conectar DB y arrancar servidor
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a SQLite');
    return sequelize.sync(); // sincroniza todos los modelos
  })
  .then(() => {
    console.log('📦 Modelos sincronizados');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('❌ Error al conectar a la base de datos:', err.message);
  });
