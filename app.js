const express = require('express');
const session = require('express-session');
const connectDB = require('./config/db');
const Usuario = require('./models/Usuario'); // Asegúrate de tener el modelo de Usuario
const bcrypt = require('bcryptjs');
require('dotenv').config();

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para analizar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Para manejar datos del formulario

// Configurar express-session
app.use(session({
    secret: 'tu_secreto_aqui', // Cambia esto por una clave secreta segura
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Cambia a true si usas HTTPS
}));

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Definir rutas
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/cuentas', require('./routes/cuentasAhorro'));

// Ruta para iniciar sesión
app.post('/api/login', async (req, res) => {
    const { nombreUsuario, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ nombreUsuario });

        if (!usuario) {
            return res.status(400).json({ mensaje: 'Usuario no encontrado' });
        }

        const esValida = await bcrypt.compare(password, usuario.password);

        if (!esValida) {
            return res.status(400).json({ mensaje: 'Contraseña incorrecta' });
        }

        if (usuario.estado !== 'activo') {
            return res.status(403).json({ mensaje: 'Usuario inactivo' });
        }

        req.session.usuario = usuario; // Guardar usuario en sesión

        res.redirect('/');
    } catch (error) {
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
});

// Ruta principal
app.get('/', (req, res) => {
    if (req.session.usuario) {
        res.sendFile(__dirname + '/public/index.html');
    } else {
        res.redirect('/login');
    }
});

// Ruta para la página de inicio de sesión
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
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
