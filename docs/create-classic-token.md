# 🔑 Crear Token Clásico de GitHub

## 📋 Instrucciones Paso a Paso

### 1️⃣ Acceder a GitHub
1. Ve a [GitHub.com](https://github.com)
2. Inicia sesión con tu cuenta `nelsononkos78`

### 2️⃣ Ir a Configuración de Tokens
1. Click en tu avatar (esquina superior derecha)
2. Selecciona **Settings**
3. En el menú lateral izquierdo, busca **Developer settings**
4. Click en **Personal access tokens**
5. Click en **Tokens (classic)**

### 3️⃣ Generar Nuevo Token
1. Click en **Generate new token (classic)**
2. Si te pide confirmar contraseña, ingrésala

### 4️⃣ Configurar el Token
- **Note**: `Onkos System Access`
- **Expiration**: `90 days` (recomendado)
- **Scopes**: Selecciona estos permisos:
  - ✅ `repo` (Full control of private repositories)
  - ✅ `workflow` (Update GitHub Action workflows)

### 5️⃣ Generar y Copiar
1. Click en **Generate token**
2. **¡IMPORTANTE!** Copia el token inmediatamente
3. El token se verá así: `ghp_xxxxxxxxxxxxxxxxxxxx`

### 6️⃣ Usar el Token
```bash
# Ejecutar el script con el nuevo token
./deploy-to-github.sh ghp_xxxxxxxxxxxxxxxxxxxx
```

## 🔍 Diferencias entre Tokens

### Fine-grained Token (Actual)
- Formato: `github_pat_...`
- Más restrictivo
- Problemas con algunos comandos git

### Classic Token (Necesario)
- Formato: `ghp_...`
- Más permisivo
- Compatible con todos los comandos git

## ⚠️ Notas Importantes

1. **Seguridad**: No compartas el token
2. **Expiración**: Los tokens tienen fecha de vencimiento
3. **Permisos**: Solo los necesarios (repo, workflow)
4. **Backup**: Guarda el token en un lugar seguro

## 🚀 Después de Crear el Token

Una vez que tengas el token clásico:

```bash
# Limpiar configuración anterior
git remote remove origin

# Ejecutar despliegue con nuevo token
./deploy-to-github.sh TU_NUEVO_TOKEN_CLASICO
``` 