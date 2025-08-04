# Onkos System - Clínica Oncológica

Una landing page moderna para una clínica oncológica con chatbot integrado usando Vue.js para el frontend y Node.js para el backend.

## 🏥 Características

- **Landing Page Moderna**: Diseño limpio y profesional con enfoque en la experiencia del usuario
- **Chatbot Inteligente**: Integrado con Groq AI para asistencia en tiempo real
- **Gestión de Citas**: Sistema completo para programar citas médicas
- **Información de Servicios**: Detalles de todos los servicios oncológicos
- **Perfiles de Especialistas**: Información completa de los médicos
- **Formulario de Contacto**: Comunicación directa con la clínica
- **Diseño Responsivo**: Optimizado para todos los dispositivos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Vue.js 3**: Framework progresivo para interfaces de usuario
- **Vue Router**: Enrutamiento de la aplicación
- **SCSS**: Preprocesador CSS para estilos avanzados
- **Font Awesome**: Iconografía
- **Axios**: Cliente HTTP para comunicación con el backend

### Backend
- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web para Node.js
- **CORS**: Configuración para comunicación entre dominios
- **Axios**: Cliente HTTP para comunicación con APIs externas
- **Groq AI**: API de inteligencia artificial para el chatbot

## 📁 Estructura del Proyecto

```
onkos-system/
├── frontend/                 # Aplicación Vue.js
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/      # Componentes reutilizables
│   │   ├── views/          # Páginas de la aplicación
│   │   ├── router/         # Configuración de rutas
│   │   ├── assets/         # Estilos y recursos
│   │   ├── App.vue         # Componente principal
│   │   └── main.js         # Punto de entrada
│   ├── package.json
│   └── vue.config.js
├── backend/                 # Servidor Node.js
│   ├── server.js           # Servidor principal
│   ├── package.json
│   └── config.env          # Variables de entorno
└── README.md
```

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js (versión 16 o superior)
- npm o yarn

### 1. Clonar el repositorio
```bash
git clone <url-del-repositorio>
cd onkos-system
```

### 2. Configurar el Backend
```bash
cd backend
npm install
```

### 3. Configurar variables de entorno
Editar el archivo `backend/config.env`:
```env
GROQ_API_KEY=tu_api_key_de_groq
PORT=3001
NODE_ENV=development
```

### 4. Configurar el Frontend
```bash
cd ../frontend
npm install
```

### 5. Ejecutar el proyecto

#### Terminal 1 - Backend
```bash
cd backend
npm run dev
```

#### Terminal 2 - Frontend
```bash
cd frontend
npm run serve
```

## 🌐 Acceso a la Aplicación

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001

## ⚡ Uso Rápido

### Instalación Automática
```bash
# Dar permisos de ejecución
chmod +x install.sh start.sh

# Instalar dependencias
./install.sh

# Iniciar el proyecto
./start.sh
```

### Comandos Manuales
```bash
# Backend
cd backend && npm install && npm run dev

# Frontend (nueva terminal)
cd frontend && npm install && npm run serve
```

### Verificar Funcionamiento
```bash
# Verificar backend
curl http://localhost:3001/api/health

# Verificar chatbot
curl -X POST http://localhost:3001/api/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hola"}'
```

## 📋 Funcionalidades Principales

### 1. Landing Page
- Hero section con llamadas a la acción
- Servicios destacados
- Estadísticas de la clínica
- Información sobre el equipo médico

### 2. Chatbot Inteligente - Lucía
- **Integración con Groq AI**: Modelo llama3-8b-8192
- **Personalidad humana**: Lucía se presenta como recepcionista real
- **Respuestas naturales**: Tiempo de escritura realista (1-8 segundos)
- **Estructura inteligente**: Mensajes largos divididos en partes
- **Asistencia completa**: Citas, servicios, especialistas, emergencias
- **Historial de conversación**: Mantiene contexto de la conversación

### 3. Gestión de Citas
- Formulario completo de solicitud de cita
- Selección de especialidad y doctor
- Información médica del paciente
- Validaciones de formulario

### 4. Páginas Informativas
- **Servicios**: Detalles de cada servicio oncológico
- **Especialistas**: Perfiles completos de los médicos
- **Contacto**: Información de contacto y formulario

## 🔧 Configuración de CORS

El backend está configurado para permitir comunicación desde:
- http://localhost:8080
- http://localhost:3000
- http://127.0.0.1:8080

## 🤖 Configuración del Chatbot - Lucía

### Características Principales
- **Personalidad**: Lucía es una recepcionista real de la clínica
- **Tono natural**: Conversacional y humano, no robótico
- **Tiempo realista**: Simula escritura humana (1-8 segundos según longitud)
- **Estructura inteligente**: Divide mensajes largos en partes para mejor lectura
- **Contexto**: Mantiene historial de conversación para respuestas coherentes

### Funcionalidades
- Proporcionar información sobre servicios oncológicos
- Ayudar a programar citas médicas
- Responder preguntas sobre la clínica y especialistas
- Ofrecer orientación médica básica
- Manejar emergencias con números de contacto
- Información sobre ubicación y horarios

## 📱 Diseño Responsivo

La aplicación está optimizada para:
- **Desktop**: 1200px+
- **Tablet**: 768px - 1199px
- **Mobile**: < 768px

## 🎨 Características de Diseño

- **Paleta de Colores**: Gradientes azul-púrpura
- **Tipografía**: Inter y Poppins
- **Iconografía**: Font Awesome
- **Animaciones**: Transiciones suaves y efectos hover
- **Accesibilidad**: Contraste adecuado y navegación por teclado

## 🔒 Seguridad

- Validación de formularios en frontend y backend
- Sanitización de datos de entrada
- Configuración segura de CORS
- Manejo de errores robusto

## 📊 API Endpoints

### Backend
- `GET /api/health` - Estado del servidor
- `POST /api/chat` - Endpoint del chatbot
- `POST /api/appointments` - Crear solicitud de cita
- `GET /api/clinic-info` - Información de la clínica

## 🇵🇪 Localización - Perú

El proyecto está configurado para la Clínica Onkos System en Perú:
- **Ubicación**: Av. Arequipa 123, Lima, Perú
- **Teléfono principal**: +51 1 234 5678
- **Teléfono emergencias**: +51 300 123 4567
- **Universidades**: Universidad Nacional Mayor de San Marcos
- **Horarios**: Lunes a Viernes 8:00 AM - 6:00 PM

## 🚀 Despliegue

### Backend (Heroku/Netlify Functions)
```bash
cd backend
npm run build
```

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para detalles.

## 🔧 Solución de Problemas Comunes

### Error de CORS
```bash
# Verificar que el backend esté corriendo en puerto 3001
curl http://localhost:3001/api/health
```

### Error de API Key de Groq
```bash
# Verificar archivo config.env
cat backend/config.env
```

### Puerto ya en uso
```bash
# Cambiar puerto en config.env
PORT=3002
```

### Error de compilación Frontend
```bash
# Limpiar cache
cd frontend && rm -rf node_modules package-lock.json
npm install
```

## 📞 Soporte

Para soporte técnico o preguntas sobre el proyecto:
- Email: soporte@onkos.com
- Teléfono: +51 1 234 5678

## 🙏 Agradecimientos

- [Vue.js](https://vuejs.org/) - Framework progresivo
- [Express.js](https://expressjs.com/) - Framework web
- [Groq](https://groq.com/) - API de inteligencia artificial
- [Font Awesome](https://fontawesome.com/) - Iconografía
- [Google Fonts](https://fonts.google.com/) - Tipografías 