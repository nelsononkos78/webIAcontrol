const { query, testConnection } = require('./database');

const updatePacientesTable = async () => {
  try {
    console.log('🔧 Actualizando estructura de tabla pacientes...');
    
    // Verificar conexión
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('✅ Conexión establecida, verificando estructura...');
    
    // Verificar si la columna estado existe
    const checkColumn = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'pacientes' AND column_name = 'estado'
    `);
    
    if (checkColumn.rows.length === 0) {
      console.log('📋 Agregando columna estado a la tabla pacientes...');
      
      // Agregar columna estado
      await query(`
        ALTER TABLE pacientes 
        ADD COLUMN estado text DEFAULT 'activo'
      `);
      
      console.log('✅ Columna estado agregada exitosamente');
      
      // Actualizar registros existentes
      console.log('🔄 Actualizando registros existentes...');
      await query(`
        UPDATE pacientes 
        SET estado = CASE 
          WHEN estado_vital = 'vivo' THEN 'activo'
          ELSE 'inactivo'
        END
      `);
      
      console.log('✅ Registros actualizados');
    } else {
      console.log('ℹ️  La columna estado ya existe');
    }
    
    // Mostrar estructura final
    console.log('\n📊 Estructura actual de la tabla pacientes:');
    const structure = await query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'pacientes' 
      ORDER BY ordinal_position
    `);
    
    console.table(structure.rows);
    
    console.log('\n🎉 ¡Actualización completada exitosamente!');
    
  } catch (error) {
    console.error('❌ Error actualizando tabla:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  updatePacientesTable();
}

module.exports = { updatePacientesTable }; 