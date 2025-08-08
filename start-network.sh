#!/bin/bash

# Script para iniciar Onkos System en modo red
# Permite acceso desde otras PCs en la red local

echo "🚀 Iniciando Onkos System en modo red..."
echo "📡 IP de la máquina: 192.168.1.123"
echo ""

# Verificar si los puertos están libres
echo "🔍 Verificando puertos disponibles..."

if lsof -Pi :3001 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ Puerto 3001 (backend) ya está en uso"
    exit 1
fi

if lsof -Pi :8080 -sTCP:LISTEN -t >/dev/null ; then
    echo "❌ Puerto 8080 (frontend) ya está en uso"
    exit 1
fi

echo "✅ Puertos libres - continuando..."

# Instalar dependencias si es necesario
echo ""
echo "📦 Verificando dependencias..."

if [ ! -d "backend/node_modules" ]; then
    echo "📦 Instalando dependencias del backend..."
    cd backend && npm install && cd ..
fi

if [ ! -d "frontend/node_modules" ]; then
    echo "📦 Instalando dependencias del frontend..."
    cd frontend && npm install && cd ..
fi

echo ""
echo "🌐 URLs de acceso:"
echo "   • Frontend: http://192.168.1.123:8080"
echo "   • Backend API: http://192.168.1.123:3001"
echo ""

# Iniciar backend en segundo plano
echo "🔧 Iniciando backend..."
cd backend
npm start &
BACKEND_PID=$!
cd ..

# Esperar un momento para que el backend se inicie
sleep 3

# Iniciar frontend en segundo plano
echo "🎨 Iniciando frontend..."
cd frontend
npm run serve &
FRONTEND_PID=$!
cd ..

echo ""
echo "✅ Servicios iniciados correctamente!"
echo ""
echo "📱 Para acceder desde otras PCs en la red:"
echo "   • Abrir navegador y ir a: http://192.168.1.123:8080"
echo ""
echo "🛑 Para detener los servicios: Ctrl+C"
echo ""

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Servicios detenidos"
    exit 0
}

# Capturar señal de interrupción
trap cleanup SIGINT SIGTERM

# Mantener el script corriendo
wait 