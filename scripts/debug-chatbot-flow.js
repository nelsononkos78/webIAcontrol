const axios = require('axios');

const debugChatbotFlow = async () => {
  try {
    console.log('🔍 Debuggeando flujo del chatbot...\n');
    
    // Configurar axios para usar el proxy del frontend
    axios.defaults.baseURL = 'http://localhost:8080';
    
    // Simular los datos que se guardan en el chatbot
    const appointmentData = {
      nombre: 'Juan Pérez',
      dni: '12345678',
      telefono: '+51 999 123 456',
      correo: 'juan@email.com',
      fecha_nacimiento: '1985-03-15',
      especialidad: 'Oncología Médica',
      fecha: '2025-08-10',
      hora: '10:00',
      motivo: 'Consulta de rutina'
    };
    
    console.log('📋 Datos de la cita:');
    console.log(JSON.stringify(appointmentData, null, 2));
    console.log('');
    
    // Simular la función crearCita del chatbot
    console.log('🤖 Simulando función crearCita...');
    
    try {
      console.log('🔍 Buscando médicos para especialidad:', appointmentData.especialidad);
      console.log('📋 Datos completos de la cita:', appointmentData);
      
      // Construir la URL como lo hace el chatbot
      const url = `/api/chatbot/medicos/${encodeURIComponent(appointmentData.especialidad)}`;
      console.log('🔗 URL de la API:', url);
      
      // Hacer la llamada como lo hace el chatbot
      const medicosResponse = await axios.get(url);
      const medicos = medicosResponse.data;
      
      console.log('📊 Médicos encontrados:', medicos.length);
      console.log('📊 Response completa:', medicosResponse);
      console.log('📋 Datos de médicos:', medicos);
      
      if (medicos.length === 0) {
        console.log('❌ No se encontraron médicos para esta especialidad');
        console.log('💡 Esto es lo que está causando el error en el chatbot');
        return;
      }
      
      const medico = medicos[0];
      console.log('🎯 Médico seleccionado:', medico);
      
      // Simular verificación de disponibilidad
      console.log('\n🕐 Verificando disponibilidad...');
      const disponibilidadResponse = await axios.post('/api/chatbot/verificar-disponibilidad', {
        fecha: appointmentData.fecha,
        hora: appointmentData.hora,
        medico_id: medico.id
      });
      
      console.log('📅 Disponibilidad:', disponibilidadResponse.data);
      
      if (disponibilidadResponse.data.disponible) {
        console.log('✅ Horario disponible, procediendo con la cita...');
        
        // Simular creación de paciente
        console.log('\n👤 Creando paciente...');
        const pacienteResponse = await axios.post('/api/chatbot/crear-paciente', {
          nombre: appointmentData.nombre,
          dni: appointmentData.dni,
          telefono: appointmentData.telefono,
          correo: appointmentData.correo,
          fecha_nacimiento: appointmentData.fecha_nacimiento
        });
        
        console.log('✅ Paciente creado:', pacienteResponse.data);
        
        // Simular creación de cita
        console.log('\n📅 Creando cita...');
        const citaResponse = await axios.post('/api/chatbot/agendar-cita', {
          paciente_id: pacienteResponse.data.paciente.id,
          medico_id: medico.id,
          fecha: appointmentData.fecha,
          hora: appointmentData.hora,
          motivo: appointmentData.motivo,
          duracion: 30
        });
        
        console.log('✅ Cita creada exitosamente!');
        console.log('📋 Cita:', citaResponse.data);
        
      } else {
        console.log('❌ Horario no disponible');
      }
      
    } catch (error) {
      console.log('❌ Error en el flujo:', error.response?.status || error.code);
      if (error.response?.data) {
        console.log('📝 Error details:', JSON.stringify(error.response.data, null, 2));
      }
      console.log('🔍 Error completo:', error.message);
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  debugChatbotFlow();
} 