#!/bin/bash

echo "🚀 Asistente de Configuración de GitHub"
echo "======================================="
echo ""

echo "📋 Estado Actual:"
echo "   ✅ Repositorio: https://github.com/nelsononkos78/webIAcontrol"
echo "   ✅ Código local: Completo y listo"
echo "   ❌ Token actual: Sin permisos de escritura"
echo ""

echo "🔧 Opciones Disponibles:"
echo ""
echo "1️⃣  Token Clásico (Recomendado)"
echo "   ✅ Fácil de configurar"
echo "   ✅ Compatible con todos los comandos git"
echo "   ❌ Expira cada 90 días"
echo "   📖 Ver instrucciones: cat create-classic-token.md"
echo ""

echo "2️⃣  SSH Keys"
echo "   ✅ Más seguro"
echo "   ✅ No expira"
echo "   ❌ Configuración más compleja"
echo "   📖 Ver instrucciones: cat setup-ssh-keys.md"
echo ""

echo "3️⃣  GitHub CLI"
echo "   ✅ Interfaz moderna"
echo "   ✅ Autenticación automática"
echo "   ❌ Requiere instalación adicional"
echo ""

echo "🎯 Recomendación:"
echo "   Para uso inmediato: Opción 1 (Token Clásico)"
echo "   Para uso a largo plazo: Opción 2 (SSH Keys)"
echo ""

read -p "¿Qué opción prefieres? (1/2/3): " choice

case $choice in
    1)
        echo ""
        echo "🔑 Configurando Token Clásico..."
        echo ""
        echo "📋 Pasos a seguir:"
        echo "   1. Ve a GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)"
        echo "   2. Click en 'Generate new token (classic)'"
        echo "   3. Selecciona permisos: repo, workflow"
        echo "   4. Copia el token (formato: ghp_xxxxxxxxxxxxxxxxxxxx)"
        echo "   5. Ejecuta: ./deploy-to-github.sh TU_TOKEN"
        echo ""
        echo "📖 Instrucciones detalladas:"
        cat create-classic-token.md
        ;;
    2)
        echo ""
        echo "🔑 Configurando SSH Keys..."
        echo ""
        echo "📋 Pasos a seguir:"
        echo "   1. Generar clave SSH: ssh-keygen -t ed25519 -C 'tu-email@example.com'"
        echo "   2. Agregar clave a GitHub: Settings → SSH and GPG keys"
        echo "   3. Probar conexión: ssh -T git@github.com"
        echo "   4. Configurar repositorio: git remote set-url origin git@github.com:nelsononkos78/webIAcontrol.git"
        echo "   5. Hacer push: git push -u origin main"
        echo ""
        echo "📖 Instrucciones detalladas:"
        cat setup-ssh-keys.md
        ;;
    3)
        echo ""
        echo "🔧 Configurando GitHub CLI..."
        echo ""
        echo "📋 Pasos a seguir:"
        echo "   1. Instalar GitHub CLI: sudo apt install gh (Ubuntu/Debian)"
        echo "   2. Autenticarse: gh auth login"
        echo "   3. Configurar repositorio: gh repo set-default nelsononkos78/webIAcontrol"
        echo "   4. Hacer push: git push -u origin main"
        echo ""
        echo "📖 Documentación: https://cli.github.com/"
        ;;
    *)
        echo ""
        echo "❌ Opción no válida"
        echo "   Ejecuta el script nuevamente y selecciona 1, 2 o 3"
        ;;
esac

echo ""
echo "🎉 ¡Configuración completada!"
echo ""
echo "📋 Próximos pasos:"
echo "   1. Seguir las instrucciones de la opción elegida"
echo "   2. Subir el código a GitHub"
echo "   3. Crear la rama dev-IA"
echo "   4. Verificar que todo funcione correctamente"
echo ""
echo "🔗 Enlaces útiles:"
echo "   📖 README: https://github.com/nelsononkos78/webIAcontrol/blob/main/README-GITHUB.md"
echo "   🏥 Proyecto: Onkos Instituto del Cáncer"
echo ""
echo "🚀 ¡Tu proyecto estará pronto en GitHub!" 