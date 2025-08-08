const { query, testConnection } = require('../backend/database');

const debugMedicos = async () => {
  try {
    console.log('🔍 Diagnosticando problema con médicos y especialidades...\n');
    
    // Verificar conexión
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('✅ Conexión establecida\n');
    
    // 1. Verificar especialidades disponibles
    console.log('🏥 ESPECIALIDADES DISPONIBLES:');
    const especialidades = await query('SELECT id, nombre FROM especialidades ORDER BY id');
    especialidades.rows.forEach(esp => {
      console.log(`  ID: ${esp.id} - ${esp.nombre}`);
    });
    console.log('');
    
    // 2. Verificar médicos disponibles
    console.log('👨‍⚕️ MÉDICOS DISPONIBLES:');
    const medicos = await query(`
      SELECT m.id, m.nombre, m.estado, e.nombre as especialidad
      FROM medicos m
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      ORDER BY m.nombre
    `);
    medicos.rows.forEach(med => {
      console.log(`  ID: ${med.id} - ${med.nombre} (${med.especialidad || 'Sin especialidad'}) - Estado: ${med.estado}`);
    });
    console.log('');
    
    // 3. Probar búsqueda por especialidad
    console.log('🔍 PRUEBAS DE BÚSQUEDA:');
    const especialidadesTest = ['Oncología Médica', 'Radioterapia', 'Cirugía Oncológica'];
    
    for (const esp of especialidadesTest) {
      console.log(`\nBuscando médicos para: "${esp}"`);
      
      // Prueba 1: Búsqueda exacta
      const exacta = await query(`
        SELECT m.id, m.nombre, e.nombre as especialidad
        FROM medicos m
        LEFT JOIN especialidades e ON m.especialidad_id = e.id
        WHERE e.nombre = $1 AND m.estado = 'activo'
      `, [esp]);
      
      console.log(`  Búsqueda exacta: ${exacta.rows.length} médicos encontrados`);
      
      // Prueba 2: Búsqueda con LIKE
      const like = await query(`
        SELECT m.id, m.nombre, e.nombre as especialidad
        FROM medicos m
        LEFT JOIN especialidades e ON m.especialidad_id = e.id
        WHERE LOWER(e.nombre) LIKE LOWER($1) AND m.estado = 'activo'
      `, [`%${esp}%`]);
      
      console.log(`  Búsqueda LIKE: ${like.rows.length} médicos encontrados`);
      
      // Prueba 3: Búsqueda con ILIKE (PostgreSQL)
      const ilike = await query(`
        SELECT m.id, m.nombre, e.nombre as especialidad
        FROM medicos m
        LEFT JOIN especialidades e ON m.especialidad_id = e.id
        WHERE e.nombre ILIKE $1 AND m.estado = 'activo'
      `, [`%${esp}%`]);
      
      console.log(`  Búsqueda ILIKE: ${ilike.rows.length} médicos encontrados`);
      
      if (ilike.rows.length > 0) {
        ilike.rows.forEach(med => {
          console.log(`    - ${med.nombre} (${med.especialidad})`);
        });
      }
    }
    
    // 4. Verificar la consulta actual del servidor
    console.log('\n🔧 CONSULTA ACTUAL DEL SERVIDOR:');
    console.log(`
      SELECT m.id, m.nombre, m.especialidad_id, e.nombre as especialidad_nombre
      FROM medicos m
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      WHERE LOWER(e.nombre) LIKE LOWER($1) AND m.estado = 'activo'
      ORDER BY m.nombre
    `);
    
    // 5. Probar la consulta actual con diferentes parámetros
    console.log('\n🧪 PRUEBAS CON LA CONSULTA ACTUAL:');
    const testParams = ['Oncología', 'Radioterapia', 'Cirugía'];
    
    for (const param of testParams) {
      const result = await query(`
        SELECT m.id, m.nombre, m.especialidad_id, e.nombre as especialidad_nombre
        FROM medicos m
        LEFT JOIN especialidades e ON m.especialidad_id = e.id
        WHERE LOWER(e.nombre) LIKE LOWER($1) AND m.estado = 'activo'
        ORDER BY m.nombre
      `, [`%${param}%`]);
      
      console.log(`\nParámetro: "${param}" - Resultados: ${result.rows.length}`);
      result.rows.forEach(med => {
        console.log(`  - ${med.nombre} (${med.especialidad_nombre})`);
      });
    }
    
  } catch (error) {
    console.error('❌ Error en diagnóstico:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  debugMedicos();
} 