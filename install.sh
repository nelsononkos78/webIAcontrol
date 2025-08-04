#!/bin/bash

echo "🚀 Instalando Onkos System - Clínica Oncológica"
echo "================================================"

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js no está instalado. Por favor, instala Node.js versión 16 o superior."
    echo "📥 Descarga desde: https://nodejs.org/"
    exit 1
fi

# Verificar versión de Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 16 ]; then
    echo "❌ Node.js versión $NODE_VERSION detectada. Se requiere versión 16 o superior."
    exit 1
fi

echo "✅ Node.js $(node -v) detectado"

# Instalar dependencias del backend
echo "📦 Instalando dependencias del backend..."
cd backend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias del backend"
    exit 1
fi

echo "✅ Backend configurado correctamente"

# Instalar dependencias del frontend
echo "📦 Instalando dependencias del frontend..."
cd ../frontend
npm install

if [ $? -ne 0 ]; then
    echo "❌ Error al instalar dependencias del frontend"
    exit 1
fi

echo "✅ Frontend configurado correctamente"

# Verificar archivo de configuración
cd ../backend
if [ ! -f "config.env" ]; then
    echo "⚠️  Archivo config.env no encontrado. Creando archivo de ejemplo..."
    cat > config.env << EOF
GROQ_API_KEY=tu_api_key_de_groq_aqui
PORT=3001
NODE_ENV=development
DATABASE_URL=postgresql://usuario:password@localhost:5433/onkosdb
EOF
    echo "✅ Archivo config.env creado con plantilla"
    echo "⚠️  IMPORTANTE: Edita config.env y agrega tu API key de Groq"
else
    echo "✅ Archivo config.env encontrado"
fi

cd ..

echo ""
echo "🎉 ¡Instalación completada exitosamente!"
echo ""
echo "📋 Para ejecutar el proyecto:"
echo ""
echo "Terminal 1 - Backend:"
echo "  cd backend"
echo "  npm run dev"
echo ""
echo "Terminal 2 - Frontend:"
echo "  cd frontend"
echo "  npm run serve"
echo ""
echo "🌐 Acceso a la aplicación:"
echo "  Frontend: http://localhost:8080"
echo "  Backend API: http://localhost:3001"
echo ""
echo "🤖 El chatbot está configurado con la API key de Groq proporcionada"
echo ""
echo "📚 Para más información, consulta el README.md" 