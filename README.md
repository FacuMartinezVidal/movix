# Movix Frontend

Movix es una aplicación de gestión de listas de películas que permite a los usuarios registrar, iniciar sesión y administrar sus listas de películas favoritas, vistas y por ver.

## Características

- Registro e inicio de sesión de usuarios.
- Añadir películas a listas de favoritos, vistas y por ver.
- Actualizar y eliminar películas de las listas.
- Editar perfil de usuario.

## Tecnologías Utilizadas

- **React**: Biblioteca de JavaScript para construir interfaces de usuario.
- **React Router**: Biblioteca para el manejo de rutas en aplicaciones React.
- **Axios**: Cliente HTTP basado en promesas para realizar solicitudes a la API.
- **Context API y useReducer**: Para la gestión del estado global de la aplicación.
- **Sass**: Preprocesador de CSS para estilos más dinámicos y organizados.
- **Day.js**: Biblioteca de JavaScript para manipulación y formateo de fechas.
- **FontAwesome**: Biblioteca de iconos vectoriales.
- **Express-Validator**: Middleware para validaciones en Express.
- **Prisma**: ORM para interactuar con la base de datos.

## Requisitos Previos

Antes de comenzar, asegúrate de tener instalado lo siguiente en tu máquina:

- Node.js (v14 o superior)
- npm (v6 o superior) o Yarn (opcional)

## Instalación

1. **Clonar el repositorio:**

   ```sh
   git clone https://github.com/tu-usuario/movix-frontend.git
   cd movix-frontend
   ```
2. **Instalar Dependencias:**
   
   ```sh
   npm install
   cd movix-frontend
   ```
3. **Configurar Variables de Entorno:**
  ```sh
   REACT_APP_API_URL=http://HOST:PORT/api/v1
   ```
4. **Ejecucion:**
   ```sh
   npm run dev
   ```
5. **Estructura del Proyecto:**
   ```plaintext
      movix-frontend/
      ├── public/
      ├── src/
      │   ├── assets/           # Imágenes y otros archivos estáticos
      │   ├── components/       # Componentes reutilizables de React
      │   ├── context/          # Archivos relacionados con Context API
      │   ├── hooks/            # Hooks personalizados
      │   ├── pages/            # Páginas de la aplicación
      │   ├── styles/           # Archivos de estilos (Sass)
      │   ├── utils/            # Utilidades y funciones auxiliares
      │   ├── App.jsx           # Componente principal de la aplicación
      │   ├── index.js          # Punto de entrada de la aplicación
      └── package.json          # Dependencias y scripts del proyecto
   ```


   
