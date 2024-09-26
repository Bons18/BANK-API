const express = require('express');
const cors = require('cors'); // Importa el paquete cors
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para analizar JSON
app.use(express.json());

// Configurar CORS para permitir varios orígenes
app.use(cors({
    origin: [
        'http://localhost:5173',   // Permite solicitudes desde este origen
        'http://localhost:3000',    // Permite solicitudes desde este origen
        'http://192.168.1.18:3000', // Permite solicitudes desde este origen
        'http://192.168.56.1:3000', // Permite solicitudes desde este origen
        'https://consumo-api-cpcr.onrender.com' // Permite solicitudes desde este origen
    ], 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Métodos permitidos
    credentials: true, // Permitir credenciales (cookies, etc.)
}));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Definir rutas
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/cuentas', require('./routes/cuentasAhorro'));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).json({ mensaje: 'Recurso no encontrado.' });
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ mensaje: 'Error interno del servidor.', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
