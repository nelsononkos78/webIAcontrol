const { query, testConnection } = require('./database');

const updateCitasTable = async () => {
  try {
    console.log('🔧 Actualizando estructura de tabla citas...');
    
    // Verificar conexión
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('✅ Conexión establecida, verificando estructura...');
    
    // Verificar si la columna duracion existe
    const checkColumn = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'citas' AND column_name = 'duracion'
    `);
    
    if (checkColumn.rows.length === 0) {
      console.log('📋 Agregando columna duracion a la tabla citas...');
      
      // Agregar columna duracion
      await query(`
        ALTER TABLE citas 
        ADD COLUMN duracion INTEGER DEFAULT 30
      `);
      
      console.log('✅ Columna duracion agregada exitosamente');
    } else {
      console.log('ℹ️  La columna duracion ya existe');
    }
    
    // Verificar si la columna fecha_creacion existe
    const checkFechaCreacion = await query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_name = 'citas' AND column_name = 'fecha_creacion'
    `);
    
    if (checkFechaCreacion.rows.length === 0) {
      console.log('📋 Agregando columna fecha_creacion a la tabla citas...');
      
      // Agregar columna fecha_creacion
      await query(`
        ALTER TABLE citas 
        ADD COLUMN fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      `);
      
      console.log('✅ Columna fecha_creacion agregada exitosamente');
    } else {
      console.log('ℹ️  La columna fecha_creacion ya existe');
    }
    
    // Mostrar estructura final
    console.log('\n📊 Estructura actual de la tabla citas:');
    const structure = await query(`
      SELECT column_name, data_type, is_nullable, column_default
      FROM information_schema.columns 
      WHERE table_name = 'citas' 
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
  updateCitasTable();
}

module.exports = { updateCitasTable }; 