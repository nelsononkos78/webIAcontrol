const { query, testConnection } = require('./database');

const resetDatabase = async () => {
  try {
    console.log('🔄 Reiniciando base de datos Onkos...');
    
    // Verificar conexión
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('✅ Conexión establecida, limpiando datos...');
    
    // Limpiar datos existentes (en orden inverso a las dependencias)
    console.log('🧹 Limpiando datos existentes...');
    
    await query('DELETE FROM usuario_rol');
    await query('DELETE FROM usuarios');
    await query('DELETE FROM roles');
    await query('DELETE FROM medicos');
    await query('DELETE FROM pacientes');
    await query('DELETE FROM especialidades');
    await query('DELETE FROM centro_medico');
    
    console.log('✅ Datos limpiados, reinicializando...');
    
    // Importar y ejecutar la inicialización
    const { initDatabase } = require('./init-database');
    await initDatabase();
    
  } catch (error) {
    console.error('❌ Error reiniciando base de datos:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  resetDatabase();
}

module.exports = { resetDatabase }; 