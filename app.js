const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para analizar JSON
app.use(express.json());

// Middleware para manejo de sesiones
app.use(session({
    secret: 'mi_secreto', // Cambiar esto por una clave secreta más segura en producción
    resave: false,
    saveUninitialized: true
}));

// Middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta para la página de inicio de sesión
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Ruta para manejar el inicio de sesión
app.post('/login', async (req, res) => {
    const { nombreUsuario, password, estado } = req.body;

    // Buscar el usuario en la base de datos
    const usuario = await Usuario.findOne({ nombreUsuario });

    if (!usuario) {
        return res.status(400).json({ mensaje: 'Usuario no encontrado' });
    }

    // Verificar contraseña
    const esValido = await bcrypt.compare(password, usuario.password);
    if (!esValido) {
        return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
    }

    // Verificar estado
    if (usuario.estado !== estado) {
        return res.status(400).json({ mensaje: 'Estado incorrecto' });
    }

    // Iniciar sesión y guardar el usuario en la sesión
    req.session.usuario = usuario;

    // Redirigir a la página principal de la API
    res.redirect('/');
});

// Middleware para verificar si el usuario está autenticado antes de acceder a la página principal
function verificarAutenticacion(req, res, next) {
    if (req.session.usuario) {
        next();
    } else {
        res.redirect('/login');
    }
}

// Ruta principal (protegida)
app.get('/', verificarAutenticacion, (req, res) => {
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
