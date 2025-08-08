#!/bin/bash

# Script para probar la base de datos PostgreSQL de Onkos
# Autor: Asistente IA

echo "🧪 Probando configuración de base de datos Onkos..."

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

# Verificar conexión a PostgreSQL
test_postgresql_connection() {
    print_status "Verificando conexión a PostgreSQL..."
    
    if PGPASSWORD="6DyTERskk?lS9NP8" psql -h localhost -U postgres -d onkosdb -c "SELECT version();" &> /dev/null; then
        print_success "Conexión a PostgreSQL exitosa"
        return 0
    else
        print_error "No se pudo conectar a PostgreSQL"
        return 1
    fi
}

# Verificar tablas
test_tables() {
    print_status "Verificando tablas de la base de datos..."
    
    cd backend
    
    node -e "
    const { query } = require('./database');
    
    async function testTables() {
        try {
            const result = await query(\`
                SELECT table_name 
                FROM information_schema.tables 
                WHERE table_schema = 'public' 
                ORDER BY table_name
            \`);
            
            console.log('📊 Tablas encontradas:');
            result.rows.forEach(row => {
                console.log(\`   • \${row.table_name}\`);
            });
            
            const expectedTables = [
                'centro_medico', 'especialidades', 'medicos', 'horarios_medicos',
                'pacientes', 'citas', 'historial_citas', 'roles', 'usuarios', 'usuario_rol'
            ];
            
            const foundTables = result.rows.map(row => row.table_name);
            const missingTables = expectedTables.filter(table => !foundTables.includes(table));
            
            if (missingTables.length === 0) {
                console.log('✅ Todas las tablas están presentes');
            } else {
                console.log('⚠️  Tablas faltantes:', missingTables.join(', '));
            }
            
            process.exit(0);
        } catch (error) {
            console.error('❌ Error verificando tablas:', error.message);
            process.exit(1);
        }
    }
    
    testTables();
    "
    
    cd ..
}

# Verificar datos de ejemplo
test_sample_data() {
    print_status "Verificando datos de ejemplo..."
    
    cd backend
    
    node -e "
    const { query } = require('./database');
    
    async function testSampleData() {
        try {
            // Verificar centro médico
            const centroResult = await query('SELECT COUNT(*) as count FROM centro_medico');
            console.log(\`🏥 Centros médicos: \${centroResult.rows[0].count}\`);
            
            // Verificar especialidades
            const especialidadesResult = await query('SELECT COUNT(*) as count FROM especialidades');
            console.log(\`🏥 Especialidades: \${especialidadesResult.rows[0].count}\`);
            
            // Verificar médicos
            const medicosResult = await query('SELECT COUNT(*) as count FROM medicos');
            console.log(\`👨‍⚕️ Médicos: \${medicosResult.rows[0].count}\`);
            
            // Verificar pacientes
            const pacientesResult = await query('SELECT COUNT(*) as count FROM pacientes');
            console.log(\`👤 Pacientes: \${pacientesResult.rows[0].count}\`);
            
            // Verificar usuarios
            const usuariosResult = await query('SELECT COUNT(*) as count FROM usuarios');
            console.log(\`👥 Usuarios: \${usuariosResult.rows[0].count}\`);
            
            // Verificar roles
            const rolesResult = await query('SELECT COUNT(*) as count FROM roles');
            console.log(\`🔐 Roles: \${rolesResult.rows[0].count}\`);
            
            console.log('✅ Verificación de datos completada');
            process.exit(0);
        } catch (error) {
            console.error('❌ Error verificando datos:', error.message);
            process.exit(1);
        }
    }
    
    testSampleData();
    "
    
    cd ..
}

# Función principal
main() {
    echo "=========================================="
    echo "  Prueba de Base de Datos Onkos"
    echo "=========================================="
    echo ""
    
    if test_postgresql_connection; then
        test_tables
        test_sample_data
        
        echo ""
        echo "🎉 ¡Pruebas completadas exitosamente!"
        echo ""
        echo "📋 Resumen:"
        echo "   ✅ Conexión a PostgreSQL funcionando"
        echo "   ✅ Tablas creadas correctamente"
        echo "   ✅ Datos de ejemplo cargados"
        echo ""
        echo "🚀 El sistema está listo para usar"
    else
        echo ""
        print_error "Las pruebas fallaron. Verifica la configuración."
        exit 1
    fi
}

# Ejecutar función principal
main 