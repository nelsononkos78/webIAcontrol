-- ====================================
-- Base de datos: Clínica Onkológica
-- Autor: ChatGPT (OpenAI) + Nelson
-- Fecha: 2025-07-31
-- ====================================

-- Centros médicos
CREATE TABLE centro_medico (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  direccion TEXT,
  telefono TEXT,
  correo TEXT,
  ruc TEXT
);

-- Especialidades
CREATE TABLE especialidades (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL
);

-- Médicos
CREATE TABLE medicos (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  dni TEXT UNIQUE NOT NULL,
  correo TEXT,
  telefono TEXT,
  estado TEXT DEFAULT 'activo',
  especialidad_id INTEGER REFERENCES especialidades(id),
  centro_id INTEGER REFERENCES centro_medico(id)
);

-- Índices para consultas de médicos
CREATE INDEX idx_medicos_especialidad_estado ON medicos(especialidad_id, estado);
CREATE INDEX idx_medicos_nombre ON medicos(nombre);

-- Horarios de atención de médicos
CREATE TABLE horarios_medicos (
  id SERIAL PRIMARY KEY,
  medico_id INTEGER REFERENCES medicos(id),
  dia_semana TEXT CHECK (dia_semana IN ('Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo')),
  hora_inicio TIME,
  hora_fin TIME
);

CREATE INDEX idx_horarios_medico_dia ON horarios_medicos(medico_id, dia_semana);

-- Pacientes
CREATE TABLE pacientes (
  id SERIAL PRIMARY KEY,
  nombre TEXT NOT NULL,
  dni TEXT UNIQUE,
  telefono TEXT,
  correo TEXT,
  fecha_nacimiento DATE,
  estado_vital TEXT CHECK (estado_vital IN ('vivo', 'fallecido')) DEFAULT 'vivo',
  fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índice por DNI para búsqueda rápida
CREATE UNIQUE INDEX idx_pacientes_dni ON pacientes(dni);

-- Citas médicas
CREATE TABLE citas (
  id SERIAL PRIMARY KEY,
  paciente_id INTEGER REFERENCES pacientes(id),
  medico_id INTEGER REFERENCES medicos(id),
  fecha TIMESTAMP NOT NULL,
  motivo TEXT,
  estado TEXT CHECK (estado IN ('agendada', 'reprogramada', 'cancelada', 'asistida', 'no asistió')) DEFAULT 'agendada',
  observaciones TEXT
);

-- Índices para rendimiento en citas
CREATE INDEX idx_citas_medico_fecha ON citas(medico_id, fecha);
CREATE INDEX idx_citas_paciente_fecha ON citas(paciente_id, fecha);
CREATE INDEX idx_citas_estado ON citas(estado);

-- Historial de cambios en citas
CREATE TABLE historial_citas (
  id SERIAL PRIMARY KEY,
  cita_id INTEGER REFERENCES citas(id),
  fecha_cambio TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  estado_anterior TEXT,
  estado_nuevo TEXT,
  comentario TEXT
);

-- Índice para historial por cita
CREATE INDEX idx_historial_por_cita ON historial_citas(cita_id);
