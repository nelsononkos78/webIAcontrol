const { query, testConnection } = require('./database');

const initDatabase = async () => {
  try {
    console.log('🚀 Inicializando base de datos Onkos...');
    
    // Verificar conexión
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('✅ Conexión establecida, iniciando configuración...');
    
    // 1. Insertar centro médico
    console.log('📋 Configurando centro médico...');
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
    
    // 2. Insertar especialidades
    console.log('🏥 Configurando especialidades médicas...');
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
      await query(`
        INSERT INTO especialidades (nombre) 
        VALUES ($1)
        ON CONFLICT DO NOTHING
      `, [especialidad]);
    }
    
    // 3. Insertar roles del sistema
    console.log('👥 Configurando roles del sistema...');
    const roles = [
      { nombre: 'admin', descripcion: 'Administrador del sistema con acceso completo' },
      { nombre: 'user', descripcion: 'Usuario general del sistema' },
      { nombre: 'patient', descripcion: 'Paciente con acceso a su información médica' },
      { nombre: 'medical', descripcion: 'Personal médico (doctores, especialistas)' },
      { nombre: 'staff', descripcion: 'Personal administrativo y de apoyo' }
    ];
    
    for (const rol of roles) {
      await query(`
        INSERT INTO roles (nombre, descripcion) 
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `, [rol.nombre, rol.descripcion]);
    }
    
    // 4. Crear usuario administrador principal
    console.log('👤 Creando usuario administrador...');
    const adminResult = await query(`
      INSERT INTO usuarios (nombre, correo, contraseña, estado) 
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (correo) DO NOTHING
      RETURNING id
    `, ['admin', 'onkosadmin@onkos.com', '123abc', 'activo']);
    
    if (adminResult.rows.length > 0) {
      const adminId = adminResult.rows[0].id;
      
      // Asignar rol de administrador
      await query(`
        INSERT INTO usuario_rol (usuario_id, rol_id) 
        VALUES ($1, (SELECT id FROM roles WHERE nombre = 'admin'))
        ON CONFLICT DO NOTHING
      `, [adminId]);
      
      console.log('✅ Usuario administrador creado exitosamente');
    } else {
      console.log('ℹ️  Usuario administrador ya existe');
    }
    
    // 5. Crear algunos usuarios de ejemplo
    console.log('👥 Creando usuarios de ejemplo...');
    const usuariosEjemplo = [
      {
        nombre: 'admin',
        correo: 'onkosadmin@onkos.com',
        contraseña: '123abc',
        estado: 'activo',
        roles: ['admin']
      },
      {
        nombre: 'carlos',
        correo: 'carlos.mendoza@onkos.com',
        contraseña: 'medico123',
        estado: 'activo',
        roles: ['medical']
      },
      {
        nombre: 'ana',
        correo: 'ana.garcia@onkos.com',
        contraseña: 'medico123',
        estado: 'activo',
        roles: ['medical']
      },
      {
        nombre: 'maria',
        correo: 'maria.gonzalez@onkos.com',
        contraseña: 'staff123',
        estado: 'activo',
        roles: ['staff']
      },
      {
        nombre: 'juan',
        correo: 'juan.perez@onkos.com',
        contraseña: 'patient123',
        estado: 'activo',
        roles: ['patient']
      }
    ];
    
    for (const usuario of usuariosEjemplo) {
      const userResult = await query(`
        INSERT INTO usuarios (nombre, correo, contraseña, estado) 
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (correo) DO NOTHING
        RETURNING id
      `, [usuario.nombre, usuario.correo, usuario.contraseña, usuario.estado]);
      
      if (userResult.rows.length > 0) {
        const userId = userResult.rows[0].id;
        
        // Asignar roles
        for (const rol of usuario.roles) {
          await query(`
            INSERT INTO usuario_rol (usuario_id, rol_id) 
            VALUES ($1, (SELECT id FROM roles WHERE nombre = $2))
            ON CONFLICT DO NOTHING
          `, [userId, rol]);
        }
      }
    }
    
    // 6. Crear médicos de ejemplo
    console.log('👨‍⚕️ Creando médicos de ejemplo...');
    
    // Obtener IDs de especialidades
    const especialidadesResult = await query('SELECT id, nombre FROM especialidades ORDER BY id');
    const especialidadesIds = especialidadesResult.rows;
    
    // Obtener ID del centro médico
    const centroResult = await query('SELECT id FROM centro_medico LIMIT 1');
    const centroId = centroResult.rows[0]?.id || 1;
    
    const medicosEjemplo = [
      {
        nombre: 'Dr. Carlos Mendoza',
        dni: '12345678',
        correo: 'carlos.mendoza@onkos.com',
        telefono: '+51 999 123 456',
        estado: 'activo',
        especialidad_id: especialidadesIds[0]?.id || 1
      },
      {
        nombre: 'Dra. Ana García',
        dni: '87654321',
        correo: 'ana.garcia@onkos.com',
        telefono: '+51 999 654 321',
        estado: 'activo',
        especialidad_id: especialidadesIds[1]?.id || 2
      },
      {
        nombre: 'Dr. Luis Rodríguez',
        dni: '11223344',
        correo: 'luis.rodriguez@onkos.com',
        telefono: '+51 999 111 222',
        estado: 'activo',
        especialidad_id: especialidadesIds[2]?.id || 3
      },
      {
        nombre: 'Dra. Carmen López',
        dni: '55667788',
        correo: 'carmen.lopez@onkos.com',
        telefono: '+51 999 555 666',
        estado: 'activo',
        especialidad_id: especialidadesIds[3]?.id || 4
      }
    ];
    
    for (const medico of medicosEjemplo) {
      await query(`
        INSERT INTO medicos (nombre, dni, correo, telefono, estado, especialidad_id, centro_id) 
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        ON CONFLICT (dni) DO NOTHING
      `, [medico.nombre, medico.dni, medico.correo, medico.telefono, medico.estado, medico.especialidad_id, centroId]);
    }
    
    // 7. Crear pacientes de ejemplo
    console.log('👤 Creando pacientes de ejemplo...');
    const pacientesEjemplo = [
      {
        nombre: 'María González',
        dni: '11111111',
        telefono: '+51 999 111 111',
        correo: 'maria.gonzalez@email.com',
        fecha_nacimiento: '1985-03-15'
      },
      {
        nombre: 'Juan Pérez',
        dni: '22222222',
        telefono: '+51 999 222 222',
        correo: 'juan.perez@email.com',
        fecha_nacimiento: '1978-07-22'
      },
      {
        nombre: 'Carmen López',
        dni: '33333333',
        telefono: '+51 999 333 333',
        correo: 'carmen.lopez@email.com',
        fecha_nacimiento: '1990-11-08'
      },
      {
        nombre: 'Roberto Silva',
        dni: '44444444',
        telefono: '+51 999 444 444',
        correo: 'roberto.silva@email.com',
        fecha_nacimiento: '1965-05-12'
      }
    ];
    
    for (const paciente of pacientesEjemplo) {
      await query(`
        INSERT INTO pacientes (nombre, dni, telefono, correo, fecha_nacimiento) 
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (dni) DO NOTHING
      `, [paciente.nombre, paciente.dni, paciente.telefono, paciente.correo, paciente.fecha_nacimiento]);
    }
    
    console.log('\n🎉 ¡Base de datos inicializada exitosamente!');
    console.log('\n📋 Credenciales de acceso:');
    console.log('👤 Administrador: admin / 123abc (o onkosadmin@onkos.com)');
    console.log('👨‍⚕️ Médico: carlos / medico123 (o carlos.mendoza@onkos.com)');
    console.log('👨‍⚕️ Médico: ana / medico123 (o ana.garcia@onkos.com)');
    console.log('👥 Staff: maria / staff123 (o maria.gonzalez@onkos.com)');
    console.log('👤 Paciente: juan / patient123 (o juan.perez@onkos.com)');
    
    console.log('\n🔐 Roles configurados:');
    console.log('• admin - Administrador del sistema');
    console.log('• user - Usuario general');
    console.log('• patient - Paciente');
    console.log('• medical - Personal médico');
    console.log('• staff - Personal administrativo');
    
    console.log('\n🏥 Especialidades disponibles:');
    for (const especialidad of especialidades) {
      console.log(`• ${especialidad}`);
    }
    
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  initDatabase();
}

module.exports = { initDatabase }; 