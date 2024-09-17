const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Conectado a MongoDB');
  } catch (err) {
    console.error('No se pudo conectar a MongoDB:', err.message);
    process.exit(1); // Finaliza el proceso si no puede conectar
  }
};

module.exports = connectDB;
