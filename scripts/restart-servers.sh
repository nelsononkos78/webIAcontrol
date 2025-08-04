#!/bin/bash

echo "🔄 Reiniciando servidores Onkos..."

# Detener procesos existentes
echo "🛑 Deteniendo procesos existentes..."
pkill -f "node server.js" 2>/dev/null
pkill -f "npm run serve" 2>/dev/null
sleep 2

# Iniciar backend
echo "🚀 Iniciando servidor backend..."
cd backend
node server.js &
BACKEND_PID=$!
cd ..

# Iniciar frontend
echo "🎨 Iniciando servidor frontend..."
cd frontend
npm run serve &
FRONTEND_PID=$!
cd ..

# Esperar a que los servidores estén listos
echo "⏳ Esperando a que los servidores estén listos..."
sleep 8

# Verificar estado
echo "🔍 Verificando estado de los servidores..."

# Verificar backend
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Backend funcionando en http://localhost:3001"
else
    echo "❌ Error: Backend no responde"
fi

# Verificar frontend
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Frontend funcionando en http://localhost:8080"
else
    echo "❌ Error: Frontend no responde"
fi

echo ""
echo "🎉 ¡Servidores reiniciados exitosamente!"
echo ""
echo "📋 URLs de acceso:"
echo "   🌐 Frontend: http://localhost:8080"
echo "   🔧 Backend: http://localhost:3001"
echo "   👤 Admin Panel: http://localhost:8080 (hacer clic en el ícono de engranaje)"
echo ""
echo "🔐 Credenciales de administrador:"
echo "   Usuario: admin"
echo "   Contraseña: 123abc"
echo ""
echo "💡 Para detener los servidores: pkill -f 'node server.js' && pkill -f 'npm run serve'" 