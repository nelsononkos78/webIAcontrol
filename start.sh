#!/bin/bash

echo "🚀 Iniciando Onkos System..."
echo "============================"

# Función para limpiar procesos al salir
cleanup() {
    echo ""
    echo "🛑 Deteniendo servicios..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Capturar Ctrl+C
trap cleanup SIGINT

# Iniciar backend
echo "📡 Iniciando servidor backend..."
cd backend
npm run dev &
BACKEND_PID=$!

# Esperar un momento para que el backend inicie
sleep 3

# Iniciar frontend
echo "🌐 Iniciando servidor frontend..."
cd ../frontend
npm run serve &
FRONTEND_PID=$!

echo ""
echo "✅ Servicios iniciados correctamente!"
echo ""
echo "🌐 Frontend: http://localhost:8080"
echo "📡 Backend API: http://localhost:3001"
echo ""
echo "🤖 Chatbot disponible en la esquina inferior derecha"
echo ""
echo "Presiona Ctrl+C para detener todos los servicios"

# Esperar a que ambos procesos terminen
wait 