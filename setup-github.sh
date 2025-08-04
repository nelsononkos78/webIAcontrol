#!/bin/bash

echo "🚀 Configuración de GitHub para Onkos System"
echo "=============================================="
echo ""

echo "📋 Pasos para configurar el acceso a GitHub:"
echo ""
echo "1️⃣  Crear un Token de Acceso Personal (PAT):"
echo "   - Ve a GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)"
echo "   - Click en 'Generate new token (classic)'"
echo "   - Dale un nombre como 'Onkos System Access'"
echo "   - Selecciona los scopes: repo, workflow"
echo "   - Copia el token generado"
echo ""

echo "2️⃣  Configurar el repositorio remoto:"
echo "   - Ejecuta: git remote set-url origin https://[TU_TOKEN]@github.com/nelsononkos78/webIAcontrol.git"
echo "   - Reemplaza [TU_TOKEN] con el token que generaste"
echo ""

echo "3️⃣  Subir el código:"
echo "   - Ejecuta: git push -u origin main"
echo ""

echo "4️⃣  Crear la rama dev-IA:"
echo "   - Ejecuta: git checkout -b dev-IA"
echo "   - Ejecuta: git push -u origin dev-IA"
echo ""

echo "🔧 Alternativa con SSH (si tienes claves configuradas):"
echo "   - Ejecuta: ssh-keygen -t ed25519 -C 'tu-email@example.com'"
echo "   - Agrega la clave pública a GitHub: Settings → SSH and GPG keys"
echo "   - Ejecuta: git remote set-url origin git@github.com:nelsononkos78/webIAcontrol.git"
echo ""

echo "📝 Comandos rápidos (después de configurar el token):"
echo "   git remote set-url origin https://[TU_TOKEN]@github.com/nelsononkos78/webIAcontrol.git"
echo "   git push -u origin main"
echo "   git checkout -b dev-IA"
echo "   git push -u origin dev-IA"
echo ""

echo "✅ ¡Listo! Tu proyecto estará en GitHub con las dos ramas configuradas." 