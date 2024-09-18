# Bank API

Bienvenido a la API del banco. Esta API permite gestionar cuentas de ahorro, incluyendo operaciones como crear una cuenta, consignar dinero, retirar dinero y eliminar cuentas.

## Endpoints

### 1. Obtener todas las cuentas

**Método:** GET  
**URL:** /api/cuentas

**Descripción:** Obtiene una lista de todas las cuentas de ahorro.

**Ejemplo de solicitud en Postman:**

- URL: http://localhost:5000/api/cuentas
- Método: GET

---

### 2. Obtener una cuenta por número

**Método:** GET  
**URL:** /api/cuentas/:numeroCuenta

**Descripción:** Obtiene una cuenta de ahorro específica por su número.

**Ejemplo de solicitud en Postman:**

- URL: http://localhost:5000/api/cuentas/123456789
- Método: GET

---

### 3. Crear una nueva cuenta

**Método:** POST  
**URL:** /api/cuentas

**Descripción:** Crea una nueva cuenta de ahorro.

**Cuerpo de la solicitud (JSON):**

{
    "numeroCuenta": 123456789,
    "documentoCliente": "1234567890",
    "fechaApertura": "2024-09-15T00:00:00.000Z",
    "saldo": 1000,
    "claveAcceso": "miClaveSegura"
}

**Ejemplo de solicitud en Postman:**

- URL: http://localhost:5000/api/cuentas
- Método: POST
- Cuerpo: JSON (como se muestra arriba)

---

### 4. Consignar dinero en una cuenta

**Método:** PUT  
**URL:** /api/cuentas/:numeroCuenta/consignar

**Descripción:** Consigna una cantidad de dinero en una cuenta de ahorro.

**Cuerpo de la solicitud (JSON):**

{
    "monto": 500
}

**Ejemplo de solicitud en Postman:**

- URL: http://localhost:5000/api/cuentas/123456789/consignar
- Método: PUT
- Cuerpo: JSON (como se muestra arriba)

---

### 5. Retirar dinero de una cuenta

**Método:** PUT  
**URL:** /api/cuentas/:numeroCuenta/retiro

**Descripción:** Retira una cantidad de dinero de una cuenta de ahorro.

**Cuerpo de la solicitud (JSON):**

{
    "monto": 200
}

**Ejemplo de solicitud en Postman:**

- URL: http://localhost:5000/api/cuentas/123456789/retiro
- Método: PUT
- Cuerpo: JSON (como se muestra arriba)

---

### 6. Eliminar una cuenta

**Método:** DELETE  
**URL:** /api/cuentas/:numeroCuenta

**Descripción:** Elimina una cuenta de ahorro por su número.

**Ejemplo de solicitud en Postman:**

- URL: http://localhost:5000/api/cuentas/123456789
- Método: DELETE

---

## Configuración

Para ejecutar la API localmente, sigue estos pasos:

1. Clona el repositorio:

    git clone https://github.com/Bons18/BANK-API.git

2. Navega al directorio del proyecto:

    cd BANK-API

3. Instala las dependencias:

    npm install

4. Configura las variables de entorno. Crea un archivo `.env` en el directorio raíz y agrega:

    MONGO_URI=mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/bank-api?retryWrites=true&w=majority
    JWT_SECRET=your_jwt_secret
    NODE_ENV=development
    PORT=5000

5. Inicia el servidor:

    npm start

6. La API estará disponible en http://localhost:5000.

---

## Contribuciones

Si deseas contribuir al proyecto, por favor, envía un pull request o abre un issue en el repositorio de GitHub.

---

¡Gracias por usar nuestra API!

