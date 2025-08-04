const { query, testConnection } = require('./database');

const seedData = async () => {
  try {
    console.log('🌱 Iniciando inserción de datos de prueba...');
    
    // Verificar conexión
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ No se pudo conectar a la base de datos');
      return;
    }
    
    // Insertar centro médico
    await query(`
      INSERT INTO centro_medico (nombre, direccion, telefono, correo, ruc) 
      VALUES ($1, $2, $3, $4, $5)
      ON CONFLICT DO NOTHING
    `, [
      'Onkos Instituto del Cáncer',
      'Av. Arequipa 123, Lima, Perú',
      '+51 1 234 5678',
      'contacto@onkos.com',
      '20123456789'
    ]);
    
    // Insertar especialidades
    const especialidades = [
      'Oncología Médica',
      'Radioterapia',
      'Cirugía Oncológica',
      'Psicología Oncológica',
      'Nutrición Oncológica'
    ];
    
    for (const especialidad of especialidades) {
      await query(`
        INSERT INTO especialidades (nombre) 
        VALUES ($1)
        ON CONFLICT DO NOTHING
      `, [especialidad]);
    }
    
    // Insertar roles
    const roles = [
      { nombre: 'admin', descripcion: 'Administrador del sistema' },
      { nombre: 'medico', descripcion: 'Médico especialista' },
      { nombre: 'recepcionista', descripcion: 'Recepcionista' }
    ];
    
    for (const rol of roles) {
      await query(`
        INSERT INTO roles (nombre, descripcion) 
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `, [rol.nombre, rol.descripcion]);
    }
    
    // Insertar usuarios
    const usuarios = [
      {
        nombre: 'Administrador',
        correo: 'admin@onkos.com',
        contraseña: 'admin123',
        estado: 'activo'
      },
      {
        nombre: 'Recepcionista',
        correo: 'recepcion@onkos.com',
        contraseña: 'recepcion123',
        estado: 'activo'
      }
    ];
    
    for (const usuario of usuarios) {
      const result = await query(`
        INSERT INTO usuarios (nombre, correo, contraseña, estado) 
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (correo) DO NOTHING
        RETURNING id
      `, [usuario.nombre, usuario.correo, usuario.contraseña, usuario.estado]);
      
      if (result.rows.length > 0) {
        const userId = result.rows[0].id;
        const rolId = usuario.correo === 'admin@onkos.com' ? 1 : 3; // admin o recepcionista
        
        await query(`
          INSERT INTO usuario_rol (usuario_id, rol_id) 
          VALUES ($1, $2)
          ON CONFLICT DO NOTHING
        `, [userId, rolId]);
      }
    }
    
    // Insertar médicos
    const medicos = [
      {
        nombre: 'Dr. Carlos Mendoza',
        dni: '12345678',
        correo: 'carlos.mendoza@onkos.com',
        telefono: '+51 999 123 456',
        estado: 'activo',
        especialidad_id: 1
      },
      {
        nombre: 'Dra. Ana García',
        dni: '87654321',
        correo: 'ana.garcia@onkos.com',
        telefono: '+51 999 654 321',
        estado: 'activo',
        especialidad_id: 2
      },
      {
        nombre: 'Dr. Luis Rodríguez',
        dni: '11223344',
        correo: 'luis.rodriguez@onkos.com',
        telefono: '+51 999 111 222',
        estado: 'activo',
        especialidad_id: 3
      }
    ];
    
    for (const medico of medicos) {
      await query(`
        INSERT INTO medicos (nombre, dni, correo, telefono, estado, especialidad_id, centro_id) 
        VALUES ($1, $2, $3, $4, $5, $6, 1)
        ON CONFLICT (dni) DO NOTHING
      `, [medico.nombre, medico.dni, medico.correo, medico.telefono, medico.estado, medico.especialidad_id]);
    }
    
    // Insertar pacientes
    const pacientes = [
      {
        nombre: 'María González',
        dni: '11111111',
        telefono: '+51 999 111 111',
        correo: 'maria.gonzalez@email.com',
        fecha_nacimiento: '1985-03-15',
        estado_vital: 'vivo'
      },
      {
        nombre: 'Juan Pérez',
        dni: '22222222',
        telefono: '+51 999 222 222',
        correo: 'juan.perez@email.com',
        fecha_nacimiento: '1978-07-22',
        estado_vital: 'vivo'
      },
      {
        nombre: 'Carmen López',
        dni: '33333333',
        telefono: '+51 999 333 333',
        correo: 'carmen.lopez@email.com',
        fecha_nacimiento: '1990-11-08',
        estado_vital: 'vivo'
      }
    ];
    
    for (const paciente of pacientes) {
      await query(`
        INSERT INTO pacientes (nombre, dni, telefono, correo, fecha_nacimiento, estado_vital) 
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (dni) DO NOTHING
      `, [paciente.nombre, paciente.dni, paciente.telefono, paciente.correo, paciente.fecha_nacimiento, paciente.estado_vital]);
    }
    
    console.log('✅ Datos de prueba insertados exitosamente');
    console.log('\n📋 Credenciales de acceso:');
    console.log('👤 Admin: admin@onkos.com / admin123');
    console.log('👤 Recepcionista: recepcion@onkos.com / recepcion123');
    
  } catch (error) {
    console.error('❌ Error insertando datos de prueba:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  seedData();
}

module.exports = { seedData }; 