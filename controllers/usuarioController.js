const Usuario = require('../models/Usuario');

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
    try {
        const usuario = new Usuario(req.body);
        await usuario.save();
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ msg: 'Error al crear el usuario', error });
    }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ msg: 'Error al obtener los usuarios', error });
    }
};

// Obtener un usuario por nombre de usuario
exports.getUsuarioByNombre = async (req, res) => {
    try {
        const usuario = await Usuario.findOne({ nombreUsuario: req.params.nombreUsuario });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ msg: 'Error al obtener el usuario', error });
    }
};

// Actualizar un usuario por nombre de usuario
exports.updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOneAndUpdate({ nombreUsuario: req.params.nombreUsuario }, req.body, { new: true });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(400).json({ msg: 'Error al actualizar el usuario', error });
    }
};

// Eliminar un usuario por nombre de usuario
exports.deleteUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findOneAndDelete({ nombreUsuario: req.params.nombreUsuario });
        if (!usuario) {
            return res.status(404).json({ msg: 'Usuario no encontrado' });
        }
        res.status(200).json({ msg: 'Usuario eliminado' });
    } catch (error) {
        res.status(400).json({ msg: 'Error al eliminar el usuario', error });
    }
};
