const CuentaAhorro = require('../models/CuentaAhorro'); // Importa el modelo de CuentaAhorro desde los modelos

// Obtener todas las cuentas
exports.obtenerCuentas = async (req, res) => {
  try {
    // Recupera todas las cuentas de ahorro de la base de datos
    const cuentas = await CuentaAhorro.find();
    // Devuelve la lista de cuentas en formato JSON
    res.json(cuentas);
  } catch (error) {
    // En caso de error, responde con un estado 500 y un mensaje de error en formato JSON
    res.status(500).json({ mensaje: "Error al obtener las cuentas.", error });
  }
};

// Obtener una cuenta por número
exports.obtenerCuenta = async (req, res) => {
  try {
    // Recupera el número de cuenta de los parámetros de la URL
    const { numeroCuenta } = req.params;
    // Busca una cuenta en la base de datos que coincida con el número de cuenta proporcionado
    const cuenta = await CuentaAhorro.findOne({ numeroCuenta });
    // Si la cuenta no se encuentra, devuelve un estado 404 con un mensaje de error
    if (!cuenta) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada." });
    }
    // Si la cuenta existe, devuelve un estado 200 y los detalles de la cuenta
    res.status(200).json(cuenta);
  } catch (error) {
    // En caso de error, responde con un estado 500 y un mensaje de error en formato JSON
    res.status(500).json({ mensaje: "Error al obtener la cuenta.", error });
  }
};

// Crear una nueva cuenta
exports.crearCuenta = async (req, res) => {
  try {
    const { numeroCuenta, documentoCliente, fechaApertura, saldo, claveAcceso } = req.body;

    // Verifica que el saldo inicial no sea negativo
    if (saldo < 0) {
      return res.status(400).json({ mensaje: "El saldo inicial no puede ser negativo." });
    }

    // Verifica si el número de cuenta ya existe en la base de datos
    const cuentaExistente = await CuentaAhorro.findOne({ numeroCuenta });
    if (cuentaExistente) {
      return res.status(400).json({ mensaje: "El número de cuenta ya existe." });
    }

    // Encripta la clave de acceso usando bcrypt con un factor de sal de 10
    const bcrypt = require('bcrypt');
    const saltRounds = 10;
    const hashedClaveAcceso = await bcrypt.hash(claveAcceso, saltRounds);

    // Crea una nueva cuenta de ahorro con los datos proporcionados, incluyendo la clave encriptada
    const nuevaCuenta = new CuentaAhorro({
      numeroCuenta,
      documentoCliente,
      fechaApertura,
      saldo,
      claveAcceso: hashedClaveAcceso
    });

    // Guarda la nueva cuenta en la base de datos
    await nuevaCuenta.save();
    // Responde con un estado 201 y un mensaje de éxito junto con los detalles de la nueva cuenta
    res.status(201).json({ mensaje: "Cuenta creada con éxito.", cuenta: nuevaCuenta });
  } catch (error) {
    // En caso de error, responde con un estado 500 y un mensaje de error en formato JSON
    res.status(500).json({ mensaje: "Error al crear la cuenta.", error });
  }
};

// Consignar dinero en una cuenta
exports.consignarDinero = async (req, res) => {
  try {
    const { numeroCuenta } = req.params; // Recupera el número de cuenta de los parámetros de la URL
    const { monto } = req.body; // Recupera el monto a consignar del cuerpo de la solicitud

    // Verifica que el monto sea mayor que cero
    if (monto <= 0) {
      return res.status(400).json({ mensaje: "El monto a consignar debe ser mayor que cero." });
    }

    // Busca la cuenta correspondiente al número de cuenta proporcionado
    const cuenta = await CuentaAhorro.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada." });
    }

    // Incrementa el saldo de la cuenta con el monto consignado
    cuenta.saldo += monto;
    // Guarda la actualización en la base de datos
    await cuenta.save();

    // Responde con un estado 200 y un mensaje de éxito junto con los detalles de la cuenta actualizada
    res.status(200).json({ mensaje: "Consignación realizada con éxito.", cuenta });
  } catch (error) {
    // En caso de error, responde con un estado 500 y un mensaje de error en formato JSON
    res.status(500).json({ mensaje: "Error al realizar la consignación.", error });
  }
};

// Retirar dinero de una cuenta
exports.retirarDinero = async (req, res) => {
  try {
    const { numeroCuenta } = req.params; // Recupera el número de cuenta de los parámetros de la URL
    const { monto } = req.body; // Recupera el monto a retirar del cuerpo de la solicitud

    // Verifica que el monto a retirar sea mayor que cero
    if (monto <= 0) {
      return res.status(400).json({ mensaje: "El monto a retirar debe ser mayor que cero." });
    }

    // Busca la cuenta correspondiente al número de cuenta proporcionado
    const cuenta = await CuentaAhorro.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada." });
    }

    // Verifica si hay saldo suficiente para realizar el retiro
    if (monto > cuenta.saldo) {
      return res.status(400).json({ mensaje: "Saldo insuficiente para el retiro." });
    }

    // Resta el monto retirado del saldo de la cuenta
    cuenta.saldo -= monto;
    // Guarda la actualización en la base de datos
    await cuenta.save();

    // Responde con un estado 200 y un mensaje de éxito junto con los detalles de la cuenta actualizada
    res.status(200).json({ mensaje: "Retiro realizado con éxito.", cuenta });
  } catch (error) {
    // En caso de error, responde con un estado 500 y un mensaje de error en formato JSON
    res.status(500).json({ mensaje: "Error al realizar el retiro.", error });
  }
};

// Eliminar una cuenta
exports.eliminarCuenta = async (req, res) => {
  try {
    const { numeroCuenta } = req.params; // Recupera el número de cuenta de los parámetros de la URL

    // Busca la cuenta correspondiente al número de cuenta proporcionado
    const cuenta = await CuentaAhorro.findOne({ numeroCuenta });
    if (!cuenta) {
      return res.status(404).json({ mensaje: "Cuenta no encontrada." });
    }

    // Verifica si el saldo es cero, requisito para poder eliminar la cuenta
    if (cuenta.saldo !== 0) {
      return res.status(400).json({ mensaje: "La cuenta debe tener un saldo de cero para poder eliminarla." });
    }

    // Elimina la cuenta de la base de datos
    await CuentaAhorro.deleteOne({ numeroCuenta });
    // Responde con un estado 200 y un mensaje de éxito confirmando la eliminación
    res.status(200).json({ mensaje: "Cuenta eliminada con éxito." });
  } catch (error) {
    // En caso de error, responde con un estado 500 y un mensaje de error en formato JSON
    res.status(500).json({ mensaje: "Error al eliminar la cuenta.", error });
  }
};
