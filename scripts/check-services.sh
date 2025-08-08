#!/bin/bash

# Script para verificar el estado de los servicios Onkos
# Autor: Asistente IA

echo "🔍 Verificando estado de servicios Onkos..."
echo "=========================================="

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

# Verificar puertos
check_port() {
    local port=$1
    local service=$2
    
    if ss -tlnp | grep -q ":$port "; then
        print_success "$service (puerto $port) está ejecutándose"
        return 0
    else
        print_error "$service (puerto $port) no está ejecutándose"
        return 1
    fi
}

# Verificar API del backend
check_backend_api() {
    print_status "Verificando API del backend..."
    
    if curl -s http://localhost:3001/api/health > /dev/null; then
        print_success "Backend API responde correctamente"
        return 0
    else
        print_error "Backend API no responde"
        return 1
    fi
}

# Verificar frontend
check_frontend() {
    print_status "Verificando frontend..."
    
    if curl -s http://localhost:8080 > /dev/null; then
        print_success "Frontend responde correctamente"
        return 0
    else
        print_error "Frontend no responde"
        return 1
    fi
}

# Verificar base de datos
check_database() {
    print_status "Verificando conexión a base de datos..."
    
    cd backend
    if node -e "
    const { testConnection } = require('./database');
    testConnection().then(connected => {
        if (connected) {
            console.log('✅ Base de datos conectada');
            process.exit(0);
        } else {
            console.log('❌ Error de conexión a base de datos');
            process.exit(1);
        }
    });
    " > /dev/null 2>&1; then
        print_success "Base de datos conectada correctamente"
        cd ..
        return 0
    else
        print_error "Error de conexión a base de datos"
        cd ..
        return 1
    fi
}

# Función principal
main() {
    local backend_ok=false
    local frontend_ok=false
    local database_ok=false
    
    echo ""
    
    # Verificar puertos
    print_status "Verificando puertos..."
    if check_port 3001 "Backend"; then
        backend_ok=true
    fi
    
    if check_port 8080 "Frontend"; then
        frontend_ok=true
    fi
    
    echo ""
    
    # Verificar servicios
    if $backend_ok; then
        if check_backend_api; then
            backend_ok=true
        else
            backend_ok=false
        fi
    fi
    
    if $frontend_ok; then
        check_frontend
    fi
    
    echo ""
    
    # Verificar base de datos
    check_database
    
    echo ""
    echo "=========================================="
    echo "📊 Resumen del estado de servicios:"
    echo ""
    
    if $backend_ok; then
        print_success "✅ Backend: Funcionando"
    else
        print_error "❌ Backend: No disponible"
    fi
    
    if $frontend_ok; then
        print_success "✅ Frontend: Funcionando"
    else
        print_error "❌ Frontend: No disponible"
    fi
    
    if check_database; then
        print_success "✅ Base de datos: Conectada"
    else
        print_error "❌ Base de datos: No disponible"
    fi
    
    echo ""
    
    if $backend_ok && $frontend_ok; then
        echo "🎉 ¡Sistema Onkos completamente funcional!"
        echo ""
        echo "🌐 Acceso al sistema:"
        echo "   Frontend: http://localhost:8080"
        echo "   Backend API: http://localhost:3001"
        echo ""
        echo "🔐 Credenciales de acceso:"
        echo "   Administrador: admin / 123abc"
        echo "   Médico: carlos / medico123"
        echo "   Staff: maria / staff123"
        echo "   Paciente: juan / patient123"
    else
        echo "⚠️  Algunos servicios no están funcionando correctamente"
        echo ""
        echo "Para reiniciar los servicios:"
        echo "   ./scripts/start.sh"
    fi
    
    echo ""
}

# Ejecutar función principal
main 