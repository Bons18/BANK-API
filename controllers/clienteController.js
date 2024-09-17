const Cliente = require('../models/Cliente');

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    try {
        const cliente = new Cliente(req.body);
        await cliente.save();
        res.status(201).json(cliente);
    } catch (error) {
        res.status(400).json({ msg: 'Error al crear el cliente', error });
    }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.status(200).json(clientes);
    } catch (error) {
        res.status(400).json({ msg: 'Error al obtener los clientes', error });
    }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.findById(req.params.id);
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json({ msg: 'Error al obtener el cliente', error });
    }
};

// Actualizar un cliente por ID
exports.updateCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        res.status(200).json(cliente);
    } catch (error) {
        res.status(400).json({ msg: 'Error al actualizar el cliente', error });
    }
};

// Eliminar un cliente por ID
exports.deleteCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        res.status(200).json({ msg: 'Cliente eliminado' });
    } catch (error) {
        res.status(400).json({ msg: 'Error al eliminar el cliente', error });
    }
};
