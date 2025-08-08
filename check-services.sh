#!/bin/bash

echo "🔍 Verificando estado de Onkos System..."
echo ""

# Verificar si los servicios están corriendo
echo "📊 Estado de los servicios:"

# Backend
if curl -s http://localhost:3001/api/health > /dev/null; then
    echo "✅ Backend (puerto 3001): FUNCIONANDO"
else
    echo "❌ Backend (puerto 3001): NO RESPONDE"
fi

# Frontend
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Frontend (puerto 8080): FUNCIONANDO"
else
    echo "❌ Frontend (puerto 8080): NO RESPONDE"
fi

echo ""

# Verificar puertos en uso
echo "🔌 Puertos en uso:"
netstat -tuln | grep -E ":(8080|3001)" | while read line; do
    echo "   $line"
done

echo ""

# Información de red
echo "🌐 Información de red:"
echo "   • IP local: $(hostname -I | awk '{print $1}')"
echo "   • URLs de acceso:"
echo "     - Frontend: http://192.168.1.123:8080"
echo "     - Backend: http://192.168.1.123:3001"

echo ""

# Probar conectividad desde red
echo "🔗 Probando conectividad desde red:"
if curl -s --connect-timeout 5 http://192.168.1.123:8080 > /dev/null; then
    echo "✅ Frontend accesible desde red"
else
    echo "❌ Frontend no accesible desde red"
fi

if curl -s --connect-timeout 5 http://192.168.1.123:3001/api/health > /dev/null; then
    echo "✅ Backend accesible desde red"
else
    echo "❌ Backend no accesible desde red"
fi

echo ""
echo "📱 Para acceder desde otras PCs:"
echo "   • Abrir navegador y visitar: http://192.168.1.123:8080" 