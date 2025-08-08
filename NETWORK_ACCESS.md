# 🌐 Acceso desde Red Local - Onkos System

## 📡 Información de Red

- **IP de la máquina servidor:** `192.168.1.123`
- **Puerto Frontend:** `8080`
- **Puerto Backend:** `3001`

## 🚀 Cómo Iniciar el Sistema

### Opción 1: Script Automático (Recomendado)
```bash
./start-network.sh
```

### Opción 2: Inicio Manual

#### 1. Iniciar Backend
```bash
cd backend
npm install  # Solo la primera vez
npm start
```

#### 2. Iniciar Frontend (en otra terminal)
```bash
cd frontend
npm install  # Solo la primera vez
npm run serve
```

## 📱 URLs de Acceso

### Desde la máquina servidor:
- **Frontend:** http://localhost:8080
- **Backend API:** http://localhost:3001

### Desde otras PCs en la red:
- **Frontend:** http://192.168.1.123:8080
- **Backend API:** http://192.168.1.123:3001

## 🔧 Configuración de Firewall

Si tienes problemas de acceso desde otras PCs, verifica que los puertos estén abiertos:

### Ubuntu/Debian:
```bash
sudo ufw allow 8080
sudo ufw allow 3001
```

### CentOS/RHEL:
```bash
sudo firewall-cmd --permanent --add-port=8080/tcp
sudo firewall-cmd --permanent --add-port=3001/tcp
sudo firewall-cmd --reload
```

## 🛠️ Solución de Problemas

### Si no puedes acceder desde otra PC:

1. **Verificar conectividad:**
   ```bash
   ping 192.168.1.123
   ```

2. **Verificar puertos abiertos:**
   ```bash
   netstat -tuln | grep -E ":(8080|3001)"
   ```

3. **Verificar firewall:**
   ```bash
   sudo ufw status
   ```

4. **Probar conexión directa:**
   ```bash
   telnet 192.168.1.123 8080
   telnet 192.168.1.123 3001
   ```

### Si el frontend no carga el backend:

1. Verificar que el backend esté corriendo en `http://192.168.1.123:3001`
2. Verificar que CORS esté configurado correctamente
3. Revisar la consola del navegador para errores

## 📋 Comandos Útiles

### Verificar servicios corriendo:
```bash
ps aux | grep -E "(node|npm)"
```

### Ver puertos en uso:
```bash
netstat -tuln | grep LISTEN
```

### Detener todos los servicios:
```bash
pkill -f "node.*server.js"
pkill -f "vue-cli-service"
```

## 🔄 Reiniciar Servicios

Si necesitas reiniciar los servicios:

1. Detener con `Ctrl+C`
2. Ejecutar `./start-network.sh` nuevamente

O manualmente:
```bash
# Terminal 1
cd backend && npm start

# Terminal 2  
cd frontend && npm run serve
``` 