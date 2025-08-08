# 🎉 Sistema Onkos Completamente Funcional

## ✅ Estado Actual

El sistema Onkos Instituto del Cáncer está **completamente operativo** con todos los servicios ejecutándose correctamente.

### 🚀 Servicios Activos

| Servicio | Estado | Puerto | URL |
|----------|--------|--------|-----|
| **Backend API** | ✅ Funcionando | 3001 | http://localhost:3001 |
| **Frontend Web** | ✅ Funcionando | 8080 | http://localhost:8080 |
| **Base de Datos** | ✅ Conectada | 5432 | PostgreSQL |

### 📊 Verificación de Servicios

```bash
# Verificar estado de todos los servicios
./scripts/check-services.sh

# Verificar solo la base de datos
./scripts/test-database.sh
```

## 🌐 Acceso al Sistema

### Frontend (Interfaz Web)
- **URL**: http://localhost:8080
- **Descripción**: Interfaz principal del sistema
- **Características**: 
  - Página de inicio con información de la clínica
  - Sistema de citas médicas
  - Chatbot integrado
  - Panel de administración

### Backend API
- **URL**: http://localhost:3001
- **Descripción**: API REST del sistema
- **Endpoints principales**:
  - `/api/health` - Estado del servidor
  - `/api/chat` - Chatbot API
  - `/api/citas` - Gestión de citas
  - `/api/usuarios` - Gestión de usuarios

## 🔐 Credenciales de Acceso

### Usuarios del Sistema

| Usuario | Contraseña | Rol | Acceso |
|---------|------------|-----|--------|
| `admin` | `123abc` | Administrador | Panel completo |
| `carlos` | `medico123` | Médico | Gestión de pacientes |
| `ana` | `medico123` | Médico | Gestión de pacientes |
| `maria` | `staff123` | Staff | Gestión administrativa |
| `juan` | `patient123` | Paciente | Información personal |

### Roles Disponibles
- **admin**: Acceso completo al sistema
- **medical**: Personal médico
- **staff**: Personal administrativo
- **patient**: Pacientes
- **user**: Usuario general

## 🏥 Funcionalidades del Sistema

### Para Administradores
- Gestión completa de usuarios
- Configuración del sistema
- Reportes y estadísticas
- Gestión de especialidades médicas

### Para Médicos
- Gestión de pacientes
- Programación de citas
- Historial médico
- Consulta de horarios

### Para Staff
- Gestión administrativa
- Programación de citas
- Gestión de pacientes
- Reportes básicos

### Para Pacientes
- Consulta de citas
- Información personal
- Historial médico básico
- Chatbot para consultas

## 🤖 Chatbot Integrado

El sistema incluye un chatbot inteligente con las siguientes capacidades:
- Información sobre la clínica
- Programación de citas
- Consultas médicas básicas
- Información sobre especialidades
- Horarios de atención

## 🛠️ Comandos Útiles

### Gestión de Servicios
```bash
# Iniciar todos los servicios
./scripts/start.sh

# Verificar estado de servicios
./scripts/check-services.sh

# Detener servicios (Ctrl+C en la terminal donde se ejecutó start.sh)
```

### Gestión de Base de Datos
```bash
# Verificar base de datos
./scripts/test-database.sh

# Configurar base de datos (si es necesario)
./scripts/setup-database.sh

# Reiniciar base de datos
node backend/reset-database.js
```

### Desarrollo
```bash
# Backend en modo desarrollo
cd backend && npm run dev

# Frontend en modo desarrollo
cd frontend && npm run serve

# Instalar dependencias
cd backend && npm install
cd frontend && npm install
```

## 📋 Estructura del Proyecto

```
webIAcontrol/
├── backend/           # Servidor API Node.js
├── frontend/          # Aplicación Vue.js
├── scripts/           # Scripts de automatización
├── docs/              # Documentación
└── RESUMEN_CONFIGURACION.md
```

## 🔧 Configuración Técnica

### Backend
- **Framework**: Node.js + Express
- **Base de datos**: PostgreSQL
- **Puerto**: 3001
- **Variables de entorno**: `backend/config.env`

### Frontend
- **Framework**: Vue.js 3
- **Puerto**: 8080
- **Build tool**: Vue CLI

### Base de Datos
- **Sistema**: PostgreSQL
- **Base de datos**: `onkosdb`
- **Usuario**: `postgres`
- **Puerto**: 5432

## 🚨 Solución de Problemas

### Si el backend no responde
```bash
cd backend
npm install
npm run dev
```

### Si el frontend no responde
```bash
cd frontend
npm install
npm run serve
```

### Si la base de datos no conecta
```bash
./scripts/setup-database.sh
./scripts/test-database.sh
```

### Verificar puertos en uso
```bash
ss -tlnp | grep -E "(3001|8080)"
```

## 📞 Soporte

Para obtener ayuda adicional:

1. **Verificar logs**: Los logs aparecen en la terminal donde se ejecutan los servicios
2. **Reiniciar servicios**: Detener con Ctrl+C y volver a ejecutar `./scripts/start.sh`
3. **Verificar configuración**: Revisar archivos de configuración en `backend/config.env`

---

**Estado**: ✅ Sistema completamente funcional  
**Fecha**: $(date)  
**Versión**: 1.0.0  
**Entorno**: Desarrollo 