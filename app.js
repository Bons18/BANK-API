const express = require('express');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para analizar JSON
app.use(express.json());

// Definir rutas
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/cuentas', require('./routes/cuentasAhorro'));
// Ruta principal
app.get('/', (req, res) => {
  res.send('Bienvenido a la API del banco. Utiliza las rutas /api/clientes, /api/usuarios, o /api/cuentas.');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
