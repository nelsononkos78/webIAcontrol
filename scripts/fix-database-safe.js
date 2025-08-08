const { query, testConnection } = require('../backend/database');

const fixDatabaseSafe = async () => {
  try {
    console.log('🔧 Corrigiendo base de datos de forma segura...\n');
    
    // Verificar conexión
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('✅ Conexión establecida\n');
    
    // 1. Verificar especialidades duplicadas
    console.log('🏥 Verificando especialidades duplicadas...');
    const especialidadesDuplicadas = await query(`
      SELECT nombre, COUNT(*) as cantidad, array_agg(id) as ids
      FROM especialidades
      GROUP BY nombre
      HAVING COUNT(*) > 1
      ORDER BY nombre
    `);
    
    if (especialidadesDuplicadas.rows.length > 0) {
      console.log('❌ Se encontraron especialidades duplicadas:');
      especialidadesDuplicadas.rows.forEach(esp => {
        console.log(`  - ${esp.nombre}: ${esp.cantidad} veces (IDs: ${esp.ids.join(', ')})`);
      });
      
      // 2. Corregir referencias de médicos primero
      console.log('\n🔧 Corrigiendo referencias de médicos...');
      
      for (const esp of especialidadesDuplicadas.rows) {
        const ids = esp.ids;
        const idPrincipal = ids[0]; // Mantener el primer ID
        const idsSecundarios = ids.slice(1); // Los demás se eliminarán
        
        console.log(`  Procesando ${esp.nombre}: mantener ID ${idPrincipal}, eliminar IDs ${idsSecundarios.join(', ')}`);
        
        // Actualizar médicos que referencian IDs secundarios
        for (const idSecundario of idsSecundarios) {
          await query(`
            UPDATE medicos 
            SET especialidad_id = $1 
            WHERE especialidad_id = $2
          `, [idPrincipal, idSecundario]);
        }
        
        // Eliminar especialidades duplicadas
        for (const idSecundario of idsSecundarios) {
          await query('DELETE FROM especialidades WHERE id = $1', [idSecundario]);
        }
      }
      
      console.log('✅ Especialidades duplicadas eliminadas');
      
    } else {
      console.log('✅ No hay especialidades duplicadas');
    }
    
    // 3. Verificar estado final
    console.log('\n✅ Verificación final...');
    
    const especialidadesFinales = await query('SELECT id, nombre FROM especialidades ORDER BY id');
    console.log('📋 Especialidades finales:');
    especialidadesFinales.rows.forEach(esp => {
      console.log(`  ID: ${esp.id} - ${esp.nombre}`);
    });
    
    const medicosFinales = await query(`
      SELECT m.id, m.nombre, e.nombre as especialidad
      FROM medicos m
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      ORDER BY m.nombre
    `);
    
    console.log('\n📊 Estado final de médicos:');
    medicosFinales.rows.forEach(med => {
      console.log(`  - ${med.nombre} (${med.especialidad})`);
    });
    
    // 4. Probar consultas de búsqueda
    console.log('\n🧪 Probando consultas de búsqueda...');
    const especialidadesTest = ['Oncología Médica', 'Radioterapia', 'Cirugía Oncológica'];
    
    for (const esp of especialidadesTest) {
      const medicosEncontrados = await query(`
        SELECT m.id, m.nombre, e.nombre as especialidad
        FROM medicos m
        LEFT JOIN especialidades e ON m.especialidad_id = e.id
        WHERE LOWER(e.nombre) LIKE LOWER($1) AND m.estado = 'activo'
        ORDER BY m.nombre
      `, [`%${esp}%`]);
      
      console.log(`  "${esp}": ${medicosEncontrados.rows.length} médicos encontrados`);
      medicosEncontrados.rows.forEach(med => {
        console.log(`    - ${med.nombre} (${med.especialidad})`);
      });
    }
    
    console.log('\n🎉 Base de datos corregida exitosamente!');
    
  } catch (error) {
    console.error('❌ Error corrigiendo base de datos:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  fixDatabaseSafe();
} 