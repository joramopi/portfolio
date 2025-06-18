const fs = require('fs');
const path = require('path');

// Crear directorio de logs si no existe
const logsDir = path.join(__dirname, '../logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Función para formatear fecha
const formatDate = () => {
  return new Date().toISOString();
};

// Función para escribir logs
const writeLog = (level, message, meta = {}) => {
  if (process.env.NODE_ENV === 'test') return;

  const logEntry = {
    timestamp: formatDate(),
    level,
    message,
    ...meta
  };

  // Log en consola para desarrollo
  if (process.env.NODE_ENV === 'development') {
    const colorMap = {
      error: '\x1b[31m', // rojo
      warn: '\x1b[33m',  // amarillo
      info: '\x1b[36m',  // cyan
      debug: '\x1b[90m'  // gris
    };

    console.log(
      `${colorMap[level] || ''}${logEntry.timestamp} [${level.toUpperCase()}] ${message}\x1b[0m`,
      meta && Object.keys(meta).length > 0 ? meta : ''
    );
  }

  // Escribir a archivo en producción
  if (process.env.NODE_ENV === 'production') {
    const logFile = path.join(logsDir, `${new Date().toISOString().split('T')[0]}.log`);
    const logLine = JSON.stringify(logEntry) + '\n';

    fs.appendFile(logFile, logLine, (err) => {
      if (err) console.error('Error escribiendo log:', err);
    });
  }
};

// Logger object
const logger = {
  error: (message, meta = {}) => writeLog('error', message, meta),
  warn: (message, meta = {}) => writeLog('warn', message, meta),
  info: (message, meta = {}) => writeLog('info', message, meta),
  debug: (message, meta = {}) => writeLog('debug', message, meta),
};

// Middleware para request logging
const requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusColor = res.statusCode >= 400 ? 'error' : 'info';

    logger[statusColor](`${req.method} ${req.originalUrl}`, {
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  });

  next();
};

module.exports = { logger, requestLogger };
