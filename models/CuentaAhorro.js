const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definición del esquema de cuenta de ahorro
const cuentaAhorroSchema = new mongoose.Schema({
    numeroCuenta: {
        type: Number,
        required: true,
        unique: true
    },
    documentoCliente: {
        type: String,
        required: true
    },
    fechaApertura: {
        type: Date,
        required: true
    },
    saldo: {
        type: Number,
        required: true,
        min: [0, 'El saldo no puede ser negativo']
    },
    claveAcceso: {
        type: String,
        required: true
    }
});

// Encriptar la clave de acceso antes de guardar
cuentaAhorroSchema.pre('save', async function(next) {
    if (this.isModified('claveAcceso')) {
        this.claveAcceso = await bcrypt.hash(this.claveAcceso, 10);
    }
    next();
});

// Exportar el modelo
module.exports = mongoose.models.CuentaAhorro || mongoose.model('CuentaAhorro', cuentaAhorroSchema);
