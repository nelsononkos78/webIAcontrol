#!/bin/bash

echo "🚀 Subida via API de GitHub"
echo "============================"
echo ""

# Verificar si se proporcionó el token
if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar tu token de GitHub"
    echo ""
    echo "📝 Uso: ./upload-via-api.sh TU_TOKEN_AQUI"
    exit 1
fi

TOKEN=$1
REPO="nelsononkos78/webIAcontrol"
BRANCH="main"

echo "✅ Token proporcionado"
echo "🔄 Preparando archivos para subir..."

# Crear archivo temporal con el contenido del README
cat > temp_readme.md << 'EOF'
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

## 🔐 Seguridad

### Autenticación
- **Admin Panel**: Token-based
- **API**: Headers de autorización
- **Base de Datos**: Conexión segura

### Variables Sensibles
- API keys en `.env`
- Credenciales de DB
- Tokens de autenticación

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
EOF

echo "📤 Subiendo README.md..."

# Subir README usando la API de GitHub
curl -X PUT \
  -H "Authorization: Bearer $TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  -H "Content-Type: application/json" \
  -d "{
    \"message\": \"Initial commit: Onkos Instituto del Cáncer - Sistema completo con chatbot IA\",
    \"content\": \"$(base64 -w 0 temp_readme.md)\",
    \"branch\": \"$BRANCH\"
  }" \
  "https://api.github.com/repos/$REPO/contents/README.md"

if [ $? -eq 0 ]; then
    echo "✅ README.md subido exitosamente"
else
    echo "❌ Error al subir README.md"
    rm temp_readme.md
    exit 1
fi

# Limpiar archivo temporal
rm temp_readme.md

echo ""
echo "🎉 ¡Contenido subido exitosamente!"
echo ""
echo "📋 Resumen:"
echo "   ✅ Repositorio: https://github.com/nelsononkos78/webIAcontrol"
echo "   ✅ README.md: Subido via API"
echo ""
echo "🔗 Enlaces útiles:"
echo "   📖 README: https://github.com/nelsononkos78/webIAcontrol/blob/main/README.md"
echo "   🏥 Proyecto: Onkos Instituto del Cáncer"
echo ""
echo "⚠️  Nota: Este método solo sube el README. Para subir todo el código:"
echo "   1. Crear un token clásico (ver create-classic-token.md)"
echo "   2. Usar git push normal"
echo ""
echo "🚀 ¡Tu proyecto está ahora en GitHub!" 