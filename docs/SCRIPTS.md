# 📜 Scripts del Proyecto - Onkos Instituto del Cáncer

## 📁 Estructura de Scripts

```
scripts/
├── install.sh                    # Instalación completa del proyecto
├── start.sh                      # Inicio de servidores (frontend + backend)
├── start-server.sh               # Solo backend
├── restart-servers.sh            # Reinicio de servidores
├── test-appointment-flow.sh      # Pruebas del flujo de citas
├── deploy-to-github.sh           # Despliegue a GitHub (token clásico)
├── deploy-with-fine-grained-token.sh  # Despliegue (token fine-grained)
├── upload-via-api.sh             # Subida via API de GitHub
└── github-setup-helper.sh        # Asistente de configuración GitHub
```

## 🚀 Scripts de Instalación y Ejecución

### `install.sh`
**Propósito**: Instalación completa del proyecto
```bash
./scripts/install.sh
```
**Funciones**:
- Verifica Node.js 16+
- Instala dependencias del backend
- Instala dependencias del frontend
- Crea archivo `config.env` con plantilla
- Configuración inicial

### `start.sh`
**Propósito**: Inicio de servidores
```bash
./scripts/start.sh
```
**Funciones**:
- Inicia backend en puerto 3001
- Inicia frontend en puerto 8080
- Verifica estado de servicios

### `start-server.sh`
**Propósito**: Solo backend
```bash
./scripts/start-server.sh
```
**Funciones**:
- Verifica conexión a base de datos
- Inicia servidor backend
- Muestra credenciales de admin

### `restart-servers.sh`
**Propósito**: Reinicio de servidores
```bash
./scripts/restart-servers.sh
```
**Funciones**:
- Detiene servidores existentes
- Reinicia backend y frontend
- Verifica estado

### `test-appointment-flow.sh`
**Propósito**: Pruebas del flujo de citas
```bash
./scripts/test-appointment-flow.sh
```
**Funciones**:
- Prueba endpoints del backend
- Simula flujo de agendamiento
- Verifica funcionalidad del chatbot

## 🔧 Scripts de GitHub

### `deploy-to-github.sh`
**Propósito**: Despliegue con token clásico
```bash
./scripts/deploy-to-github.sh TU_TOKEN_CLASICO
```
**Funciones**:
- Configura repositorio remoto
- Sube rama main
- Crea rama dev-IA
- Configuración automática

### `deploy-with-fine-grained-token.sh`
**Propósito**: Despliegue con token fine-grained
```bash
./scripts/deploy-with-fine-grained-token.sh TU_TOKEN_FINE_GRAINED
```
**Funciones**:
- Maneja tokens fine-grained
- Configuración alternativa
- Logs de debug

### `upload-via-api.sh`
**Propósito**: Subida via API de GitHub
```bash
./scripts/upload-via-api.sh TU_TOKEN
```
**Funciones**:
- Sube contenido via API REST
- Solo para archivos individuales
- Método alternativo

### `github-setup-helper.sh`
**Propósito**: Asistente interactivo
```bash
./scripts/github-setup-helper.sh
```
**Funciones**:
- Guía paso a paso
- Opciones de configuración
- Instrucciones detalladas

## 📋 Uso Rápido

### Instalación Inicial
```bash
# 1. Clonar repositorio
git clone https://github.com/nelsononkos78/webIAcontrol.git
cd webIAcontrol

# 2. Instalar dependencias
./scripts/install.sh

# 3. Configurar variables de entorno
cp backend/config.env.example backend/config.env
# Editar backend/config.env

# 4. Inicializar base de datos
cd backend && node init-database.js

# 5. Iniciar servidores
./scripts/start.sh
```

### Desarrollo Diario
```bash
# Iniciar solo backend
./scripts/start-server.sh

# Reiniciar servidores
./scripts/restart-servers.sh

# Probar funcionalidad
./scripts/test-appointment-flow.sh
```

### Despliegue a GitHub
```bash
# Opción 1: Token clásico (recomendado)
./scripts/deploy-to-github.sh ghp_xxxxxxxxxxxxxxxxxxxx

# Opción 2: Asistente interactivo
./scripts/github-setup-helper.sh
```

## ⚠️ Notas Importantes

### Permisos de Ejecución
```bash
# Dar permisos a todos los scripts
chmod +x scripts/*.sh
```

### Variables de Entorno
- Los scripts asumen que `config.env` está configurado
- Verificar `GROQ_API_KEY` y `DATABASE_URL`
- Credenciales de admin: `admin` / `123abc`

### Dependencias
- Node.js 16+
- PostgreSQL 12+
- npm o yarn
- curl (para pruebas)

## 🔍 Troubleshooting

### Error: Permission denied
```bash
chmod +x scripts/nombre-del-script.sh
```

### Error: Puerto en uso
```bash
./scripts/restart-servers.sh
```

### Error: Base de datos
```bash
cd backend && node init-database.js
```

### Error: API key
```bash
# Verificar config.env
cat backend/config.env
```

## 📚 Documentación Relacionada

- [README.md](../README.md) - Documentación principal
- [create-classic-token.md](./create-classic-token.md) - Configuración de tokens
- [setup-ssh-keys.md](./setup-ssh-keys.md) - Configuración SSH 