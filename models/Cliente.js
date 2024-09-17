const mongoose = require('mongoose');

// Definición del esquema del cliente
const clienteSchema = new mongoose.Schema({
    documentoCliente: {
        type: String,
        required: true,
        unique: true
    },
    nombreCompleto: {
        type: String,
        required: true
    },
    celular: {
        type: String,
        required: true
    },
    fechaNacimiento: {
        type: Date,
        required: true
    }
});

// Exportar el modelo
module.exports = mongoose.models.Cliente || mongoose.model('Cliente', clienteSchema);
