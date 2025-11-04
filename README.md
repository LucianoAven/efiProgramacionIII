# WorkFlow Pro 🚀

Sistema de Gestión de Empleados y Horarios desarrollado como Evaluación Final Integradora (EFI) de Programación III.

![WorkFlow Pro](https://img.shields.io/badge/WorkFlow%20Pro-Sistema%20de%20Gestión-orange)
![React](https://img.shields.io/badge/React-18.x-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![PrimeReact](https://img.shields.io/badge/PrimeReact-UI%20Components-purple)
![Sequelize](https://img.shields.io/badge/Sequelize-ORM-red)

## 📋 Descripción

WorkFlow Pro es una plataforma web profesional diseñada para la gestión integral de empleados y horarios laborales. Permite a los administradores gestionar usuarios, empleados y horarios, mientras que los empleados pueden ver su perfil y crear solicitudes de cambio de horario.

## 🌟 Características Principales

### 👨‍💼 Para Administradores
- **Gestión de Usuarios**: Crear, gestionar, asignar empleado y editar rol y estado de los usuarios del sistema
- **Gestión de Empleados**: Editar empleados, asignación de horarios
- **Control de Horarios**: Crear, editar y eliminar horarios de trabajo, solicitar un camvio de horario.
- **Solicitudes de Horarios**: Revisar y gestionar solicitudes de cambio de horario
- **Exportación PDF**: Generar reportes de empleados y horarios
- **Filtros Avanzados**: Búsqueda por nombre de empleado y fecha

### 👩‍💼 Para Empleados
- **Perfil Personal**: Ver información personal y estado de cuenta
- **Perfil de Empleado**: Consultar datos laborales
- **Solicitudes de Horario**: Crear solicitudes de cambio de horario
- **Historial**: Ver historial de solicitudes realizadas

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18**: Framework principal para la interfaz de usuario
- **PrimeReact**: Biblioteca de componentes UI profesionales
- **React Router Dom**: Navegación entre páginas
- **Axios**: Cliente HTTP para comunicación con la API
- **Context API**: Manejo de estado global
- **CSS3**: Estilos personalizados y responsivos

### Backend
- **Node.js**: Entorno de ejecución de JavaScript
- **Express.js**: Framework web para Node.js
- **Sequelize**: ORM para base de datos
- **MySQL**: Sistema de gestión de base de datos
- **JWT**: Autenticación y autorización
- **bcrypt**: Encriptación de contraseñas
- **Nodemailer**: Envío de correos electrónicos

## 📁 Estructura del Proyecto

```
efiProgramacionIII/
├── API-REST-DB/                 # Backend - API REST
│   ├── config/                  # Configuración de base de datos
│   ├── controllers/             # Controladores de la API
│   ├── db/                      # Conexión a base de datos
│   ├── middlewares/             # Middlewares de autenticación
│   ├── migrations/              # Migraciones de Sequelize
│   ├── models/                  # Modelos de Sequelize
│   ├── routes/                  # Rutas de la API
│   ├── seeders/                 # Datos de prueba
│   │   ├── 01-seed-users.js     # Usuarios del sistema
│   │   ├── 02-seed-employees.js # Empleados
│   │   ├── 03-seed-schedules.js # Horarios de trabajo
│   │   └── 04-seed-schedule-requests.js # Solicitudes
│   ├── utils/                   # Utilidades (mailer)
│   ├── createDatabase.js        # Script de creación de DB
│   ├── database.sql            # Script SQL inicial
│   ├── index.js                # Punto de entrada del servidor
│   └── package.json            # Dependencias del backend
│
└── FRONT-REACT/                # Frontend - React App
    ├── public/                 # Archivos públicos
    ├── src/
    │   ├── assets/             # Recursos estáticos
    │   ├── components/         # Componentes reutilizables
    │   │   ├── ProtectedButton.jsx
    │   │   └── UserBadge.jsx
    │   ├── context/            # Context providers
    │   │   ├── AuthContext.jsx
    │   │   ├── EmployeesContext.jsx
    │   │   ├── ScheduleRequestsContext.jsx
    │   │   ├── SchedulesContext.jsx
    │   │   └── UsersContext.jsx
    │   ├── layouts/            # Páginas principales
    │   │   ├── auth/           # Autenticación
    │   │   ├── employees/      # Gestión de empleados
    │   │   ├── home/           # Página de inicio
    │   │   ├── scheduleRequests/  # Solicitudes de horarios
    │   │   ├── schedules/      # Gestión de horarios
    │   │   └── users/          # Gestión de usuarios
    │   ├── services/           # Servicios API
    │   ├── utils/              # Utilidades y rutas
    │   ├── App.css            # Estilos principales
    │   ├── App.jsx            # Componente principal
    │   └── main.jsx           # Punto de entrada
    ├── index.html
    ├── package.json           # Dependencias del frontend
    └── vite.config.js         # Configuración de Vite
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- MySQL (versión 8 o superior)
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone https://github.com/LucianoAven/efiProgramacionIII.git
cd efiProgramacionIII
```

### 2. Configurar Backend
```bash
cd API-REST-DB
npm install
```

Crear archivo `.env` con las siguientes variables:
```env
DB_HOST=localhost
DB_USER=tu_usuario_mysql
DB_PASSWORD=tu_contraseña_mysql
DB_NAME=workflow_pro_db
JWT_SECRET=tu_clave_secreta_jwt
EMAIL_USER=tu_email_smtp
EMAIL_PASS=tu_contraseña_email
```

### 3. Configurar Base de Datos
```bash
# Crear la base de datos
node createDatabase.js

# Ejecutar migraciones
npx sequelize-cli db:migrate

# Poblar con datos de prueba (recomendado)
node runSeeders.js
```

### 📊 Datos de Prueba Incluidos

El script `runSeeders.js` crea automáticamente:

**👥 Usuarios (10 total):**
- **4 Administradores:** pedrose@gmail.com, maria@gmail.com, juanos@gmail.com, bonifacio@gmail.com
- **6 Empleados:** alejandro@gmail.com, carolina@gmail.com, fede@gmail.com, carla@gmail.com, valentina@gmail.com, maldonado@gmail.com

**👷 Empleados (6 total):**
- 4 Cajeros y 2 Supervisores
- Diferentes fechas de contratación
- Estados activos/inactivos variados

**📅 Horarios (10 total):**
- Horarios distribuidos en diferentes fechas
- Variedad de turnos (mañana, tarde, noche)
- Asignados a diferentes empleados

**📝 Solicitudes de Horario (6 total):**
- Estados: pendiente, aprobada, rechazada
- Diferentes motivos y comentarios de admin
- Fechas variadas de solicitud

**🔑 Credenciales de acceso:**
- Email: cualquier email de los usuarios listados
- Contraseña: el nombre que aparece antes del @ en cada email
- Ejemplos: `pedrose@gmail.com` → contraseña: `pedrose`

### 🛠️ Scripts Adicionales
```bash
# Limpiar todos los datos de prueba
node clearDatabase.js

# Repoblar la base de datos
node runSeeders.js
```

### 4. Configurar Frontend
```bash
cd ../FRONT-REACT
npm install
```

### 5. Ejecutar la Aplicación

**Backend (Puerto 3001):**
```bash
cd API-REST-DB
npm start
```

**Frontend (Puerto 5173):**
```bash
cd FRONT-REACT
npm run dev
```

## 👥 Roles y Permisos

### Administrador
- Acceso completo a todas las funcionalidades
- Gestión de usuarios, empleados y horarios
- Visualización de todas las solicitudes

### Empleado
- Acceso a su perfil personal
- Visualización de su información laboral
- Creación de solicitudes de cambio de horario

## 🎨 Interfaz de Usuario

La aplicación cuenta con:
- **Diseño Responsivo**: Adaptable a diferentes dispositivos
- **Tema Oscuro**: Interfaz moderna con colores oscuros
- **Componentes PrimeReact**: Interfaz profesional y consistente
- **Navegación Intuitiva**: Fácil acceso a todas las funcionalidades
- **Feedback Visual**: Toasts, estados de carga y validaciones

## 📊 Características Técnicas

### Seguridad
- Autenticación JWT
- Rutas protegidas por rol
- Encriptación de contraseñas
- Validación de datos en frontend y backend

### Performance
- Lazy loading de componentes
- Paginación en listados
- Búsqueda optimizada
- Cache de contextos

### Base de Datos
- Relaciones entre modelos bien definidas
- Migraciones para control de versiones
- Seeders para datos de prueba
- Índices para consultas optimizadas

## 🐛 Resolución de Problemas

### Problemas Comunes

**Error de conexión a la base de datos:**
- Verificar credenciales en el archivo `.env`
- Asegurar que MySQL esté ejecutándose
- Comprobar que la base de datos existe

**Error de CORS:**
- Verificar configuración de CORS en el backend
- Comprobar que las URLs coincidan

**Problemas de autenticación:**
- Verificar que JWT_SECRET esté configurado
- Comprobar tokens en localStorage

## 📈 Futuras Mejoras

- [ ] Dashboard con estadísticas
- [ ] Notificaciones en tiempo real
- [ ] Aplicación móvil
- [ ] Integración con sistemas de RRHH
- [ ] Reportes avanzados con gráficos
- [ ] Sistema de backup automático

## 👨‍💻 Desarrollo

### Comandos Útiles

**Backend:**
```bash
# Desarrollo con nodemon
npm run dev

# Crear nueva migración
npx sequelize-cli migration:generate --name nombre-migracion

# Crear nuevo seeder
npx sequelize-cli seed:generate --name nombre-seeder
```

**Frontend:**
```bash
# Desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## 📝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## Autor

**Luciano Avendaño**
- GitHub: [@LucianoAven](https://github.com/LucianoAven)
- Proyecto: Evaluación Final Integradora - Programación III

---
