const express = require('express');
const router = express.Router();
const cuentaAhorroController = require('../controllers/cuentaAhorroController');

// Ruta para listar todas las cuentas
router.get('/', cuentaAhorroController.obtenerCuentas);

// Ruta para obtener una cuenta por número
router.get('/:numeroCuenta', cuentaAhorroController.obtenerCuenta);

// Ruta para crear una cuenta
router.post('/', cuentaAhorroController.crearCuenta);

// Ruta para consignar dinero en una cuenta
router.put('/:numeroCuenta/consignar', cuentaAhorroController.consignarDinero);

// Ruta para retirar dinero de una cuenta
router.put('/:numeroCuenta/retiro', cuentaAhorroController.retirarDinero);

// Ruta para eliminar una cuenta
router.delete('/:numeroCuenta', cuentaAhorroController.eliminarCuenta);

module.exports = router;
