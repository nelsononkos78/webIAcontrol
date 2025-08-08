# Configuración de Base de Datos - Onkos Instituto del Cáncer

## 📋 Requisitos Previos

- PostgreSQL instalado y ejecutándose
- Node.js y npm instalados
- Permisos de administrador para configurar PostgreSQL

## 🚀 Configuración Automática

### Opción 1: Script Automático (Recomendado)

Ejecuta el script de configuración automática:

```bash
./scripts/setup-database.sh
```

Este script realizará automáticamente:
- ✅ Verificar/instalar PostgreSQL
- ✅ Iniciar el servicio de PostgreSQL
- ✅ Crear la base de datos `onkosdb`
- ✅ Configurar el usuario `postgres` con la contraseña
- ✅ Crear todas las tablas necesarias
- ✅ Insertar datos de ejemplo
- ✅ Verificar la conexión

### Opción 2: Configuración Manual

Si prefieres configurar manualmente:

#### 1. Instalar PostgreSQL

**Ubuntu/Debian:**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
```

**CentOS/RHEL:**
```bash
sudo yum install postgresql postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl enable postgresql
sudo systemctl start postgresql
```

#### 2. Configurar Usuario y Base de Datos

```bash
# Iniciar PostgreSQL
sudo systemctl start postgresql

# Crear base de datos
sudo -u postgres createdb onkosdb

# Configurar contraseña del usuario postgres
sudo -u postgres psql -c "ALTER USER postgres PASSWORD '6DyTERskk?lS9NP8';"
```

#### 3. Configurar Variables de Entorno

Copia el archivo de configuración:
```bash
cp backend/config.env.example backend/config.env
```

Edita `backend/config.env` con tus credenciales:
```env
DATABASE_URL=postgresql://postgres:6DyTERskk?lS9NP8@localhost:5432/onkosdb
```

#### 4. Crear Tablas y Datos

```bash
cd backend
npm install
node create-tables.js
node init-database.js
```

## 🧪 Verificar Configuración

Ejecuta el script de prueba para verificar que todo funciona:

```bash
./scripts/test-database.sh
```

## 📊 Estructura de la Base de Datos

### Tablas Principales

| Tabla | Descripción |
|-------|-------------|
| `centro_medico` | Información de centros médicos |
| `especialidades` | Especialidades médicas |
| `medicos` | Información de médicos |
| `horarios_medicos` | Horarios de atención |
| `pacientes` | Información de pacientes |
| `citas` | Citas médicas |
| `historial_citas` | Historial de cambios en citas |
| `usuarios` | Usuarios del sistema |
| `roles` | Roles de usuario |
| `usuario_rol` | Relación usuarios-roles |

### Datos de Ejemplo Incluidos

- 🏥 **Centro Médico**: Onkos Instituto del Cáncer
- 🏥 **Especialidades**: 7 especialidades oncológicas
- 👨‍⚕️ **Médicos**: 4 médicos de ejemplo
- 👤 **Pacientes**: 4 pacientes de ejemplo
- 👥 **Usuarios**: 5 usuarios con diferentes roles

## 🔐 Credenciales de Acceso

### Usuarios del Sistema

| Usuario | Contraseña | Rol | Descripción |
|---------|------------|-----|-------------|
| `admin` | `123abc` | Administrador | Acceso completo al sistema |
| `carlos` | `medico123` | Médico | Personal médico |
| `ana` | `medico123` | Médico | Personal médico |
| `maria` | `staff123` | Staff | Personal administrativo |
| `juan` | `patient123` | Paciente | Paciente del sistema |

### Roles Disponibles

- **admin**: Administrador del sistema
- **user**: Usuario general
- **patient**: Paciente
- **medical**: Personal médico
- **staff**: Personal administrativo

## 🔧 Configuración de Conexión

### Variables de Entorno

```env
# Base de datos
DATABASE_URL=postgresql://postgres:6DyTERskk?lS9NP8@localhost:5432/onkosdb

# Servidor
PORT=3001
NODE_ENV=development

# API Keys
GROQ_API_KEY=tu_api_key_de_groq_aqui
```

### Parámetros de Conexión

- **Host**: localhost
- **Puerto**: 5432
- **Base de datos**: onkosdb
- **Usuario**: postgres
- **Contraseña**: 6DyTERskk?lS9NP8

## 🛠️ Comandos Útiles

### Reiniciar Base de Datos
```bash
./scripts/reset-database.js
```

### Verificar Estado
```bash
./scripts/test-database.sh
```

### Iniciar Servidor
```bash
./scripts/start.sh
```

## ❗ Solución de Problemas

### Error: "Connection refused"
- Verificar que PostgreSQL esté ejecutándose: `sudo systemctl status postgresql`
- Iniciar PostgreSQL: `sudo systemctl start postgresql`

### Error: "Authentication failed"
- Verificar credenciales en `backend/config.env`
- Reconfigurar contraseña: `sudo -u postgres psql -c "ALTER USER postgres PASSWORD '6DyTERskk?lS9NP8';"`

### Error: "Database does not exist"
- Crear base de datos: `sudo -u postgres createdb onkosdb`

### Error: "Table does not exist"
- Ejecutar script de creación: `node backend/create-tables.js`

## 📞 Soporte

Si encuentras problemas:

1. Verifica los logs: `tail -f backend/logs/app.log`
2. Ejecuta las pruebas: `./scripts/test-database.sh`
3. Revisa la configuración: `cat backend/config.env`

---

**Nota**: Esta configuración está optimizada para desarrollo. Para producción, considera usar variables de entorno seguras y configuraciones adicionales de seguridad. 