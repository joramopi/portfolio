const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');
const { logger } = require('../middleware/logger');

const register = async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Intento de registro con datos inválidos', {
        errors: errors.array(),
        ip: req.ip
      });
      return res.status(400).json({
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const { name, email, password, role } = req.body;

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ where: { email: email.toLowerCase() } });
    if (existingUser) {
      logger.warn('Intento de registro con email existente', {
        email: email.toLowerCase(),
        ip: req.ip
      });
      return res.status(400).json({ message: 'El correo ya está registrado' });
    }

    // Hashear contraseña con rounds configurables
    const saltRounds = parseInt(process.env.BCRYPT_ROUNDS) || 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Crear usuario
    const newUser = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password: hashedPassword,
      role: role || 'editor'
    });

    logger.info('Usuario registrado exitosamente', {
      userId: newUser.id,
      email: newUser.email,
      role: newUser.role
    });

    const userResponse = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      user: userResponse
    });
  } catch (error) {
    logger.error('Error en registro de usuario', {
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const login = async (req, res) => {
  try {
    // Verificar errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      logger.warn('Intento de login con datos inválidos', {
        errors: errors.array(),
        ip: req.ip
      });
      return res.status(400).json({
        message: 'Datos inválidos',
        errors: errors.array()
      });
    }

    const { email, password } = req.body;

    // Buscar usuario (case insensitive)
    const user = await User.findOne({ where: { email: email.toLowerCase() } });
    if (!user) {
      logger.warn('Intento de login con email inexistente', {
        email: email.toLowerCase(),
        ip: req.ip
      });
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Verificar contraseña
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn('Intento de login con contraseña incorrecta', {
        email: email.toLowerCase(),
        userId: user.id,
        ip: req.ip
      });
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generar JWT
    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email
      },
      process.env.JWT_SECRET,
      {
        expiresIn: '24h',
        issuer: 'portfolio-cms',
        audience: 'portfolio-frontend'
      }
    );

    logger.info('Login exitoso', {
      userId: user.id,
      email: user.email,
      role: user.role,
      ip: req.ip
    });

    // Respuesta exitosa
    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    logger.error('Error en login', {
      error: error.message,
      stack: error.stack,
      ip: req.ip
    });
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findByPk(req.userId, {
      attributes: ['id', 'name', 'email', 'role', 'createdAt']
    });

    if (!user) {
      logger.warn('Usuario no encontrado en getMe', {
        userId: req.userId,
        ip: req.ip
      });
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json(user);
  } catch (error) {
    logger.error('Error al obtener perfil de usuario', {
      error: error.message,
      userId: req.userId,
      ip: req.ip
    });
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

module.exports = { register, login, getMe };
