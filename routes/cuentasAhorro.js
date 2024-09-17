const express = require('express');
const router = express.Router();
const cuentaAhorroController = require('../controllers/cuentaAhorroController');


router.get('/', cuentaAhorroController.obtenerCuentas);

// Ruta para listar una cuenta
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
