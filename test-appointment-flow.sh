#!/bin/bash

echo "🧪 Probando flujo completo de agendamiento de citas..."
echo "=================================================="

# 1. Crear paciente
echo "1. Creando paciente..."
PACIENTE_RESPONSE=$(curl -s -X POST http://localhost:3001/api/chatbot/crear-paciente \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "dni": "12345678",
    "telefono": "999888777",
    "correo": "juan.perez@email.com",
    "fecha_nacimiento": "1985-03-15"
  }')

echo "Respuesta creación paciente: $PACIENTE_RESPONSE"

# Extraer ID del paciente
PACIENTE_ID=$(echo $PACIENTE_RESPONSE | grep -o '"id":[0-9]*' | cut -d':' -f2)
echo "ID del paciente: $PACIENTE_ID"

# 2. Obtener médico
echo "2. Obteniendo médico..."
MEDICO_RESPONSE=$(curl -s -X GET "http://localhost:3001/api/chatbot/medicos/Cirugía%20Oncológica")
echo "Respuesta médico: $MEDICO_RESPONSE"

# Extraer ID del médico
MEDICO_ID=$(echo $MEDICO_RESPONSE | grep -o '"id":[0-9]*' | cut -d':' -f2 | head -1)
echo "ID del médico: $MEDICO_ID"

# 3. Verificar disponibilidad
echo "3. Verificando disponibilidad..."
DISPONIBILIDAD_RESPONSE=$(curl -s -X POST http://localhost:3001/api/chatbot/verificar-disponibilidad \
  -H "Content-Type: application/json" \
  -d "{
    \"fecha\": \"2025-08-06\",
    \"hora\": \"09:00\",
    \"medico_id\": $MEDICO_ID
  }")

echo "Respuesta disponibilidad: $DISPONIBILIDAD_RESPONSE"

# 4. Agendar cita
echo "4. Agendando cita..."
CITA_RESPONSE=$(curl -s -X POST http://localhost:3001/api/chatbot/agendar-cita \
  -H "Content-Type: application/json" \
  -d "{
    \"paciente_id\": $PACIENTE_ID,
    \"medico_id\": $MEDICO_ID,
    \"fecha\": \"2025-08-06\",
    \"hora\": \"09:00\",
    \"motivo\": \"Consulta inicial\",
    \"duracion\": 30
  }")

echo "Respuesta agendamiento: $CITA_RESPONSE"

# 5. Verificar cita en el sistema
echo "5. Verificando cita en el sistema..."
CITAS_RESPONSE=$(curl -s -H "Authorization: Bearer admin-token-123" "http://localhost:3001/api/admin/citas")
echo "Citas en el sistema: $CITAS_RESPONSE"

echo "=================================================="
echo "✅ Prueba completada" 