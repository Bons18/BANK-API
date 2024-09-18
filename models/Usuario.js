// models/Usuario.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

// Encriptar la contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Método para comparar contraseñas
usuarioSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);
