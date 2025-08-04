#!/bin/bash

echo "🚀 Despliegue con Fine-grained Token"
echo "===================================="
echo ""

# Verificar si se proporcionó el token
if [ -z "$1" ]; then
    echo "❌ Error: Debes proporcionar tu token de GitHub"
    echo ""
    echo "📝 Uso: ./deploy-with-fine-grained-token.sh TU_TOKEN_AQUI"
    echo ""
    echo "🔧 Para obtener tu token:"
    echo "   1. Ve a GitHub.com → Settings → Developer settings → Personal access tokens"
    echo "   2. Click en 'Generate new token (classic)'"
    echo "   3. Selecciona 'repo' y 'workflow'"
    echo "   4. Copia el token generado"
    echo ""
    echo "💡 Ejemplo: ./deploy-with-fine-grained-token.sh github_pat_xxxxxxxxxxxxxxxxxxxx"
    exit 1
fi

TOKEN=$1

echo "✅ Token proporcionado"
echo "🔄 Configurando repositorio remoto..."

# Limpiar configuración anterior
git remote remove origin

# Configurar el repositorio remoto con el token fine-grained
git remote add origin "https://${TOKEN}@github.com/nelsononkos78/webIAcontrol.git"

echo "📤 Subiendo rama main..."
git push -u origin main

if [ $? -eq 0 ]; then
    echo "✅ Rama main subida exitosamente"
else
    echo "❌ Error al subir la rama main"
    echo ""
    echo "🔧 Soluciones posibles:"
    echo "   1. Verificar que el token tenga permisos de 'Contents' en el repositorio"
    echo "   2. Crear un token clásico en lugar de fine-grained"
    echo "   3. Verificar que el repositorio exista y tengas permisos"
    echo ""
    echo "📖 Ver instrucciones en: create-classic-token.md"
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