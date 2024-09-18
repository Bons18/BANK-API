const express = require('express');
const connectDB = require('./config/db');
const session = require('express-session');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para analizar JSON
app.use(express.json());

// Configuración de la sesión
app.use(session({
    secret: process.env.SESSION_SECRET || 'mi_secreto',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Asegúrate de usar `true` en producción con HTTPS
}));

// Middleware de autenticación
const requireLogin = (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Ruta de login
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

// Manejo del post del login
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    // Aquí debes validar con tu base de datos
    if (username === 'admin' && password === 'password') {
        req.session.loggedIn = true;
        res.redirect('/');
    } else {
        res.send('Credenciales incorrectas');
    }
});

// Ruta principal (restringida)
app.get('/', requireLogin, (req, res) => {
    res.sendFile(__dirname + '/public/index.html');
});

// Definir rutas (restringidas)
app.use('/api/clientes', requireLogin, require('./routes/clientes'));
app.use('/api/usuarios', requireLogin, require('./routes/usuarios'));
app.use('/api/cuentas', requireLogin, require('./routes/cuentasAhorro'));

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
