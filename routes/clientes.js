const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Ruta para crear un nuevo cliente
router.post('/', clienteController.createCliente);

// Ruta para obtener todos los clientes
router.get('/', clienteController.getClientes);

// Ruta para obtener un cliente por ID
router.get('/:id', clienteController.getClienteById);

// Ruta para actualizar un cliente por ID
router.put('/:id', clienteController.updateCliente);

// Ruta para eliminar un cliente por ID
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
