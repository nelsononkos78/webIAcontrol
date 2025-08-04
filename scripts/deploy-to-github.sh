#!/bin/bash

echo "🚀 Despliegue Automático a GitHub"
echo "=================================="
echo ""

# Verificar si se proporcionó el token
if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar tu token de GitHub"
    echo ""
    echo "📝 Uso: ./deploy-to-github.sh TU_TOKEN_AQUI"
    echo ""
    echo "🔧 Para obtener tu token:"
    echo "   1. Ve a GitHub.com → Settings → Developer settings → Personal access tokens"
    echo "   2. Click en 'Generate new token (classic)'"
    echo "   3. Selecciona 'repo' y 'workflow'"
    echo "   4. Copia el token generado"
    echo ""
    echo "💡 Ejemplo: ./deploy-to-github.sh ghp_xxxxxxxxxxxxxxxxxxxx"
    exit 1
fi

TOKEN=$1
REPO_URL="https://${TOKEN}@github.com/nelsononkos78/webIAcontrol.git"

echo "✅ Token proporcionado"
echo "🔄 Configurando repositorio remoto..."

# Configurar el repositorio remoto con el token
git remote set-url origin $REPO_URL

echo "📤 Subiendo rama main..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Rama main subida exitosamente"
else
    echo "❌ Error al subir la rama main"
    exit 1
fi

echo "🌿 Creando rama dev-IA..."
git checkout -b dev-IA

echo "📤 Subiendo rama dev-IA..."
git push -u origin dev-IA

if [ $? -eq 0 ]; then
    echo "✅ Rama dev-IA subida exitosamente"
else
    echo "❌ Error al subir la rama dev-IA"
    exit 1
fi

echo ""
echo "🎉 ¡Despliegue completado exitosamente!"
echo ""
echo "📋 Resumen:"
echo "   ✅ Repositorio: https://github.com/nelsononkos78/webIAcontrol"
echo "   ✅ Rama main: Código estable"
echo "   ✅ Rama dev-IA: Desarrollo activo"
echo ""
echo "🔗 Enlaces útiles:"
echo "   📖 README: https://github.com/nelsononkos78/webIAcontrol/blob/main/README-GITHUB.md"
echo "   🏥 Proyecto: Onkos Instituto del Cáncer"
echo ""
echo "🚀 ¡Tu proyecto está ahora en GitHub!" 