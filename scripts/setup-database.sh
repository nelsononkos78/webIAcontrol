#!/bin/bash

# Script para configurar la base de datos PostgreSQL para Onkos
# Autor: Asistente IA
# Fecha: $(date)

echo "🚀 Configurando base de datos PostgreSQL para Onkos..."

# Variables de configuración
DB_USER="postgres"
DB_PASSWORD="6DyTERskk?lS9NP8"
DB_NAME="onkosdb"
DB_HOST="localhost"
DB_PORT="5432"

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes con colores
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si PostgreSQL está instalado
check_postgresql() {
    print_status "Verificando instalación de PostgreSQL..."
    
    if command -v psql &> /dev/null; then
        print_success "PostgreSQL está instalado"
        return 0
    else
        print_error "PostgreSQL no está instalado"
        print_status "Instalando PostgreSQL..."
        
        # Detectar el sistema operativo
        if [[ "$OSTYPE" == "linux-gnu"* ]]; then
            if command -v apt-get &> /dev/null; then
                # Ubuntu/Debian
                sudo apt-get update
                sudo apt-get install -y postgresql postgresql-contrib
            elif command -v yum &> /dev/null; then
                # CentOS/RHEL
                sudo yum install -y postgresql postgresql-server postgresql-contrib
                sudo postgresql-setup initdb
                sudo systemctl enable postgresql
                sudo systemctl start postgresql
            else
                print_error "No se pudo detectar el gestor de paquetes"
                exit 1
            fi
        else
            print_error "Sistema operativo no soportado"
            exit 1
        fi
    fi
}

# Iniciar servicio de PostgreSQL
start_postgresql() {
    print_status "Iniciando servicio de PostgreSQL..."
    
    if sudo systemctl is-active --quiet postgresql; then
        print_success "PostgreSQL ya está ejecutándose"
    else
        sudo systemctl start postgresql
        if [ $? -eq 0 ]; then
            print_success "PostgreSQL iniciado correctamente"
        else
            print_error "No se pudo iniciar PostgreSQL"
            exit 1
        fi
    fi
}

# Configurar usuario y base de datos
setup_database() {
    print_status "Configurando usuario y base de datos..."
    
    # Crear la base de datos si no existe
    if sudo -u postgres psql -lqt | cut -d \| -f 1 | grep -qw $DB_NAME; then
        print_warning "La base de datos '$DB_NAME' ya existe"
    else
        print_status "Creando base de datos '$DB_NAME'..."
        sudo -u postgres createdb $DB_NAME
        if [ $? -eq 0 ]; then
            print_success "Base de datos '$DB_NAME' creada correctamente"
        else
            print_error "No se pudo crear la base de datos"
            exit 1
        fi
    fi
    
    # Configurar contraseña del usuario postgres
    print_status "Configurando contraseña del usuario postgres..."
    sudo -u postgres psql -c "ALTER USER postgres PASSWORD '$DB_PASSWORD';"
    
    if [ $? -eq 0 ]; then
        print_success "Contraseña configurada correctamente"
    else
        print_error "No se pudo configurar la contraseña"
        exit 1
    fi
}

# Crear tablas y datos iniciales
create_tables() {
    print_status "Creando tablas y datos iniciales..."
    
    # Navegar al directorio backend
    cd backend
    
    # Verificar que existe el archivo de configuración
    if [ ! -f "config.env" ]; then
        print_error "No se encontró el archivo config.env"
        exit 1
    fi
    
    # Instalar dependencias si no están instaladas
    if [ ! -d "node_modules" ]; then
        print_status "Instalando dependencias de Node.js..."
        npm install
    fi
    
    # Crear tablas
    print_status "Creando tablas de la base de datos..."
    node create-tables-simple.js
    
    if [ $? -eq 0 ]; then
        print_success "Tablas creadas correctamente"
    else
        print_error "Error al crear las tablas"
        exit 1
    fi
    
    # Ejecutar script de inicialización de base de datos
    print_status "Ejecutando script de inicialización..."
    node init-database.js
    
    if [ $? -eq 0 ]; then
        print_success "Base de datos inicializada correctamente"
    else
        print_error "Error al inicializar la base de datos"
        exit 1
    fi
    
    # Volver al directorio raíz
    cd ..
}

# Verificar conexión
test_connection() {
    print_status "Verificando conexión a la base de datos..."
    
    cd backend
    node -e "
    const { testConnection } = require('./database');
    testConnection().then(connected => {
        if (connected) {
            console.log('✅ Conexión exitosa a la base de datos');
            process.exit(0);
        } else {
            console.log('❌ Error de conexión a la base de datos');
            process.exit(1);
        }
    });
    "
    
    if [ $? -eq 0 ]; then
        print_success "Conexión verificada correctamente"
    else
        print_error "Error en la conexión a la base de datos"
        exit 1
    fi
    
    cd ..
}

# Función principal
main() {
    echo "=========================================="
    echo "  Configuración de Base de Datos Onkos"
    echo "=========================================="
    echo ""
    
    check_postgresql
    start_postgresql
    setup_database
    create_tables
    test_connection
    
    echo ""
    echo "🎉 ¡Configuración completada exitosamente!"
    echo ""
    echo "📋 Información de conexión:"
    echo "   Host: $DB_HOST"
    echo "   Puerto: $DB_PORT"
    echo "   Base de datos: $DB_NAME"
    echo "   Usuario: $DB_USER"
    echo ""
    echo "🔐 Credenciales de acceso al sistema:"
    echo "   Administrador: admin / 123abc"
    echo "   Médico: carlos / medico123"
    echo "   Staff: maria / staff123"
    echo "   Paciente: juan / patient123"
    echo ""
    echo "🚀 Para iniciar el servidor:"
    echo "   ./scripts/start.sh"
    echo ""
}

# Ejecutar función principal
main 