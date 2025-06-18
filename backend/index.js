// backend/index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');
require('./models/User');
require('./models/Publicacion');
const authRoutes = require('./routes/authRoutes');
const publicacionesRoutes = require('./routes/publicacionesRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const publicRoutes = require('./routes/publicRoutes');
const path = require('path');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
// Middlewares de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", 'data:', 'https:'],
    },
  },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Rate limiting
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: {
    error: 'Demasiados intentos de login. Intenta de nuevo en 15 minutos.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    error: 'Demasiadas peticiones. Intenta de nuevo más tarde.'
  }
});

const speedLimiter = slowDown({
  windowMs: 15 * 60 * 1000,
  delayAfter: 50,
  delayMs: 500
});

// Aplicar limiters
app.use('/api/login', authLimiter);
app.use('/api/register', authLimiter);
app.use('/api', apiLimiter);
app.use('/api', speedLimiter);

// Middleware existente
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// Rutas públicas (sin /api prefix)
app.use('/', publicRoutes);

// Rutas protegidas (con /api prefix)
app.use('/api', authRoutes);
app.use('/api', publicacionesRoutes);
app.use('/api', uploadRoutes);

app.use(errorHandler);

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
