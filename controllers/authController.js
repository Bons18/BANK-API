// controllers/authController.js
const Usuario = require('../models/Usuario');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  try {
    const { nombreUsuario, password } = req.body;

    // Buscar al usuario
    const usuario = await Usuario.findOne({ nombreUsuario });
    if (!usuario) {
      return res.status(401).json({ mensaje: 'Usuario no encontrado.' });
    }

    // Comparar la contraseña
    const esValido = await usuario.comparePassword(password);
    if (!esValido) {
      return res.status(401).json({ mensaje: 'Contraseña incorrecta.' });
    }

    // Verificar estado
    if (usuario.estado !== 'activo') {
      return res.status(403).json({ mensaje: 'Usuario no está activo.' });
    }

    // Generar token
    const token = jwt.sign({ id: usuario._id, nombreUsuario: usuario.nombreUsuario }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ mensaje: 'Autenticación exitosa.', token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el proceso de autenticación.', error });
  }
};
