📝 Lista de Tareas

Una aplicación web full-stack para la gestión de tareas diarias, organizada mediante el patrón de arquitectura MVC (Modelo-Vista-Controlador) con Node.js, Express, EJS y MySQL.  
El proyecto cuenta con un sistema de inicialización automática de la base de datos al arrancar el servidor por primera vez.  

🛠️ Tecnologías Utilizadas
Backend: Node.js, Express, Express-Session, Bcrypt.  
Frontend: EJS (Embedded JavaScript), CSS3, Bootstrap 5.  
Base de Datos: MySQL (utilizando mysql2/promise).  

📁 Estructura del Proyecto
El código está completamente desacoplado en dos carpetas principales:

--lista_de_tareas/
 │
 ├── backend/                  # Servidor, rutas, controladores y modelos MVC
 │   ├── Config/               # Configuración de base de datos e inicializador
 │   ├── Controllers/          # Lógica de negocio (Lógica de control)
 │   ├── Middleware/           # Middlewares de autenticación
 │   ├── Models/               # Consultas e interacción con la base de datos
 │   ├── Routes/               # Definición de rutas y endpoints de la app
 │   ├── .env                  # Variables de entorno
 │   ├── app.js                # Punto de entrada principal
 │   └── package.json
 │
 └── frontend/                 # Interfaz visual y recursos estáticos
     ├── Public/               # Archivos CSS e Imágenes
     └── Views/                # Plantillas EJS (Páginas, Modales y Parciales)

🚀 Instalación y Configuración

Sigue estos pasos para poner a funcionar el proyecto en tu máquina local:
1. Clonar o descargar el repositorioAsegúrate de descargar la carpeta completa del proyecto.
2. Configurar el archivo de entorno (.env)Ingresa a la carpeta backend/ y verifica o crea el archivo .env con las credenciales de tu MySQL local:  

PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=lista_de_tareas_db
SESSION_SECRET=clave_secreta_lista_de_tareas

3. Instalar dependenciasAbre tu terminal, navega hacia la carpeta backend e instala los paquetes necesarios:  
Correr los siguientes comandos en la terminal:
cd backend
npm install

4. Iniciar la aplicación
Ejecuta el servidor en modo desarrollo o producción:

# Modo desarrollo
npm run dev

# Modo producción
npm start

5. Abrir en el navegador
Ingresa a la siguiente dirección en tu navegador:
http://localhost:3000

Registrarse y luego loguearse. No hay usuarios de prueba creados. 

✨ Características Principales
🔒 Autenticación completa: Registro e Inicio de Sesión de usuarios con contraseñas encriptadas mediante bcrypt.  
📊 Panel de Inicio: Vista principal con resumen y métricas de tareas pendientes y completadas.  
✅ Gestión de Tareas (CRUD): Creación, edición completa (categoría, prioridad, fechas), cambio rápido de estado y eliminación de tareas.  
🏷️ Categorías personalizadas: Organización de tareas por categorías y colores representativos.  
🔍 Filtros dinámicos: Búsqueda por texto y filtrado por categoría, prioridad o estado.  

*** Este es el trabajo final del curso FULL STACK DEVELOPER DE CILSA.
Trabajo realizado por Verónica Haydée Peluffo Bou.  
Gracias. ***
