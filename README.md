Archive Coffee API

1. Descripción

Este proyecto consiste en una API para gestionar los productos y usuarios de Archive Coffee.

Está desarrollada con Node.js, Express y MongoDB Atlas. Permite crear, consultar, modificar y eliminar productos y usuarios.

La API funciona en local y también está desplegada en Vercel.

2. Tecnologías utilizadas

Node.js

Express

MongoDB Atlas

Mongoose

GitHub

Vercel

3. Modelos

El proyecto tiene dos modelos:

Product: contiene los datos de los productos, como el nombre, precio, origen, tipo de tueste, formato, notas de cata, stock y disponibilidad.

User: contiene los datos de los usuarios, como el nombre, apellidos, email, contraseña, teléfono, dirección y fecha de registro.

4. Endpoints

Productos

Método

Ruta

Función

GET

/api/products

Ver todos los productos

GET

/api/products/:id

Ver un producto

POST

/api/products

Crear un producto

PUT

/api/products/:id

Modificar un producto

DELETE

/api/products/:id

Eliminar un producto

Usuarios

Método

Ruta

Función

GET

/api/users

Ver todos los usuarios

GET

/api/users/:id

Ver un usuario

POST

/api/users

Crear un usuario

PUT

/api/users/:id

Modificar un usuario

DELETE

/api/users/:id

Eliminar un usuario

5. Estructura del proyecto

crudPEC/
├── src/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── productController.js
│   │   └── userController.js
│   ├── middlewares/
│   │   └── errorMiddleware.js
│   ├── models/
│   │   ├── Product.js
│   │   └── User.js
│   └── routes/
│       ├── productRoutes.js
│       └── userRoutes.js
├── index.js
├── package.json
├── requests.http
├── .env.example
└── .gitignore

6. Instalación y ejecución

Para instalar el proyecto, primero hay que descargar el repositorio:

git clone URL_DEL_REPOSITORIO

Entrar en la carpeta e instalar las dependencias:

cd crudPEC
npm install

Crear el archivo .env y añadir las variables necesarias.

Para iniciar el servidor:

npm run dev

La API estará disponible en http://localhost:3000.

7. Variables de entorno

El proyecto utiliza estas variables en el archivo .env:

PORT=3000
MONGODB_URI=tu_cadena_de_conexion

Este archivo no se sube a GitHub porque contiene los datos de conexión a la base de datos.

8. Gestión de errores

Se han creado dos middlewares:

404: aparece cuando se intenta acceder a una ruta que no existe.

Error Handler: recoge los errores y devuelve una respuesta en formato JSON.

9. Diagrama de la API

flowchart TD
    A[Cliente] --> B[index.js]
    B --> C[Rutas]
    C --> D[Controladores]
    D --> E[Modelos]
    E --> F[(MongoDB Atlas)]
    B --> G[Middlewares de error]

10. Pruebas

Las pruebas de la API están guardadas en el archivo requests.http.

Se han utilizado peticiones GET, POST, PUT y DELETE para comprobar que los productos y usuarios funcionan correctamente.

También se han probado los filtros y los errores de rutas.

11. Despliegue

El proyecto está subido a GitHub y desplegado en Vercel. La conexión con MongoDB Atlas se configura mediante las variables de entorno de Vercel.