const { query, testConnection } = require('../backend/database');

const fixDatabase = async () => {
  try {
    console.log('🔧 Corrigiendo base de datos...\n');
    
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
      SELECT nombre, COUNT(*) as cantidad
      FROM especialidades
      GROUP BY nombre
      HAVING COUNT(*) > 1
      ORDER BY nombre
    `);
    
    if (especialidadesDuplicadas.rows.length > 0) {
      console.log('❌ Se encontraron especialidades duplicadas:');
      especialidadesDuplicadas.rows.forEach(esp => {
        console.log(`  - ${esp.nombre}: ${esp.cantidad} veces`);
      });
      
      // 2. Eliminar especialidades duplicadas
      console.log('\n🧹 Eliminando especialidades duplicadas...');
      const especialidadesUnicas = await query(`
        SELECT DISTINCT nombre
        FROM especialidades
        ORDER BY nombre
      `);
      
      // Eliminar todas las especialidades
      await query('DELETE FROM especialidades');
      
      // Reinsertar solo las únicas
      for (const esp of especialidadesUnicas.rows) {
        await query(`
          INSERT INTO especialidades (nombre)
          VALUES ($1)
        `, [esp.nombre]);
      }
      
      console.log('✅ Especialidades duplicadas eliminadas');
      
    } else {
      console.log('✅ No hay especialidades duplicadas');
    }
    
    // 3. Verificar médicos y sus especialidades
    console.log('\n👨‍⚕️ Verificando médicos y especialidades...');
    const medicos = await query(`
      SELECT m.id, m.nombre, m.especialidad_id, e.nombre as especialidad_nombre
      FROM medicos m
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      ORDER BY m.nombre
    `);
    
    console.log('📊 Médicos disponibles:');
    medicos.rows.forEach(med => {
      console.log(`  - ${med.nombre} (${med.especialidad_nombre || 'Sin especialidad'})`);
    });
    
    // 4. Corregir referencias de especialidades si es necesario
    console.log('\n🔧 Corrigiendo referencias de especialidades...');
    const especialidadesActuales = await query('SELECT id, nombre FROM especialidades ORDER BY id');
    
    console.log('📋 Especialidades actuales:');
    especialidadesActuales.rows.forEach(esp => {
      console.log(`  ID: ${esp.id} - ${esp.nombre}`);
    });
    
    // 5. Actualizar referencias de médicos si es necesario
    const medicosSinEspecialidad = await query(`
      SELECT m.id, m.nombre, m.especialidad_id
      FROM medicos m
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      WHERE e.id IS NULL
    `);
    
    if (medicosSinEspecialidad.rows.length > 0) {
      console.log('\n⚠️ Médicos sin especialidad válida:');
      medicosSinEspecialidad.rows.forEach(med => {
        console.log(`  - ${med.nombre} (especialidad_id: ${med.especialidad_id})`);
      });
      
      // Asignar especialidades por defecto
      console.log('\n🔧 Asignando especialidades por defecto...');
      const especialidadesPorDefecto = {
        1: 'Oncología Médica',
        2: 'Radioterapia', 
        3: 'Cirugía Oncológica',
        4: 'Psicología Oncológica'
      };
      
      for (const medico of medicosSinEspecialidad.rows) {
        const especialidadNombre = especialidadesPorDefecto[medico.especialidad_id];
        if (especialidadNombre) {
          const especialidad = await query('SELECT id FROM especialidades WHERE nombre = $1', [especialidadNombre]);
          if (especialidad.rows.length > 0) {
            await query('UPDATE medicos SET especialidad_id = $1 WHERE id = $2', 
              [especialidad.rows[0].id, medico.id]);
            console.log(`  ✅ ${medico.nombre} -> ${especialidadNombre}`);
          }
        }
      }
    }
    
    // 6. Verificación final
    console.log('\n✅ Verificación final...');
    const medicosFinales = await query(`
      SELECT m.id, m.nombre, e.nombre as especialidad
      FROM medicos m
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      ORDER BY m.nombre
    `);
    
    console.log('📊 Estado final de médicos:');
    medicosFinales.rows.forEach(med => {
      console.log(`  - ${med.nombre} (${med.especialidad})`);
    });
    
    console.log('\n🎉 Base de datos corregida exitosamente!');
    
  } catch (error) {
    console.error('❌ Error corrigiendo base de datos:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  fixDatabase();
} 