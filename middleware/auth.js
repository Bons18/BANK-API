const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  // Obtener el token del encabezado de autorización
  const token = req.header('x-auth-token');

  // Verificar si no hay token en la solicitud
  if (!token) {
    return res.status(401).json({ message: 'No hay token, autorización denegada' });
  }

  try {
    // Verificar y decodificar el token usando el secreto JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Asignar los datos decodificados (usuario) al objeto de la solicitud
    req.usuario = decoded.usuario;

    // Continuar con el siguiente middleware o controlador
    next();
  } catch (error) {
    // En caso de error al verificar el token
    return res.status(401).json({ message: 'Token inválido o expirado', error });
  }
};
