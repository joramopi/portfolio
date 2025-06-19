// backend/index.js

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const slowDown = require('express-slow-down');
const path = require('path');

const sequelize = require('./config/db');
const { logger, requestLogger } = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Importar modelos
require('./models/User');
require('./models/Publicacion');

// Importar rutas
const authRoutes = require('./routes/authRoutes');
const publicacionesRoutes = require('./routes/publicacionesRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const publicRoutes = require('./routes/publicRoutes');

dotenv.config();

const app = express();
app.disable('x-powered-by');
const PORT = process.env.PORT || 3000;

// Request logging middleware (antes que todo)
app.use(requestLogger);

// Middlewares de seguridad
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'"] ,
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
app.use(express.json({ limit: '10mb' }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// Rutas públicas (sin /api prefix)
app.use('/', publicRoutes);

// Rutas protegidas (con /api prefix)
app.use('/api', authRoutes);
app.use('/api', publicacionesRoutes);
app.use('/api', uploadRoutes);

// Error handler (debe ir al final)
app.use(errorHandler);

// Conectar DB y arrancar servidor
sequelize.authenticate()
  .then(() => {
    logger.info('Conectado a SQLite exitosamente');
    return sequelize.sync();
  })
  .then(() => {
    logger.info('Modelos sincronizados con la base de datos');
    app.listen(PORT, () => {
      logger.info(`Servidor corriendo en http://localhost:${PORT}`, {
        port: PORT,
        environment: process.env.NODE_ENV || 'development'
      });
    });
  })
  .catch((err) => {
    logger.error('Error al conectar a la base de datos', {
      error: err.message,
      stack: err.stack
    });
    process.exit(1);
  });

// Manejo de errores no capturados
process.on('uncaughtException', (err) => {
  logger.error('Uncaught Exception', {
    error: err.message,
    stack: err.stack
  });
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled Rejection', {
    reason: reason,
    promise: promise
  });
});
