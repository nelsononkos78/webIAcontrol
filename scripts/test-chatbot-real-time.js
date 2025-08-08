const axios = require('axios');

const testChatbotRealTime = async () => {
  try {
    console.log('🤖 Probando chatbot en tiempo real...\n');
    
    // Configurar axios para usar el proxy del frontend
    axios.defaults.baseURL = 'http://localhost:8080';
    
    // Simular el flujo completo del chatbot
    const testData = {
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
    
    console.log('📋 Datos de prueba:');
    console.log(`  Especialidad: "${testData.especialidad}"`);
    console.log(`  URL codificada: ${encodeURIComponent(testData.especialidad)}`);
    console.log('');
    
    // Paso 1: Probar la API directamente
    console.log('🔍 Paso 1: Probando API directamente...');
    try {
      const url = `/api/chatbot/medicos/${encodeURIComponent(testData.especialidad)}`;
      console.log(`  📡 URL: ${url}`);
      
      const response = await axios.get(url);
      console.log(`  ✅ Status: ${response.status}`);
      console.log(`  📊 Médicos encontrados: ${response.data.length}`);
      
      if (response.data.length > 0) {
        response.data.forEach(medico => {
          console.log(`    👨‍⚕️ ${medico.nombre} (${medico.especialidad_nombre})`);
        });
      } else {
        console.log('    ❌ No se encontraron médicos');
      }
      
    } catch (error) {
      console.log(`  ❌ Error: ${error.response?.status || error.code}`);
      if (error.response?.data) {
        console.log(`    📝 ${JSON.stringify(error.response.data)}`);
      }
    }
    
    console.log('');
    
    // Paso 2: Probar con diferentes codificaciones
    console.log('🔍 Paso 2: Probando diferentes codificaciones...');
    const codificaciones = [
      'Oncología Médica',
      'Oncologia Medica',
      'Oncología',
      'Oncologia'
    ];
    
    for (const cod of codificaciones) {
      try {
        const url = `/api/chatbot/medicos/${encodeURIComponent(cod)}`;
        const response = await axios.get(url);
        console.log(`  "${cod}": ${response.data.length} médicos`);
      } catch (error) {
        console.log(`  ❌ Error con "${cod}": ${error.response?.status || error.code}`);
      }
    }
    
    console.log('');
    
    // Paso 3: Probar el endpoint de chat
    console.log('🔍 Paso 3: Probando endpoint de chat...');
    try {
      const chatResponse = await axios.post('/api/chat', {
        message: 'Quiero agendar una cita',
        conversationHistory: []
      });
      
      console.log(`  ✅ Chat response: ${chatResponse.data.response}`);
      
    } catch (error) {
      console.log(`  ❌ Error en chat: ${error.response?.status || error.code}`);
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  testChatbotRealTime();
} 