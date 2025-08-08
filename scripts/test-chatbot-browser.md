# 🧪 Prueba del Chatbot en el Navegador

## 🔍 Pasos para Diagnosticar el Problema

### 1. Abrir las Herramientas de Desarrollo
1. Abrir http://localhost:8080
2. Presionar F12 para abrir las herramientas de desarrollo
3. Ir a la pestaña "Console"

### 2. Probar el Flujo de Agendamiento
1. **Abrir el chatbot** (botón flotante)
2. **Escribir**: "Quiero agendar una cita"
3. **Seguir el flujo**:
   - Nombre: "Juan Pérez"
   - DNI: "12345678"
   - Teléfono: "+51 999 123 456"
   - Correo: "juan@email.com"
   - Fecha de nacimiento: "15/03/1985"
   - **Especialidad**: "Oncología Médica" ⚠️ **IMPORTANTE**
   - Fecha: "10/08/2025"
   - Hora: "10:00"
   - Motivo: "Consulta de rutina"
   - Confirmar: "Sí"

### 3. Observar los Logs
En la consola del navegador deberías ver:
```
📝 Especialidad guardada: Oncología Médica
🔍 Confirmando cita con especialidad: Oncología Médica
📝 Especialidad normalizada: Oncología Médica
🔍 Buscando médicos para especialidad: Oncología Médica
📊 Médicos encontrados: 1 [Array]
```

### 4. Si No Funciona
Si ves "No hay médicos disponibles", verificar:
- ¿La especialidad se guardó correctamente?
- ¿La URL de la API se está construyendo bien?
- ¿Hay errores en la consola?

## 🔧 Posibles Problemas

### Problema 1: Especialidad no se guarda correctamente
**Síntoma**: La especialidad aparece como undefined o vacía
**Solución**: Verificar que el usuario escriba exactamente "Oncología Médica"

### Problema 2: Error en la API
**Síntoma**: Error 404 o 500 en la consola
**Solución**: Verificar que el backend esté corriendo en puerto 3001

### Problema 3: Proxy no funciona
**Síntoma**: Error de conexión
**Solución**: Verificar que el frontend esté corriendo en puerto 8080

## 📋 Comandos de Verificación

```bash
# Verificar que el backend esté corriendo
curl -s http://localhost:3001/api/chatbot/medicos/Oncolog%C3%ADa%20M%C3%A9dica

# Verificar que el frontend esté corriendo
curl -s http://localhost:8080

# Verificar el proxy
curl -s http://localhost:8080/api/chatbot/medicos/Oncolog%C3%ADa%20M%C3%A9dica
```

## 🎯 Resultado Esperado

Si todo funciona correctamente, deberías ver:
1. ✅ Especialidad guardada correctamente
2. ✅ Médicos encontrados (1 médico)
3. ✅ Cita agendada exitosamente
4. ✅ Mensaje de confirmación con número de cita 