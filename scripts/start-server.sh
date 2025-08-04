#!/bin/bash

echo "🚀 Iniciando servidor Onkos Instituto del Cáncer..."

# Navegar al directorio backend
cd backend

# Verificar si las dependencias están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

# Verificar conexión a la base de datos
echo "🔍 Verificando conexión a la base de datos..."
node -e "
const { testConnection } = require('./database');
testConnection().then(connected => {
    if (connected) {
        console.log('✅ Conexión a PostgreSQL establecida');
        process.exit(0);
    } else {
        console.log('❌ Error conectando a PostgreSQL');
        process.exit(1);
    }
});
"

if [ $? -eq 0 ]; then
    echo "✅ Base de datos conectada correctamente"
    echo "🌐 Iniciando servidor en http://localhost:3001"
    echo "📡 API disponible en http://localhost:3001/api"
    echo ""
    echo "📋 Credenciales de acceso:"
    echo "👤 Administrador: admin / 123abc (o onkosadmin@onkos.com)"
    echo "👨‍⚕️ Médico: carlos / medico123 (o carlos.mendoza@onkos.com)"
    echo "👨‍⚕️ Médico: ana / medico123 (o ana.garcia@onkos.com)"
    echo "👥 Staff: maria / staff123 (o maria.gonzalez@onkos.com)"
    echo "👤 Paciente: juan / patient123 (o juan.perez@onkos.com)"
    echo ""
    echo "🔄 Iniciando servidor..."
    npm run dev
else
    echo "❌ Error: No se pudo conectar a la base de datos"
    echo "💡 Verifica que PostgreSQL esté ejecutándose y la URL de conexión sea correcta"
    exit 1
fi 