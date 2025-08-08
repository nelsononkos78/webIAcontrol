const axios = require('axios');

const testMedicosAPI = async () => {
  try {
    console.log('🧪 Probando API de médicos...\n');
    
    // Configurar axios para el backend
    const baseURL = 'http://localhost:3001';
    
    // Lista de especialidades para probar
    const especialidades = [
      'Oncología Médica',
      'Radioterapia', 
      'Cirugía Oncológica',
      'Psicología Oncológica',
      'Nutrición Oncológica',
      'Medicina Nuclear',
      'Hematología Oncológica'
    ];
    
    for (const especialidad of especialidades) {
      console.log(`🔍 Probando especialidad: "${especialidad}"`);
      
      try {
        const response = await axios.get(`${baseURL}/api/chatbot/medicos/${encodeURIComponent(especialidad)}`);
        
        console.log(`  ✅ Status: ${response.status}`);
        console.log(`  📊 Médicos encontrados: ${response.data.length}`);
        
        if (response.data.length > 0) {
          response.data.forEach(medico => {
            console.log(`    👨‍⚕️ ${medico.nombre} (${medico.especialidad_nombre})`);
          });
        } else {
          console.log(`    ❌ No se encontraron médicos`);
        }
        
      } catch (error) {
        console.log(`  ❌ Error: ${error.response?.status || error.code}`);
        if (error.response?.data) {
          console.log(`    📝 ${JSON.stringify(error.response.data)}`);
        }
      }
      
      console.log('');
    }
    
    // Probar con nombres parciales
    console.log('🔍 Probando con nombres parciales:');
    const parciales = ['Oncología', 'Radioterapia', 'Cirugía', 'Psicología', 'Nutrición'];
    
    for (const parcial of parciales) {
      try {
        const response = await axios.get(`${baseURL}/api/chatbot/medicos/${encodeURIComponent(parcial)}`);
        
        console.log(`  "${parcial}": ${response.data.length} médicos`);
        
        if (response.data.length > 0) {
          response.data.forEach(medico => {
            console.log(`    👨‍⚕️ ${medico.nombre} (${medico.especialidad_nombre})`);
          });
        }
        
      } catch (error) {
        console.log(`  ❌ Error con "${parcial}": ${error.response?.status || error.code}`);
      }
    }
    
  } catch (error) {
    console.error('❌ Error general:', error.message);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  testMedicosAPI();
} 