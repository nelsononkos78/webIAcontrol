const axios = require('axios');

// Configurar axios para usar el proxy del frontend
axios.defaults.baseURL = 'http://localhost:8080';

const simulateChatbot = async () => {
  try {
    console.log('🤖 Simulando flujo del chatbot...\n');
    
    // Simular el proceso de agendamiento paso a paso
    const appointmentData = {
      nombre: 'Juan Pérez',
      dni: '12345678',
      telefono: '+51 999 123 456',
      correo: 'juan.perez@email.com',
      fecha_nacimiento: '1985-03-15',
      especialidad: 'Oncología Médica',
      fecha: '2025-08-10',
      hora: '10:00',
      motivo: 'Consulta de rutina'
    };
    
    console.log('📋 Datos de la cita:');
    console.log(`  Especialidad: "${appointmentData.especialidad}"`);
    console.log(`  Fecha: ${appointmentData.fecha}`);
    console.log(`  Hora: ${appointmentData.hora}`);
    console.log('');
    
    // Paso 1: Buscar médicos por especialidad
    console.log('🔍 Paso 1: Buscando médicos...');
    try {
      const medicosResponse = await axios.get(`/api/chatbot/medicos/${encodeURIComponent(appointmentData.especialidad)}`);
      console.log(`  ✅ Status: ${medicosResponse.status}`);
      console.log(`  📊 Médicos encontrados: ${medicosResponse.data.length}`);
      
      if (medicosResponse.data.length > 0) {
        medicosResponse.data.forEach(medico => {
          console.log(`    👨‍⚕️ ${medico.nombre} (${medico.especialidad_nombre})`);
        });
        
        const medico = medicosResponse.data[0];
        console.log(`  🎯 Médico seleccionado: ${medico.nombre}`);
        
        // Paso 2: Verificar disponibilidad
        console.log('\n🕐 Paso 2: Verificando disponibilidad...');
        try {
          const disponibilidadResponse = await axios.post('/api/chatbot/verificar-disponibilidad', {
            fecha: appointmentData.fecha,
            hora: appointmentData.hora,
            medico_id: medico.id
          });
          
          console.log(`  ✅ Status: ${disponibilidadResponse.status}`);
          console.log(`  📅 Disponible: ${disponibilidadResponse.data.disponible ? 'Sí' : 'No'}`);
          
          if (disponibilidadResponse.data.disponible) {
            console.log('  ✅ Horario disponible, procediendo con la cita...');
            
            // Paso 3: Crear paciente (simulado)
            console.log('\n👤 Paso 3: Creando paciente...');
            try {
              const pacienteResponse = await axios.post('/api/chatbot/crear-paciente', {
                nombre: appointmentData.nombre,
                dni: appointmentData.dni,
                telefono: appointmentData.telefono,
                correo: appointmentData.correo,
                fecha_nacimiento: appointmentData.fecha_nacimiento
              });
              
              console.log(`  ✅ Paciente creado: ${pacienteResponse.data.paciente.nombre}`);
              
              // Paso 4: Crear cita
              console.log('\n📅 Paso 4: Creando cita...');
              try {
                const citaResponse = await axios.post('/api/chatbot/agendar-cita', {
                  paciente_id: pacienteResponse.data.paciente.id,
                  medico_id: medico.id,
                  fecha: appointmentData.fecha,
                  hora: appointmentData.hora,
                  motivo: appointmentData.motivo,
                  duracion: 30
                });
                
                console.log(`  ✅ Cita creada exitosamente!`);
                console.log(`  📋 Número de cita: #${citaResponse.data.cita.id}`);
                console.log(`  👨‍⚕️ Médico: ${medico.nombre}`);
                console.log(`  📅 Fecha: ${appointmentData.fecha}`);
                console.log(`  🕐 Hora: ${appointmentData.hora}`);
                
              } catch (error) {
                console.log(`  ❌ Error creando cita: ${error.response?.status || error.code}`);
                if (error.response?.data) {
                  console.log(`    📝 ${JSON.stringify(error.response.data)}`);
                }
              }
              
            } catch (error) {
              console.log(`  ❌ Error creando paciente: ${error.response?.status || error.code}`);
              if (error.response?.data) {
                console.log(`    📝 ${JSON.stringify(error.response.data)}`);
              }
            }
            
          } else {
            console.log('  ❌ Horario no disponible');
          }
          
        } catch (error) {
          console.log(`  ❌ Error verificando disponibilidad: ${error.response?.status || error.code}`);
          if (error.response?.data) {
            console.log(`    📝 ${JSON.stringify(error.response.data)}`);
          }
        }
        
      } else {
        console.log('  ❌ No se encontraron médicos para esta especialidad');
        console.log('  💡 Esto es lo que está causando el error en el chatbot');
      }
      
    } catch (error) {
      console.log(`  ❌ Error buscando médicos: ${error.response?.status || error.code}`);
      if (error.response?.data) {
        console.log(`    📝 ${JSON.stringify(error.response.data)}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  simulateChatbot();
} 