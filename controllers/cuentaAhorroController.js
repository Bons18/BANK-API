const CuentaAhorro = require('../models/CuentaAhorro');

// Obtener una cuenta por número
exports.obtenerCuenta = async (req, res) => {
  try {
    const { numeroCuenta } = req.params;
    const cuenta = await CuentaAhorro.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada." });
    }
    res.status(200).json(cuenta);
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener la cuenta.", error });
  }
};

// Crear una cuenta
exports.crearCuenta = async (req, res) => {
  try {
    const { numeroCuenta, documentoCliente, fechaApertura, saldo, claveAcceso } = req.body;

    if (saldo < 0) {
      return res.status(400).json({ mensaje: "El saldo inicial no puede ser negativo." });
    }

    const cuentaExistente = await CuentaAhorro.findOne({ numeroCuenta });
    if (cuentaExistente) {
      return res.status(400).json({ mensaje: "El número de cuenta ya existe." });
    }

    // Encriptar la clave de acceso
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hashedClaveAcceso = await bcrypt.hash(claveAcceso, saltRounds);

    const nuevaCuenta = new CuentaAhorro({
      numeroCuenta,
      documentoCliente,
      fechaApertura,
      saldo,
      claveAcceso: hashedClaveAcceso
    });

    await nuevaCuenta.save();
    res.status(201).json({ mensaje: "Cuenta creada con éxito.", cuenta: nuevaCuenta });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al crear la cuenta.", error });
  }
};

// Consignar dinero en una cuenta
exports.consignarDinero = async (req, res) => {
  try {
    const { numeroCuenta } = req.params;
    const { monto } = req.body;

    if (monto <= 0) {
      return res.status(400).json({ mensaje: "El monto a consignar debe ser mayor que cero." });
    }

    const cuenta = await CuentaAhorro.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada." });
    }

    cuenta.saldo += monto;
    await cuenta.save();

    res.status(200).json({ mensaje: "Consignación realizada con éxito.", cuenta });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al realizar la consignación.", error });
  }
};

// Retirar dinero de una cuenta
exports.retirarDinero = async (req, res) => {
  try {
    const { numeroCuenta } = req.params;
    const { monto } = req.body;

    if (monto <= 0) {
      return res.status(400).json({ mensaje: "El monto a retirar debe ser mayor que cero." });
    }

    const cuenta = await CuentaAhorro.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada." });
    }

    if (monto > cuenta.saldo) {
      return res.status(400).json({ mensaje: "Saldo insuficiente para el retiro." });
    }

    cuenta.saldo -= monto;
    await cuenta.save();

    res.status(200).json({ mensaje: "Retiro realizado con éxito.", cuenta });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al realizar el retiro.", error });
  }
};

// Eliminar una cuenta
exports.eliminarCuenta = async (req, res) => {
  try {
    const { numeroCuenta } = req.params;

    const cuenta = await CuentaAhorro.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada." });
    }

    if (cuenta.saldo !== 0) {
      return res.status(400).json({ mensaje: "La cuenta debe tener un saldo de cero para poder eliminarla." });
    }

    await CuentaAhorro.deleteOne({ numeroCuenta });
    res.status(200).json({ mensaje: "Cuenta eliminada con éxito." });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al eliminar la cuenta.", error });
  }
};
