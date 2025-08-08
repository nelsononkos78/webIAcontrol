const { query, testConnection } = require('./database');

const createTablesSimple = async () => {
  try {
    console.log('🚀 Creando tablas de la base de datos Onkos...');
    
    // Verificar conexión
    const connected = await testConnection();
    if (!connected) {
      console.log('❌ No se pudo conectar a la base de datos');
      return;
    }
    
    console.log('✅ Conexión establecida, creando tablas...');
    
    // Comandos SQL para crear tablas
    const tableCommands = [
      // Centros médicos
      `CREATE TABLE IF NOT EXISTS centro_medico (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        direccion TEXT,
        telefono TEXT,
        correo TEXT,
        ruc TEXT
      )`,
      
      // Especialidades
      `CREATE TABLE IF NOT EXISTS especialidades (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL
      )`,
      
      // Médicos
      `CREATE TABLE IF NOT EXISTS medicos (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        dni TEXT UNIQUE NOT NULL,
        correo TEXT,
        telefono TEXT,
        estado TEXT DEFAULT 'activo',
        especialidad_id INTEGER REFERENCES especialidades(id),
        centro_id INTEGER REFERENCES centro_medico(id)
      )`,
      
      // Horarios de médicos
      `CREATE TABLE IF NOT EXISTS horarios_medicos (
        id SERIAL PRIMARY KEY,
        medico_id INTEGER REFERENCES medicos(id),
        dia_semana TEXT CHECK (dia_semana IN ('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo')),
        hora_inicio TIME,
        hora_fin TIME
      )`,
      
      // Pacientes
      `CREATE TABLE IF NOT EXISTS pacientes (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        dni TEXT UNIQUE,
        telefono TEXT,
        correo TEXT,
        fecha_nacimiento DATE,
        estado_vital TEXT CHECK (estado_vital IN ('vivo', 'fallecido')) DEFAULT 'vivo',
        fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Citas
      `CREATE TABLE IF NOT EXISTS citas (
        id SERIAL PRIMARY KEY,
        paciente_id INTEGER REFERENCES pacientes(id),
        medico_id INTEGER REFERENCES medicos(id),
        fecha TIMESTAMP NOT NULL,
        motivo TEXT,
        estado TEXT CHECK (estado IN ('agendada', 'reprogramada', 'cancelada', 'asistida', 'no asistió')) DEFAULT 'agendada',
        observaciones TEXT
      )`,
      
      // Historial de citas
      `CREATE TABLE IF NOT EXISTS historial_citas (
        id SERIAL PRIMARY KEY,
        cita_id INTEGER REFERENCES citas(id),
        fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        estado_anterior TEXT,
        estado_nuevo TEXT,
        comentario TEXT
      )`,
      
      // Roles
      `CREATE TABLE IF NOT EXISTS roles (
        id SERIAL PRIMARY KEY,
        nombre TEXT UNIQUE NOT NULL,
        descripcion TEXT
      )`,
      
      // Usuarios
      `CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nombre TEXT NOT NULL,
        correo TEXT UNIQUE NOT NULL,
        contraseña TEXT NOT NULL,
        estado TEXT DEFAULT 'activo',
        fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // Usuario-Rol
      `CREATE TABLE IF NOT EXISTS usuario_rol (
        id SERIAL PRIMARY KEY,
        usuario_id INTEGER REFERENCES usuarios(id) ON DELETE CASCADE,
        rol_id INTEGER REFERENCES roles(id) ON DELETE CASCADE,
        UNIQUE(usuario_id, rol_id)
      )`
    ];
    
    // Crear tablas
    console.log('📋 Creando tablas...');
    for (let i = 0; i < tableCommands.length; i++) {
      try {
        await query(tableCommands[i]);
        console.log(`✅ Tabla ${i + 1}/${tableCommands.length} creada`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️  Tabla ${i + 1}/${tableCommands.length} ya existe`);
        } else {
          console.error(`❌ Error creando tabla ${i + 1}/${tableCommands.length}:`, error.message);
        }
      }
    }
    
    // Comandos para crear índices
    const indexCommands = [
      'CREATE INDEX IF NOT EXISTS idx_medicos_especialidad_estado ON medicos(especialidad_id, estado)',
      'CREATE INDEX IF NOT EXISTS idx_medicos_nombre ON medicos(nombre)',
      'CREATE INDEX IF NOT EXISTS idx_horarios_medico_dia ON horarios_medicos(medico_id, dia_semana)',
      'CREATE UNIQUE INDEX IF NOT EXISTS idx_pacientes_dni ON pacientes(dni)',
      'CREATE INDEX IF NOT EXISTS idx_citas_medico_fecha ON citas(medico_id, fecha)',
      'CREATE INDEX IF NOT EXISTS idx_citas_paciente_fecha ON citas(paciente_id, fecha)',
      'CREATE INDEX IF NOT EXISTS idx_citas_estado ON citas(estado)',
      'CREATE INDEX IF NOT EXISTS idx_historial_por_cita ON historial_citas(cita_id)',
      'CREATE INDEX IF NOT EXISTS idx_usuarios_correo ON usuarios(correo)',
      'CREATE INDEX IF NOT EXISTS idx_usuarios_estado ON usuarios(estado)',
      'CREATE INDEX IF NOT EXISTS idx_usuario_rol_usuario ON usuario_rol(usuario_id)',
      'CREATE INDEX IF NOT EXISTS idx_usuario_rol_rol ON usuario_rol(rol_id)'
    ];
    
    // Crear índices
    console.log('📋 Creando índices...');
    for (let i = 0; i < indexCommands.length; i++) {
      try {
        await query(indexCommands[i]);
        console.log(`✅ Índice ${i + 1}/${indexCommands.length} creado`);
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`ℹ️  Índice ${i + 1}/${indexCommands.length} ya existe`);
        } else {
          console.error(`❌ Error creando índice ${i + 1}/${indexCommands.length}:`, error.message);
        }
      }
    }
    
    console.log('\n🎉 ¡Tablas creadas exitosamente!');
    
    // Verificar que las tablas se crearon correctamente
    console.log('\n📊 Verificando tablas creadas...');
    const tablesResult = await query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      ORDER BY table_name
    `);
    
    if (tablesResult.rows.length > 0) {
      console.log('✅ Tablas encontradas:');
      tablesResult.rows.forEach(row => {
        console.log(`   • ${row.table_name}`);
      });
    } else {
      console.log('⚠️  No se encontraron tablas');
    }
    
  } catch (error) {
    console.error('❌ Error creando tablas:', error);
  } finally {
    process.exit(0);
  }
};

// Ejecutar si se llama directamente
if (require.main === module) {
  createTablesSimple();
}

module.exports = { createTablesSimple }; 