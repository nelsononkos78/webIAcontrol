# 🏥 Onkos Instituto del Cáncer - Sistema de Gestión con IA

## 📋 Descripción

Sistema completo de gestión para clínica oncológica con chatbot inteligente integrado con Groq AI. Desarrollado con Vue.js (frontend) y Node.js (backend), incluye gestión de citas, pacientes, médicos y panel administrativo.

## 🚀 Características Principales

### 🤖 Chatbot Inteligente - Lucía
- **IA**: Integración con Groq AI (llama3-8b-8192)
- **Personalidad**: Lucía, recepcionista amigable y profesional
- **Funcionalidades**:
  - Información sobre servicios y especialidades
  - Agendamiento automático de citas
  - Validación de pacientes existentes
  - Indicador de escritura en tiempo real
  - Respuestas estructuradas y naturales

### 🎨 Frontend Moderno (Vue.js 3)
- **Diseño**: Landing page moderna y responsive
- **Componentes**: 
  - Chatbot integrado
  - Panel administrativo
  - Formularios de citas
  - Calendario interactivo
- **Estilos**: SCSS con paleta de colores personalizada
- **Iconografía**: Font Awesome

### ⚙️ Backend Robusto (Node.js)
- **API RESTful**: Endpoints para todas las funcionalidades
- **Base de Datos**: PostgreSQL con esquema completo
- **Autenticación**: Sistema de login para administradores
- **CORS**: Configurado correctamente para desarrollo

### 📊 Base de Datos (PostgreSQL)
- **Tablas**: usuarios, roles, pacientes, médicos, especialidades, citas
- **Relaciones**: Esquema normalizado con foreign keys
- **Datos**: Seed data incluido para pruebas

## 🏗️ Estructura del Proyecto

```
onkos-system/
├── frontend/                 # Aplicación Vue.js
│   ├── src/
│   │   ├── components/      # Componentes Vue
│   │   ├── views/          # Páginas principales
│   │   ├── assets/         # Estilos e imágenes
│   │   └── router/         # Configuración de rutas
│   └── public/             # Archivos públicos
├── backend/                 # Servidor Node.js
│   ├── server.js           # Servidor principal
│   ├── database.js         # Configuración DB
│   └── scripts/            # Scripts de inicialización
├── scripts/                 # Scripts de utilidad
└── docs/                    # Documentación
```

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Vue.js 3**: Framework principal
- **Vue Router**: Navegación
- **SCSS**: Estilos avanzados
- **Axios**: Cliente HTTP
- **Font Awesome**: Iconos

### Backend
- **Node.js**: Runtime
- **Express.js**: Framework web
- **PostgreSQL**: Base de datos
- **pg**: Cliente PostgreSQL
- **Axios**: Cliente HTTP para IA

### IA y APIs
- **Groq AI**: Procesamiento de lenguaje natural
- **Modelo**: llama3-8b-8192
- **Integración**: API REST

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 16+
- PostgreSQL 12+
- npm o yarn

### 1. Clonar el Repositorio
```bash
git clone https://github.com/nelsononkos78/webIAcontrol.git
cd webIAcontrol
```

### 2. Configurar Base de Datos
```bash
# Crear base de datos PostgreSQL
createdb onkosdb

# Configurar variables de entorno
cp backend/config.env.example backend/config.env
# Editar backend/config.env con tus credenciales
```

### 3. Instalar Dependencias
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 4. Inicializar Base de Datos
```bash
cd backend
node init-database.js
```

### 5. Ejecutar el Proyecto
```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm run serve
```

## 🎯 Uso Rápido

### Acceso al Sistema
- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:3001
- **Admin Panel**: Login con `admin` / `123abc`

### Funcionalidades Principales
1. **Chatbot**: Click en el ícono de chat
2. **Agendar Cita**: Formulario en "Agendar Cita"
3. **Panel Admin**: Ícono de engranaje (⚙️)
4. **Gestión**: Médicos, pacientes, citas, agenda

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```env
# Backend (.env)
GROQ_API_KEY=tu_api_key_de_groq
DATABASE_URL=postgresql://usuario:password@localhost:5433/onkosdb
PORT=3001
NODE_ENV=development
```

### Scripts Útiles
```bash
# Instalación completa
./install.sh

# Reiniciar servidores
./restart-servers.sh

# Solo backend
./start-server.sh

# Probar flujo de citas
./test-appointment-flow.sh
```

## 📊 Base de Datos

### Esquema Principal
- **usuarios**: Administradores y personal
- **roles**: Permisos del sistema
- **pacientes**: Información de pacientes
- **medicos**: Especialistas y horarios
- **especialidades**: Áreas médicas
- **citas**: Agendamiento y estado

### Datos de Prueba
- **Admin**: `admin` / `123abc`
- **Médicos**: 4 especialistas con horarios
- **Pacientes**: Datos de ejemplo
- **Citas**: Agendamiento de prueba

## 🤖 Chatbot - Lucía

### Personalidad
- **Nombre**: Lucía
- **Rol**: Recepcionista virtual
- **Tono**: Amigable y profesional
- **Idioma**: Español

### Capacidades
- Información sobre servicios
- Agendamiento de citas
- Validación de pacientes
- Respuestas estructuradas
- Indicador de escritura

### Flujo de Agendamiento
1. Detección de intención
2. Recolección de datos
3. Validación de paciente
4. Selección de especialidad
5. Elección de fecha/hora
6. Confirmación y guardado

## 🔐 Seguridad

### Autenticación
- **Admin Panel**: Token-based
- **API**: Headers de autorización
- **Base de Datos**: Conexión segura

### Variables Sensibles
- API keys en `.env`
- Credenciales de DB
- Tokens de autenticación

## 🚀 Despliegue

### Producción
1. Configurar variables de entorno
2. Build del frontend: `npm run build`
3. Configurar servidor web (nginx)
4. Configurar PM2 para Node.js
5. Configurar SSL/HTTPS

### Docker (Opcional)
```dockerfile
# Dockerfile para backend
FROM node:16-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3001
CMD ["npm", "start"]
```

## 📝 Contribución

### Estructura de Ramas
- **main**: Código estable
- **dev-IA**: Desarrollo activo

### Flujo de Trabajo
1. Fork del repositorio
2. Crear rama feature
3. Desarrollar funcionalidad
4. Tests y documentación
5. Pull Request

## 📄 Licencia

MIT License - Ver [LICENSE](LICENSE) para detalles.

## 👥 Autores

- **Desarrollador**: Nelson Giménez
- **Proyecto**: Onkos Instituto del Cáncer
- **Contacto**: nelsononkos78

## 🆘 Soporte

### Problemas Comunes
1. **Error de CORS**: Verificar configuración en `vue.config.js`
2. **DB Connection**: Verificar `DATABASE_URL` en `.env`
3. **API Key**: Verificar `GROQ_API_KEY` en `.env`

### Logs y Debug
- **Backend**: Console logs en terminal
- **Frontend**: Browser DevTools
- **DB**: Logs de PostgreSQL

---

**🏥 Onkos Instituto del Cáncer - Innovación en Salud con IA** 🚀 