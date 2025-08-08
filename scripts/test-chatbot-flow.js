const axios = require('axios');

const testChatbotFlow = async () => {
  try {
    console.log('🧪 Simulando flujo completo del chatbot...\n');
    
    const baseURL = 'http://localhost:3001';
    
    // Simular el proceso de agendamiento
    const especialidades = [
      'Oncología Médica',
      'Radioterapia',
      'Cirugía Oncológica',
      'Psicología Oncológica'
    ];
    
    for (const especialidad of especialidades) {
      console.log(`\n🔍 Probando especialidad: "${especialidad}"`);
      
      try {
        // Simular la llamada que hace el frontend
        const url = `${baseURL}/api/chatbot/medicos/${encodeURIComponent(especialidad)}`;
        console.log(`  📡 URL: ${url}`);
        
        const response = await axios.get(url);
        
        console.log(`  ✅ Status: ${response.status}`);
        console.log(`  📊 Médicos encontrados: ${response.data.length}`);
        
        if (response.data.length > 0) {
          response.data.forEach(medico => {
            console.log(`    👨‍⚕️ ${medico.nombre} (${medico.especialidad_nombre})`);
          });
          
          // Simular verificación de disponibilidad
          const medico = response.data[0];
          console.log(`  🕐 Verificando disponibilidad para: ${medico.nombre}`);
          
          const disponibilidadResponse = await axios.post(`${baseURL}/api/chatbot/verificar-disponibilidad`, {
            fecha: '2025-08-10',
            hora: '10:00',
            medico_id: medico.id
          });
          
          console.log(`  📅 Disponibilidad: ${disponibilidadResponse.data.disponible ? '✅ Disponible' : '❌ Ocupado'}`);
          
        } else {
          console.log(`    ❌ No se encontraron médicos`);
        }
        
      } catch (error) {
        console.log(`  ❌ Error: ${error.response?.status || error.code}`);
        if (error.response?.data) {
          console.log(`    📝 ${JSON.stringify(error.response.data)}`);
        }
      }
    }
    
    // Probar con diferentes formatos de especialidad
    console.log('\n🔍 Probando con diferentes formatos:');
    const formatos = [
      'Oncología',
      'Oncología Médica',
      'oncología médica',
      'ONCOLOGÍA MÉDICA'
    ];
    
    for (const formato of formatos) {
      try {
        const response = await axios.get(`${baseURL}/api/chatbot/medicos/${encodeURIComponent(formato)}`);
        console.log(`  "${formato}": ${response.data.length} médicos`);
      } catch (error) {
        console.log(`  ❌ Error con "${formato}": ${error.response?.status || error.code}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  testChatbotFlow();
} 