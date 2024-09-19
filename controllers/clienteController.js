const Cliente = require('../models/Cliente'); // Importa el modelo de Cliente desde los modelos

// Crear un nuevo cliente
exports.createCliente = async (req, res) => {
    try {
        // Crea una nueva instancia del cliente usando los datos proporcionados en la solicitud
        const cliente = new Cliente(req.body);
        // Guarda el nuevo cliente en la base de datos
        await cliente.save();
        // Responde con un estado 201 (creado) y devuelve el cliente creado en formato JSON
        res.status(201).json(cliente);
    } catch (error) {
        // En caso de error, responde con un estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ msg: 'Error al crear el cliente', error });
    }
};

// Obtener todos los clientes
exports.getClientes = async (req, res) => {
    try {
        // Recupera todos los clientes de la base de datos
        const clientes = await Cliente.find();
        // Responde con un estado 200 (éxito) y devuelve la lista de clientes en formato JSON
        res.status(200).json(clientes);
    } catch (error) {
        // En caso de error, responde con un estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ msg: 'Error al obtener los clientes', error });
    }
};

// Obtener un cliente por ID
exports.getClienteById = async (req, res) => {
    try {
        // Busca un cliente por su ID, que se recibe como parámetro en la URL
        const cliente = await Cliente.findById(req.params.id);
        // Si no se encuentra el cliente, responde con un estado 404 (no encontrado)
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        // Si se encuentra, responde con un estado 200 (éxito) y devuelve los datos del cliente
        res.status(200).json(cliente);
    } catch (error) {
        // En caso de error, responde con un estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ msg: 'Error al obtener el cliente', error });
    }
};

// Actualizar un cliente por ID
exports.updateCliente = async (req, res) => {
    try {
        // Busca un cliente por ID y actualiza sus datos con el contenido del cuerpo de la solicitud
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        // Si no se encuentra el cliente, responde con un estado 404 (no encontrado)
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        // Si se actualiza correctamente, responde con un estado 200 y los datos del cliente actualizado
        res.status(200).json(cliente);
    } catch (error) {
        // En caso de error, responde con un estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ msg: 'Error al actualizar el cliente', error });
    }
};

// Eliminar un cliente por ID
exports.deleteCliente = async (req, res) => {
    try {
        // Busca y elimina un cliente por su ID
        const cliente = await Cliente.findByIdAndDelete(req.params.id);
        // Si no se encuentra el cliente, responde con un estado 404 (no encontrado)
        if (!cliente) {
            return res.status(404).json({ msg: 'Cliente no encontrado' });
        }
        // Si se elimina correctamente, responde con un estado 200 y un mensaje de confirmación
        res.status(200).json({ msg: 'Cliente eliminado' });
    } catch (error) {
        // En caso de error, responde con un estado 400 y un mensaje de error en formato JSON
        res.status(400).json({ msg: 'Error al eliminar el cliente', error });
    }
};
