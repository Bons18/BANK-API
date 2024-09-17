const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');

// Ruta para crear un nuevo usuario
router.post('/', usuarioController.createUsuario);

// Ruta para obtener todos los usuarios
router.get('/', usuarioController.getUsuarios);

// Ruta para obtener un usuario por nombre de usuario
router.get('/:nombreUsuario', usuarioController.getUsuarioByNombre);

// Ruta para actualizar un usuario por nombre de usuario
router.put('/:nombreUsuario', usuarioController.updateUsuario);

// Ruta para eliminar un usuario por nombre de usuario
router.delete('/:nombreUsuario', usuarioController.deleteUsuario);

module.exports = router;
