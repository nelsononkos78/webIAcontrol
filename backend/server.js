const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const { query, testConnection } = require('./database');
require('dotenv').config({ path: './config.env' });

const app = express();
const PORT = process.env.PORT || 3001;

// Función para respuestas predefinidas del chatbot
function getChatbotResponse(message) {
  if (message.includes('hola') || message.includes('buenos días') || message.includes('buenas')) {
    return '¡Hola! Soy Lucía, recepcionista del Onkos Instituto del Cáncer. ¿En qué puedo ayudarte hoy?';
  }
  
  if (message.includes('información') || message.includes('clínica') || message.includes('servicios')) {
    return 'Te cuento sobre nuestra clínica:\n\n🏥 **Onkos Instituto del Cáncer**\n\n**Servicios que ofrecemos:**\n• Consultas médicas\n• Quimioterapia\n• Radioterapia\n• Cirugía oncológica\n• Psicología oncológica\n• Nutrición especializada\n\n**Horarios:** Lunes a Viernes 8:00 AM - 6:00 PM\n\n**Contacto:** +51 1 234 5678\n**Emergencias:** +51 300 123 4567';
  }
  
  if (message.includes('especialidad') || message.includes('especialidades') || message.includes('médico')) {
    return 'Nuestras especialidades médicas son:\n\n👨‍⚕️ **Especialidades:**\n• Oncología Médica\n• Radioterapia\n• Cirugía Oncológica\n• Psicología Oncológica\n• Nutrición Oncológica\n• Medicina Nuclear\n• Hematología Oncológica\n\n**Nuestros especialistas:**\n• Dr. Carlos Mendoza (Oncólogo)\n• Dra. Ana García (Radioterapeuta)\n• Dr. Luis Rodríguez (Cirujano)\n• Dra. Carmen López (Psicóloga)';
  }
  
  if (message.includes('cita') || message.includes('agendar') || message.includes('consulta')) {
    return 'Perfecto, te ayudo a agendar tu cita. ¿Cuál es tu nombre completo?';
  }
  
  if (message.includes('horario') || message.includes('horarios') || message.includes('cuándo')) {
    return 'Nuestros horarios de atención:\n\n📅 **Horarios de la clínica:**\n• Lunes a Viernes: 8:00 AM - 6:00 PM\n• Sábados: 8:00 AM - 12:00 PM\n• Domingos: Cerrado\n\n📞 **Para citas:** +51 1 234 5678\n🚨 **Emergencias:** +51 300 123 4567';
  }
  
  if (message.includes('dirección') || message.includes('dónde') || message.includes('ubicación')) {
    return 'Nos encuentras en:\n\n📍 **Dirección:**\nAv. Arequipa 123, Lima, Perú\n\n🚗 **Cómo llegar:**\n• Metro: Estación Central\n• Bus: Líneas 1, 2, 3\n• Taxi: 10 min desde el centro';
  }
  
  if (message.includes('precio') || message.includes('costo') || message.includes('tarifa')) {
    return 'Los precios varían según el tipo de consulta y tratamiento. Te recomiendo que llames al +51 1 234 5678 para obtener información específica sobre costos y cobertura de seguros.';
  }
  
  if (message.includes('emergencia') || message.includes('urgente')) {
    return '🚨 **Para emergencias médicas:**\n\n📞 Llama inmediatamente al: +51 300 123 4567\n\n⏰ **Atención 24/7 para emergencias oncológicas**\n\nSi es una emergencia grave, también puedes acudir directamente a nuestra clínica.';
  }
  
  if (message.includes('gracias') || message.includes('thank')) {
    return '¡De nada! Estoy aquí para ayudarte. Si tienes más preguntas, no dudes en preguntarme. 😊';
  }
  
  // Respuesta por defecto
  return 'Hola, soy Lucía de Onkos Instituto del Cáncer. Puedo ayudarte con información sobre nuestros servicios, especialidades, horarios o agendar citas. ¿Qué necesitas saber?';
}

// Probar conexión a la base de datos al iniciar
testConnection().then(connected => {
  if (!connected) {
    console.log('⚠️  Continuando sin conexión a base de datos...');
  }
});

// Configuración de CORS
app.use(cors({
  origin: [
    'http://localhost:8080', 
    'http://localhost:3000', 
    'http://127.0.0.1:8080',
    'http://192.168.1.123:8080',
    'http://192.168.1.123:3000',
    'http://onkosweb.com:8080',
    'http://onkosweb.com:3000',
    'https://onkosweb.com:8080',
    'https://onkosweb.com:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Servidor de Onkos Instituto del Cáncer funcionando correctamente',
    timestamp: new Date().toISOString()
  });
});

// Endpoint para el chatbot con Groq
app.post('/api/chat', async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Mensaje requerido' });
    }

    // Construir el contexto para el chatbot oncológico
    const systemPrompt = `Eres Lucía, recepcionista del Onkos Instituto del Cáncer en Perú. Tu trabajo es ayudar a los pacientes con información y agendar citas.

IMPORTANTE:
- Habla como una persona real, no excesivamente cordial ni robótica
- Sé directa y clara, pero con calidez natural
- Usa un tono conversacional, como hablar con un amigo o familiar
- Si la información es muy extensa, divídela en varios mensajes
- Estructura bien la información con puntos, listas o párrafos cortos
- No uses frases muy formales ni excesivamente empáticas
- Sé natural, como una persona que realmente conoce el tema

ESTRUCTURA DE MENSAJES:
- Mensajes cortos: Una sola respuesta
- Mensajes medianos: Usa puntos o listas para organizar
- Mensajes largos: Divide en 2-3 mensajes separados
- Información densa: Envía en partes para mejor digestión

AGENDAMIENTO DE CITAS:
IMPORTANTE: Cuando alguien quiera agendar una cita, NO hagas el agendamiento tú misma. En su lugar:

1. Responde: "Perfecto, te ayudo a agendar tu cita. ¿Cuál es tu nombre completo?"

2. NO continúes con el proceso de agendamiento. El sistema frontend se encargará de manejar todo el flujo paso a paso.

3. Si el usuario insiste en que ya te dio datos, responde: "Disculpa, necesito que uses nuestro sistema de agendamiento automático. Te ayudo a iniciarlo. ¿Cuál es tu nombre completo?"

ESPECIALIDADES DISPONIBLES:
- Oncología Médica
- Radioterapia
- Cirugía Oncológica
- Psicología Oncológica
- Nutrición Oncológica
- Medicina Nuclear
- Hematología Oncológica

Información de la clínica:
- Servicios: Consultas, Quimioterapia, Radioterapia, Cirugía, Psicología, Nutrición
- Especialistas: Dr. Mendoza (Oncólogo), Dra. García (Radioterapeuta), Dr. Rodríguez (Cirujano), Dra. López (Psicóloga)
- Horarios: Lunes a Viernes 8:00 AM - 6:00 PM
- Para citas: Puedes usar nuestro formulario en "Agendar Cita" o llamarnos al +51 1 234 5678
- Para emergencias: +51 300 123 4567

Recuerda: Eres una persona real, habla naturalmente. NO hagas agendamientos manuales, solo inicia el proceso.`;

    // Preparar el historial de conversación
    const messages = [
      { role: 'system', content: systemPrompt },
      ...conversationHistory,
      { role: 'user', content: message }
    ];

    // Respuestas predefinidas para el chatbot
    const botResponse = getChatbotResponse(message.toLowerCase());

    res.json({
      response: botResponse,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error en el chatbot:', error);
    res.status(500).json({ 
      error: 'Error interno del servidor',
      message: 'No se pudo procesar tu mensaje. Por favor, intenta de nuevo.'
    });
  }
});

// Endpoint para programar citas
app.post('/api/appointments', async (req, res) => {
  try {
    const { 
      patientName, 
      patientEmail, 
      patientPhone, 
      preferredDate, 
      preferredTime, 
      specialty,
      reason 
    } = req.body;

    // Validaciones básicas
    if (!patientName || !patientEmail || !patientPhone) {
      return res.status(400).json({ 
        error: 'Información del paciente requerida' 
      });
    }

    // Aquí normalmente se conectaría con una base de datos
    // Por ahora simulamos el proceso
    const appointment = {
      id: Date.now(),
      patientName,
      patientEmail,
      patientPhone,
      preferredDate,
      preferredTime,
      specialty,
      reason,
      status: 'pendiente',
      createdAt: new Date().toISOString()
    };

    // Simular procesamiento
    await new Promise(resolve => setTimeout(resolve, 1000));

    res.json({
      success: true,
      message: 'Cita solicitada exitosamente. Nos pondremos en contacto contigo pronto.',
      appointment
    });

  } catch (error) {
    console.error('Error al programar cita:', error);
    res.status(500).json({ 
      error: 'Error al procesar la solicitud de cita' 
    });
  }
});

// Endpoint para obtener información de la clínica
app.get('/api/clinic-info', (req, res) => {
  res.json({
          name: 'Clínica Onkos Instituto del Cáncer',
    description: 'Centro especializado en oncología con más de 15 años de experiencia',
    services: [
      'Consultas oncológicas',
      'Quimioterapia',
      'Radioterapia',
      'Cirugía oncológica',
      'Medicina nuclear',
      'Psicología oncológica',
      'Nutrición oncológica'
    ],
    specialists: [
      {
        name: 'Dr. Carlos Mendoza',
        specialty: 'Oncólogo médico',
        experience: '20 años',
        image: '/images/doctor1.jpg'
      },
      {
        name: 'Dra. Ana García',
        specialty: 'Oncóloga radioterapeuta',
        experience: '15 años',
        image: '/images/doctor2.jpg'
      },
      {
        name: 'Dr. Luis Rodríguez',
        specialty: 'Cirujano oncológico',
        experience: '18 años',
        image: '/images/doctor3.jpg'
      },
      {
        name: 'Dra. Lucía López',
        specialty: 'Psicóloga oncológica',
        experience: '12 años',
        image: '/images/doctor4.jpg'
      }
    ],
    contact: {
          phone: '+51 1 234 5678',
    email: 'contacto@onkos.com',
    address: 'Av. Arequipa 123, Lima, Perú',
      hours: 'Lunes a Viernes 8:00 AM - 6:00 PM'
    }
  });
});

// ====================================
// ENDPOINTS DE ADMINISTRACIÓN
// ====================================

// Middleware para verificar token de admin
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }
  
  // Aquí normalmente verificarías el token con JWT
  // Por ahora usamos una verificación simple
  if (token === 'admin-token-123') {
    next();
  } else {
    res.status(401).json({ error: 'Token inválido' });
  }
};

// Login de administrador
app.post('/api/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Validaciones
    if (!email || !password) {
      return res.status(400).json({ error: 'Email/usuario y contraseña requeridos' });
    }
    
    // Verificar credenciales en la base de datos
    // Buscar por correo O por nombre de usuario
    const result = await query(
      `SELECT u.id, u.nombre, u.correo, u.contraseña, array_agg(r.nombre) as roles 
       FROM usuarios u 
       LEFT JOIN usuario_rol ur ON u.id = ur.usuario_id 
       LEFT JOIN roles r ON ur.rol_id = r.id 
       WHERE (u.correo = $1 OR u.nombre = $1) AND u.estado = $2 
       GROUP BY u.id, u.nombre, u.correo, u.contraseña`,
      [email, 'activo']
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    
    const user = result.rows[0];
    
    // Aquí normalmente verificarías el hash de la contraseña
    // Por ahora usamos una verificación simple
    if (user.contraseña === password) {
      res.json({
        success: true,
        token: 'admin-token-123',
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.correo,
          roles: user.roles.filter(role => role !== null)
        }
      });
    } else {
      res.status(401).json({ error: 'Credenciales inválidas' });
    }
  } catch (error) {
    console.error('Error en login admin:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener médicos
app.get('/api/admin/medicos', verifyAdminToken, async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        m.id,
        m.nombre,
        m.dni,
        m.correo,
        m.telefono,
        m.estado,
        e.nombre as especialidad
      FROM medicos m
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      ORDER BY m.nombre
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo médicos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener usuarios
app.get('/api/admin/usuarios', verifyAdminToken, async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        u.id,
        u.nombre,
        u.correo,
        u.estado,
        u.fecha_creacion,
        array_agg(r.nombre) as roles
      FROM usuarios u
      LEFT JOIN usuario_rol ur ON u.id = ur.usuario_id
      LEFT JOIN roles r ON ur.rol_id = r.id
      GROUP BY u.id, u.nombre, u.correo, u.estado, u.fecha_creacion
      ORDER BY u.nombre
    `);
    
    // Filtrar roles nulos
    const usuarios = result.rows.map(user => ({
      ...user,
      roles: user.roles.filter(role => role !== null)
    }));
    
    res.json(usuarios);
  } catch (error) {
    console.error('Error obteniendo usuarios:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Obtener lista de pacientes
app.get('/api/admin/pacientes', verifyAdminToken, async (req, res) => {
  try {
    const result = await query(`
      SELECT 
        id,
        nombre,
        dni,
        telefono,
        correo,
        fecha_nacimiento,
        estado,
        fecha_registro
      FROM pacientes
      ORDER BY nombre
    `);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo pacientes:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar médico
app.delete('/api/admin/medicos/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM medicos WHERE id = $1 RETURNING id', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Médico no encontrado' });
    }
    
    res.json({ success: true, message: 'Médico eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando médico:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar usuario
app.delete('/api/admin/usuarios/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM usuarios WHERE id = $1 RETURNING id', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    
    res.json({ success: true, message: 'Usuario eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando usuario:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Eliminar paciente
app.delete('/api/admin/pacientes/:id', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await query('DELETE FROM pacientes WHERE id = $1 RETURNING id', [id]);
    
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Paciente no encontrado' });
    }
    
    res.json({ success: true, message: 'Paciente eliminado exitosamente' });
  } catch (error) {
    console.error('Error eliminando paciente:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// ====================================
// ENDPOINTS PARA CHATBOT - VALIDACIÓN DE PACIENTES
// ====================================

// Validar paciente existente
app.post('/api/chatbot/validar-paciente', async (req, res) => {
  try {
    const { dni, nombre, telefono, correo } = req.body;
    
    // Validar DNI
    if (!dni || !/^\d{8}$/.test(dni)) {
      return res.status(400).json({
        error: 'DNI inválido. Debe tener 8 dígitos.',
        campo: 'dni'
      });
    }
    
    // Buscar paciente existente
    const pacienteExistente = await query(`
      SELECT id, nombre, dni, telefono, correo, fecha_nacimiento
      FROM pacientes 
      WHERE dni = $1
    `, [dni]);
    
    if (pacienteExistente.rows.length > 0) {
      const paciente = pacienteExistente.rows[0];
      
      // Comparar datos
      const diferencias = [];
      if (paciente.nombre.toLowerCase() !== nombre.toLowerCase()) {
        diferencias.push('nombre');
      }
      if (paciente.telefono !== telefono) {
        diferencias.push('telefono');
      }
      if (paciente.correo !== correo) {
        diferencias.push('correo');
      }
      
      if (diferencias.length > 0) {
        return res.json({
          tipo: 'datos_diferentes',
          paciente: paciente,
          diferencias: diferencias,
          mensaje: `Paciente encontrado pero los siguientes datos son diferentes: ${diferencias.join(', ')}. ¿Deseas actualizar la información?`
        });
      }
      
      // Datos coinciden perfectamente
      return res.json({
        tipo: 'paciente_existente',
        paciente: paciente,
        mensaje: 'Paciente encontrado. Usando datos existentes.'
      });
      
    } else {
      // Paciente nuevo
      return res.json({
        tipo: 'paciente_nuevo',
        mensaje: 'Paciente nuevo. Procediendo con el registro.'
      });
    }
    
  } catch (error) {
    console.error('Error validando paciente:', error);
    res.status(500).json({ error: 'Error validando paciente' });
  }
});

// Actualizar datos de paciente existente
app.put('/api/chatbot/actualizar-paciente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, telefono, correo, fecha_nacimiento } = req.body;
    
    const pacienteActualizado = await query(`
      UPDATE pacientes 
      SET nombre = $1, telefono = $2, correo = $3, fecha_nacimiento = $4
      WHERE id = $5
      RETURNING id, nombre, dni, telefono, correo, fecha_nacimiento
    `, [nombre, telefono, correo, fecha_nacimiento, id]);
    
    res.json({
      success: true,
      paciente: pacienteActualizado.rows[0],
      mensaje: 'Datos del paciente actualizados correctamente'
    });
    
  } catch (error) {
    console.error('Error actualizando paciente:', error);
    res.status(500).json({ error: 'Error actualizando paciente' });
  }
});

// Reactivar paciente inactivo
app.put('/api/chatbot/reactivar-paciente/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    const pacienteReactivado = await query(`
      UPDATE pacientes 
      SET fecha_registro = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id, nombre, dni, telefono, correo, fecha_nacimiento
    `, [id]);
    
    res.json({
      success: true,
      paciente: pacienteReactivado.rows[0],
      mensaje: 'Paciente reactivado correctamente'
    });
    
  } catch (error) {
    console.error('Error reactivando paciente:', error);
    res.status(500).json({ error: 'Error reactivando paciente' });
  }
});

// Crear nuevo paciente
app.post('/api/chatbot/crear-paciente', async (req, res) => {
  try {
    const { nombre, dni, telefono, correo, fecha_nacimiento } = req.body;
    
    // Verificar que el DNI no exista
    const pacienteExistente = await query(`
      SELECT id FROM pacientes WHERE dni = $1
    `, [dni]);
    
    if (pacienteExistente.rows.length > 0) {
      return res.status(400).json({
        error: 'Ya existe un paciente con ese DNI'
      });
    }
    
    const nuevoPaciente = await query(`
      INSERT INTO pacientes (nombre, dni, telefono, correo, fecha_nacimiento)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, nombre, dni, telefono, correo, fecha_nacimiento
    `, [nombre, dni, telefono, correo, fecha_nacimiento]);
    
    res.json({
      success: true,
      paciente: nuevoPaciente.rows[0],
      mensaje: 'Paciente creado exitosamente'
    });
    
  } catch (error) {
    console.error('Error creando paciente:', error);
    res.status(500).json({ error: 'Error creando paciente' });
  }
});

// Obtener médicos por especialidad
app.get('/api/chatbot/medicos/:especialidad', async (req, res) => {
  try {
    const { especialidad } = req.params;
    
    console.log('🔍 Buscando médicos para especialidad:', especialidad);
    
    const medicos = await query(`
      SELECT m.id, m.nombre, m.especialidad_id, e.nombre as especialidad_nombre
      FROM medicos m
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
      WHERE LOWER(e.nombre) LIKE LOWER($1) AND m.estado = 'activo'
      ORDER BY m.nombre
    `, [`%${especialidad}%`]);
    
    console.log('📊 Médicos encontrados:', medicos.rows.length);
    console.log('📋 Resultados:', medicos.rows);
    
    res.json(medicos.rows);
    
  } catch (error) {
    console.error('Error obteniendo médicos:', error);
    res.status(500).json({ error: 'Error obteniendo médicos' });
  }
});

// Verificar disponibilidad de horarios
app.post('/api/chatbot/verificar-disponibilidad', async (req, res) => {
  try {
    const { fecha, hora, medico_id } = req.body;
    
    // Verificar si hay citas existentes en esa fecha y hora
    const citasExistentes = await query(`
      SELECT id, paciente_id, medico_id, fecha, estado
      FROM citas 
      WHERE medico_id = $1 
      AND DATE(fecha) = $2 
      AND EXTRACT(HOUR FROM fecha) = $3
      AND estado IN ('agendada', 'reprogramada')
    `, [medico_id, fecha, parseInt(hora.split(':')[0])]);
    
    const disponible = citasExistentes.rows.length === 0;
    
    res.json({
      disponible: disponible,
      citas_existentes: citasExistentes.rows,
      mensaje: disponible ? 'Horario disponible' : 'Horario ocupado'
    });
    
  } catch (error) {
    console.error('Error verificando disponibilidad:', error);
    res.status(500).json({ error: 'Error verificando disponibilidad' });
  }
});

// Crear cita desde chatbot
app.post('/api/chatbot/agendar-cita', async (req, res) => {
  try {
    const { paciente_id, medico_id, fecha, hora, motivo, duracion = 30 } = req.body;
    
    // Combinar fecha y hora
    const fechaHora = new Date(`${fecha}T${hora}`);
    
    // Verificar disponibilidad
    const citasExistentes = await query(`
      SELECT id FROM citas 
      WHERE medico_id = $1 
      AND DATE(fecha) = $2 
      AND EXTRACT(HOUR FROM fecha) = $3
      AND estado IN ('agendada', 'reprogramada')
    `, [medico_id, fecha, parseInt(hora.split(':')[0])]);
    
    if (citasExistentes.rows.length > 0) {
      return res.status(400).json({
        error: 'Horario no disponible'
      });
    }
    
    // Crear la cita
    const nuevaCita = await query(`
      INSERT INTO citas (paciente_id, medico_id, fecha, motivo, estado, duracion)
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING id, paciente_id, medico_id, fecha, motivo, estado
    `, [paciente_id, medico_id, fechaHora, motivo, 'agendada', duracion]);
    
    res.json({
      success: true,
      cita: nuevaCita.rows[0],
      mensaje: 'Cita agendada exitosamente'
    });
    
  } catch (error) {
    console.error('Error agendando cita:', error);
    res.status(500).json({ error: 'Error agendando cita' });
  }
});

// Obtener citas para el panel de administración
app.get('/api/admin/citas', verifyAdminToken, async (req, res) => {
  try {
    const { medico_id, fecha } = req.query;
    
    let sqlQuery = `
      SELECT 
        c.id,
        c.fecha,
        c.motivo,
        c.estado,
        c.duracion,
        p.nombre as paciente_nombre,
        p.dni as paciente_dni,
        p.telefono as paciente_telefono,
        m.nombre as medico_nombre,
        e.nombre as especialidad_nombre
      FROM citas c
      LEFT JOIN pacientes p ON c.paciente_id = p.id
      LEFT JOIN medicos m ON c.medico_id = m.id
      LEFT JOIN especialidades e ON m.especialidad_id = e.id
    `;
    
    const params = [];
    let whereConditions = [];
    
    if (medico_id) {
      params.push(medico_id);
      whereConditions.push(`c.medico_id = $${params.length}`);
    }
    
    if (fecha) {
      params.push(fecha);
      whereConditions.push(`DATE(c.fecha) = $${params.length}`);
    }
    
    if (whereConditions.length > 0) {
      sqlQuery += ` WHERE ${whereConditions.join(' AND ')}`;
    }
    
    sqlQuery += ' ORDER BY c.fecha DESC';
    
    console.log('📊 Query ejecutada:', { text: sqlQuery, params });
    
    const result = await query(sqlQuery, params);
    
    res.json(result.rows);
  } catch (error) {
    console.error('Error obteniendo citas:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

// Cancelar cita
app.put('/api/admin/citas/:id/cancelar', verifyAdminToken, async (req, res) => {
  try {
    const { id } = req.params;
    
    const result = await query(
      'UPDATE citas SET estado = $1 WHERE id = $2 RETURNING *',
      ['cancelada', id]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Cita no encontrada' });
    }
    
    res.json({ 
      success: true, 
      mensaje: 'Cita cancelada exitosamente',
      cita: result.rows[0]
    });
  } catch (error) {
    console.error('Error cancelando cita:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor Onkos Instituto del Cáncer ejecutándose en puerto ${PORT}`);
  console.log(`📡 API disponible en:`);
  console.log(`   • Local: http://localhost:${PORT}`);
  console.log(`   • Red: http://192.168.1.123:${PORT}`);
}); 