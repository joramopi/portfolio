const sequelize = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { logger } = require('../middleware/logger');

async function initializeDatabase() {
  try {
    logger.info('Iniciando sincronización de base de datos...');

    // Sincronizar modelos
    await sequelize.sync({ force: false });
    logger.info('Base de datos sincronizada exitosamente');

    // Verificar si existe usuario admin
    const adminExists = await User.findOne({ where: { role: 'admin' } });

    if (!adminExists) {
      logger.info('No existe usuario admin, creando uno por defecto...');

      const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
      const hashedPassword = await bcrypt.hash('admin123', saltRounds);

      await User.create({
        name: 'Administrador',
        email: 'admin@portfolio.com',
        password: hashedPassword,
        role: 'admin'
      });

      logger.info('Usuario administrador creado exitosamente');
      logger.warn('IMPORTANTE: Cambiar la contraseña por defecto (admin123)');
    } else {
      logger.info('Usuario administrador ya existe');
    }

    logger.info('Inicialización de base de datos completada');
    process.exit(0);
  } catch (error) {
    logger.error('Error inicializando base de datos', {
      error: error.message,
      stack: error.stack
    });
    process.exit(1);
  }
}

// Ejecutar solo si es llamado directamente
if (require.main === module) {
  initializeDatabase();
}

module.exports = initializeDatabase;
