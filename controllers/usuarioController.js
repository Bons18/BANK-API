const Usuario = require('../models/Usuario');

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
    // Extraer datos del cuerpo de la solicitud
    const { nombreUsuario, email, contraseña } = req.body;

    // Validar si ya existe un usuario con el mismo nombre de usuario o correo electrónico
    const usuarioExistente = await Usuario.findOne({ 
      $or: [{ nombreUsuario }, { email }]  // Buscar coincidencias con nombreUsuario o email
    });

    // Si el usuario ya existe, devolver un error indicando que el nombre o el correo están en uso
    if (usuarioExistente) {
      return res.status(400).json({ msg: 'El nombre de usuario o correo ya están en uso' });
    }

    // Crear un nuevo objeto de usuario utilizando los datos recibidos
    const nuevoUsuario = new Usuario(req.body);

    // Guardar el nuevo usuario en la base de datos
    await nuevoUsuario.save();

    // Enviar una respuesta exitosa con un mensaje y el usuario creado
    res.status(201).json({ msg: 'Usuario creado exitosamente', usuario: nuevoUsuario });
  } catch (error) {
    // Si ocurre un error, devolver una respuesta de error con un mensaje genérico
    res.status(500).json({ msg: 'Error al crear el usuario', error });
  }
};

// Obtener todos los usuarios
exports.getUsuarios = async (req, res) => {
  try {
    // Buscar todos los usuarios en la base de datos
    const usuarios = await Usuario.find();

    // Enviar la lista de usuarios en la respuesta
    res.status(200).json(usuarios);
  } catch (error) {
    // Si ocurre un error, devolver una respuesta con código 500
    res.status(500).json({ msg: 'Error al obtener los usuarios', error });
  }
};

// Obtener un usuario por nombre de usuario
exports.getUsuarioByNombre = async (req, res) => {
  try {
    // Obtener el nombre de usuario de los parámetros de la solicitud
    const { nombreUsuario } = req.params;

    // Buscar el usuario en la base de datos por su nombre de usuario
    const usuario = await Usuario.findOne({ nombreUsuario });

    // Si no se encuentra el usuario, devolver un error 404
    if (!usuario) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Enviar el usuario encontrado en la respuesta
    res.status(200).json(usuario);
  } catch (error) {
    // Si ocurre un error durante la búsqueda, devolver un error 500
    res.status(500).json({ msg: 'Error al obtener el usuario', error });
  }
};

// Actualizar un usuario por nombre de usuario
exports.updateUsuario = async (req, res) => {
  try {
    // Obtener el nombre de usuario de los parámetros de la solicitud
    const { nombreUsuario } = req.params;

    // Actualizar el usuario en la base de datos y devolver el nuevo documento actualizado
    const usuarioActualizado = await Usuario.findOneAndUpdate(
      { nombreUsuario },     // Filtro para buscar el usuario por nombre de usuario
      req.body,              // Nuevos datos del usuario
      { new: true }          // Opción para devolver el documento actualizado
    );

    // Si el usuario no existe, devolver un error 404
    if (!usuarioActualizado) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Enviar el usuario actualizado en la respuesta
    res.status(200).json({ msg: 'Usuario actualizado exitosamente', usuario: usuarioActualizado });
  } catch (error) {
    // Si ocurre un error durante la actualización, devolver un error 500
    res.status(500).json({ msg: 'Error al actualizar el usuario', error });
  }
};

// Eliminar un usuario por nombre de usuario
exports.deleteUsuario = async (req, res) => {
  try {
    // Obtener el nombre de usuario de los parámetros de la solicitud
    const { nombreUsuario } = req.params;

    // Buscar y eliminar el usuario en la base de datos
    const usuarioEliminado = await Usuario.findOneAndDelete({ nombreUsuario });

    // Si no se encuentra el usuario, devolver un error 404
    if (!usuarioEliminado) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    // Enviar una respuesta indicando que el usuario ha sido eliminado
    res.status(200).json({ msg: 'Usuario eliminado exitosamente' });
  } catch (error) {
    // Si ocurre un error durante la eliminación, devolver un error 500
    res.status(500).json({ msg: 'Error al eliminar el usuario', error });
  }
};
