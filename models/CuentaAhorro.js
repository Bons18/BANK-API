const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Definición del esquema de cuenta de ahorro
const cuentaAhorroSchema = new mongoose.Schema({
    numeroCuenta: {
        type: Number,
        required: [true, 'El número de cuenta es obligatorio.'],
        unique: true
    },
    documentoCliente: {
        type: String,
        required: [true, 'El documento del cliente es obligatorio.']
    },
    fechaApertura: {
        type: Date,
        default: Date.now // Asigna la fecha actual si no se proporciona
    },
    saldo: {
        type: Number,
        required: [true, 'El saldo es obligatorio.'],
        min: [0, 'El saldo no puede ser negativo.']
    },
    claveAcceso: {
        type: String,
        required: [true, 'La clave de acceso es obligatoria.']
    }
});

// Middleware pre-save para encriptar la clave de acceso
cuentaAhorroSchema.pre('save', async function (next) {
    // Solo encripta la clave si fue modificada o es nueva
    if (this.isModified('claveAcceso')) {
        try {
            // Genera el salt y encripta la clave
            const salt = await bcrypt.genSalt(10);
            this.claveAcceso = await bcrypt.hash(this.claveAcceso, salt);
        } catch (error) {
            return next(error); // Si hay un error, lo pasa al siguiente middleware
        }
    }
    next();
});

// Método para comparar la clave encriptada
cuentaAhorroSchema.methods.compararClave = async function (clave) {
    return await bcrypt.compare(clave, this.claveAcceso); // Compara la clave ingresada con la clave encriptada
};

// Exportar el modelo
module.exports = mongoose.models.CuentaAhorro || mongoose.model('CuentaAhorro', cuentaAhorroSchema);
