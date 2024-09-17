const mongoose = require('mongoose');

// Definición del esquema del usuario
const usuarioSchema = new mongoose.Schema({
    nombreUsuario: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['activo', 'inactivo'],
        required: true
    }
});

// Exportar el modelo
module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
