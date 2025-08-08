<template>
  <div class="admin-panel">
    <div class="admin-panel__header">
      <div class="admin-panel__title">
        <div class="admin-panel__logo">
          <img src="@/assets/LOGO.png" alt="Onkos Instituto del Cáncer" />
        </div>
        <div class="admin-panel__title-text">
          <h1>Panel Administrativo</h1>
          <p>Gestión de médicos, usuarios y pacientes</p>
        </div>
      </div>
      <div class="admin-panel__user">
        <span>Bienvenido, {{ adminUser?.nombre }}</span>
        <button @click="logout" class="btn btn--secondary">
          <i class="fas fa-sign-out-alt"></i>
          Cerrar Sesión
        </button>
      </div>
    </div>
    
    <div class="admin-panel__tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="['admin-panel__tab', { 'admin-panel__tab--active': activeTab === tab.id }]"
      >
        <i :class="tab.icon"></i>
        {{ tab.name }}
      </button>
    </div>
    
    <div class="admin-panel__content">
      <!-- Tab Médicos -->
      <div v-if="activeTab === 'medicos'" class="admin-panel__section">
        <div class="admin-panel__section-header">
          <h2>Gestión de Médicos</h2>
          <button @click="showMedicoForm = true" class="btn btn--primary">
            <i class="fas fa-plus"></i>
            Agregar Médico
          </button>
        </div>
        
        <div class="admin-panel__table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Especialidad</th>
                <th>Teléfono</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="medico in medicos" :key="medico.id">
                <td>{{ medico.nombre }}</td>
                <td>{{ medico.dni }}</td>
                <td>{{ medico.especialidad }}</td>
                <td>{{ medico.telefono }}</td>
                <td>
                  <span :class="['status', `status--${medico.estado}`]">
                    {{ medico.estado }}
                  </span>
                </td>
                <td>
                  <button @click="editMedico(medico)" class="btn btn--small">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="viewAgenda(medico)" class="btn btn--small btn--primary">
                    <i class="fas fa-calendar-alt"></i>
                  </button>
                  <button @click="deleteMedico(medico.id)" class="btn btn--small btn--danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Tab Usuarios -->
      <div v-if="activeTab === 'usuarios'" class="admin-panel__section">
        <div class="admin-panel__section-header">
          <h2>Gestión de Usuarios</h2>
          <button @click="showUsuarioForm = true" class="btn btn--primary">
            <i class="fas fa-plus"></i>
            Agregar Usuario
          </button>
        </div>
        
        <div class="admin-panel__table">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Roles</th>
                <th>Estado</th>
                <th>Fecha Creación</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="usuario in usuarios" :key="usuario.id">
                <td>{{ usuario.nombre }}</td>
                <td>{{ usuario.correo }}</td>
                <td>{{ usuario.roles?.join(', ') }}</td>
                <td>
                  <span :class="['status', `status--${usuario.estado}`]">
                    {{ usuario.estado }}
                  </span>
                </td>
                <td>{{ formatDate(usuario.fecha_creacion) }}</td>
                <td>
                  <button @click="editUsuario(usuario)" class="btn btn--small">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button @click="deleteUsuario(usuario.id)" class="btn btn--small btn--danger">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Tab Pacientes -->
      <div v-if="activeTab === 'pacientes'" class="admin-panel__section">
        <div class="admin-panel__section-header">
          <h2>Gestión de Pacientes</h2>
          <button class="btn btn--primary">
            <i class="fas fa-plus"></i>
            Agregar Paciente
          </button>
        </div>
        
        <div class="admin-panel__table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Teléfono</th>
                <th>Correo</th>
                <th>Fecha Nacimiento</th>
                <th>Estado</th>
                <th>Fecha Registro</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="paciente in pacientes" :key="paciente.id">
                <td>{{ paciente.id }}</td>
                <td>{{ paciente.nombre }}</td>
                <td>{{ paciente.dni }}</td>
                <td>{{ paciente.telefono }}</td>
                <td>{{ paciente.correo }}</td>
                <td>{{ formatDate(paciente.fecha_nacimiento) }}</td>
                <td>
                  <span :class="['status', `status--${paciente.estado}`]">
                    {{ paciente.estado }}
                  </span>
                </td>
                <td>{{ formatDate(paciente.fecha_registro) }}</td>
                <td>
                  <button class="btn btn--small btn--secondary">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn btn--small btn--danger" @click="deletePaciente(paciente.id)">
                    <i class="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Tab Agenda -->
      <div class="admin-panel__agenda-section" v-if="activeTab === 'agenda'">
        <div class="admin-panel__section-header">
          <h3>Agenda de Médicos</h3>
          <div class="admin-panel__agenda-controls">
            <select v-model="selectedMedico" @change="loadCitas" class="admin-panel__select">
              <option value="">Seleccionar médico</option>
              <option v-for="medico in medicos" :key="medico.id" :value="medico.id">
                {{ medico.nombre }} - {{ medico.especialidad }}
              </option>
            </select>
            <button @click="showHorarioModal = true" class="btn btn--secondary">
              <i class="fas fa-clock"></i> Configurar Horarios
            </button>
            <button @click="showCitaModal = true" class="btn btn--primary">
              <i class="fas fa-plus"></i> Nueva Cita
            </button>
          </div>
        </div>

        <div class="admin-panel__calendar-container">
          <div class="admin-panel__calendar-header">
            <button @click="previousMonth" class="btn btn--secondary">
              <i class="fas fa-chevron-left"></i>
            </button>
            <h4>{{ currentMonthYear }}</h4>
            <button @click="nextMonth" class="btn btn--secondary">
              <i class="fas fa-chevron-right"></i>
            </button>
            <button @click="refreshCalendar" class="btn btn--secondary" title="Actualizar">
              <i class="fas fa-sync-alt"></i>
            </button>
          </div>

          <div class="admin-panel__calendar">
            <div class="admin-panel__calendar-weekdays">
              <div v-for="day in weekDays" :key="day" class="admin-panel__calendar-weekday">
                {{ day }}
              </div>
            </div>
            <div class="admin-panel__calendar-grid">
              <div 
                v-for="day in calendarDays" 
                :key="day.date"
                class="admin-panel__calendar-day"
                :class="{
                  'today': day.isToday,
                  'has-appointments': day.appointments && day.appointments.length > 0,
                  'other-month': !day.isCurrentMonth
                }"
                @click="selectDate(day)"
              >
                <span class="admin-panel__calendar-day-number">{{ day.dayNumber }}</span>
                <div v-if="day.appointments && day.appointments.length > 0" class="admin-panel__calendar-appointments">
                  <div class="admin-panel__appointment-indicator">
                    {{ day.appointments.length }} cita{{ day.appointments.length > 1 ? 's' : '' }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Modal Configurar Horarios -->
    <div v-if="showHorarioModal" class="modal-overlay" @click="showHorarioModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Configurar Horarios - {{ selectedMedicoNombre }}</h3>
          <button @click="showHorarioModal = false" class="btn btn--small">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div class="horario-config">
            <div v-for="(day, index) in weekDays" :key="index" class="horario-day">
              <div class="day-header">
                <label class="checkbox-label">
                  <input type="checkbox" v-model="horariosConfig[index].activo">
                  <span>{{ day }}</span>
                </label>
              </div>
              <div v-if="horariosConfig[index].activo" class="day-hours">
                <div class="time-range">
                  <label>Inicio:</label>
                  <input type="time" v-model="horariosConfig[index].inicio" class="form-input">
                </div>
                <div class="time-range">
                  <label>Fin:</label>
                  <input type="time" v-model="horariosConfig[index].fin" class="form-input">
                </div>
                <div class="time-range">
                  <label>Duración cita (min):</label>
                  <input type="number" v-model="horariosConfig[index].duracion" min="15" max="120" step="15" class="form-input">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button @click="showHorarioModal = false" class="btn btn--secondary">Cancelar</button>
          <button @click="saveHorarios" class="btn btn--primary">Guardar Horarios</button>
        </div>
      </div>
    </div>
    
    <!-- Modal Nueva Cita -->
    <div v-if="showCitaModal" class="modal-overlay" @click="showCitaModal = false">
      <div class="modal" @click.stop>
        <div class="modal-header">
          <h3>Nueva Cita</h3>
          <button @click="showCitaModal = false" class="btn btn--small">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="createCita" class="cita-form">
            <div class="form-group">
              <label>Médico:</label>
              <select v-model="nuevaCita.medico_id" required class="form-select">
                <option value="">Seleccionar médico</option>
                <option v-for="medico in medicos" :key="medico.id" :value="medico.id">
                  {{ medico.nombre }} - {{ medico.especialidad }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Paciente:</label>
              <select v-model="nuevaCita.paciente_id" required class="form-select">
                <option value="">Seleccionar paciente</option>
                <option v-for="paciente in pacientes" :key="paciente.id" :value="paciente.id">
                  {{ paciente.nombre }} - {{ paciente.dni }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Fecha:</label>
              <input type="date" v-model="nuevaCita.fecha" required class="form-input">
            </div>
            <div class="form-group">
              <label>Hora:</label>
              <input type="time" v-model="nuevaCita.hora" required class="form-input">
            </div>
            <div class="form-group">
              <label>Duración (minutos):</label>
              <input type="number" v-model="nuevaCita.duracion" min="15" max="120" step="15" required class="form-input">
            </div>
            <div class="form-group">
              <label>Motivo:</label>
              <textarea v-model="nuevaCita.motivo" rows="3" class="form-input"></textarea>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button @click="showCitaModal = false" class="btn btn--secondary">Cancelar</button>
          <button @click="createCita" class="btn btn--primary">Crear Cita</button>
        </div>
      </div>
    </div>

    <!-- Modal Detalles de Citas -->
    <div v-if="showCitasModal" class="modal-overlay" @click="showCitasModal = false">
      <div class="modal modal--large" @click.stop>
        <div class="modal-header">
          <h3>Citas del {{ selectedDateFormatted }}</h3>
          <button @click="showCitasModal = false" class="modal-close">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal-body">
          <div v-if="selectedDateCitas.length === 0" class="admin-panel__empty-state">
            <i class="fas fa-calendar-day"></i>
            <p>No hay citas programadas para este día</p>
          </div>
          <div v-else class="admin-panel__citas-list">
            <div v-for="cita in selectedDateCitas" :key="cita.id" class="admin-panel__cita-item">
              <div class="admin-panel__cita-header">
                <div class="admin-panel__cita-time">
                  <i class="fas fa-clock"></i>
                  {{ formatCitaTime(cita.fecha) }}
                </div>
                <div class="admin-panel__cita-status" :class="`status--${cita.estado}`">
                  {{ cita.estado }}
                </div>
              </div>
              <div class="admin-panel__cita-details">
                <div class="admin-panel__cita-patient">
                  <h4><i class="fas fa-user"></i> {{ cita.paciente_nombre }}</h4>
                  <p><strong>DNI:</strong> {{ cita.paciente_dni }}</p>
                  <p><strong>Teléfono:</strong> {{ cita.paciente_telefono }}</p>
                </div>
                <div class="admin-panel__cita-medical">
                  <p><strong>Médico:</strong> {{ cita.medico_nombre }}</p>
                  <p><strong>Especialidad:</strong> {{ cita.especialidad_nombre }}</p>
                  <p><strong>Duración:</strong> {{ cita.duracion }} minutos</p>
                </div>
                <div class="admin-panel__cita-motive" v-if="cita.motivo">
                  <p><strong>Motivo:</strong> {{ cita.motivo }}</p>
                </div>
              </div>
              <div class="admin-panel__cita-actions">
                <button @click="editCita(cita)" class="btn btn--small btn--secondary">
                  <i class="fas fa-edit"></i> Editar
                </button>
                <button @click="cancelCita(cita.id)" class="btn btn--small btn--danger">
                  <i class="fas fa-times"></i> Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminPanel',
  data() {
    return {
      activeTab: 'medicos',
      adminUser: null,
      medicos: [],
      usuarios: [],
      pacientes: [],
      citas: [],
      showMedicoForm: false,
      showUsuarioForm: false,
      showPacienteForm: false,
      showHorarioModal: false,
      showCitaModal: false,
      showCitasModal: false, // Nuevo modal para detalles de citas
      selectedMedico: '',
      selectedDate: null,
      selectedDateCitas: [], // Citas del día seleccionado
      currentDate: new Date(),
      updateInterval: null, // Para las actualizaciones en tiempo real
      weekDays: ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'],
      horariosConfig: [
        { activo: false, inicio: '09:00', fin: '17:00', duracion: 30 },
        { activo: false, inicio: '09:00', fin: '17:00', duracion: 30 },
        { activo: false, inicio: '09:00', fin: '17:00', duracion: 30 },
        { activo: false, inicio: '09:00', fin: '17:00', duracion: 30 },
        { activo: false, inicio: '09:00', fin: '17:00', duracion: 30 },
        { activo: false, inicio: '09:00', fin: '17:00', duracion: 30 },
        { activo: false, inicio: '09:00', fin: '17:00', duracion: 30 }
      ],
      nuevaCita: {
        medico_id: '',
        paciente_id: '',
        fecha: '',
        hora: '',
        duracion: 30,
        motivo: ''
      },
      tabs: [
        { id: 'medicos', name: 'Médicos', icon: 'fas fa-user-md' },
        { id: 'usuarios', name: 'Usuarios', icon: 'fas fa-users' },
        { id: 'pacientes', name: 'Pacientes', icon: 'fas fa-user-injured' },
        { id: 'agenda', name: 'Agenda', icon: 'fas fa-calendar-alt' }
      ]
    }
  },
  computed: {
    currentMonthYear() {
      return this.currentDate.toLocaleDateString('es-ES', { 
        month: 'long', 
        year: 'numeric' 
      }).replace(/^\w/, c => c.toUpperCase())
    },
    selectedMedicoNombre() {
      const medico = this.medicos.find(m => m.id == this.selectedMedico)
      return medico ? medico.nombre : ''
    },
    calendarDays() {
      const year = this.currentDate.getFullYear()
      const month = this.currentDate.getMonth()
      const firstDay = new Date(Date.UTC(year, month, 1))
      const lastDay = new Date(Date.UTC(year, month + 1, 0))
      
      // Obtener el día de la semana del primer día (0 = domingo, 1 = lunes, etc.)
      let firstDayOfWeek = firstDay.getUTCDay()
      // Convertir a lunes = 0, domingo = 6
      firstDayOfWeek = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
      
      const days = []
      const today = new Date()
      
      // Agregar días del mes anterior para completar la primera semana
      const startDate = new Date(firstDay)
      startDate.setUTCDate(startDate.getUTCDate() - firstDayOfWeek)
      
      // Generar 42 días (6 semanas x 7 días)
      for (let i = 0; i < 42; i++) {
        const date = new Date(startDate)
        date.setUTCDate(startDate.getUTCDate() + i)
        
        const dateStr = date.toISOString().split('T')[0]
        const isToday = date.toISOString().split('T')[0] === today.toISOString().split('T')[0]
        const isCurrentMonth = date.getUTCMonth() === month
        
        // Buscar citas para este día
        const citasDelDia = this.citas.filter(cita => {
          const citaDate = new Date(cita.fecha)
          return citaDate.toISOString().split('T')[0] === dateStr
        })
        
        days.push({
          date: dateStr,
          dayNumber: date.getUTCDate(),
          isCurrentMonth,
          isToday,
          appointments: citasDelDia
        })
      }
      
      return days
    },
    selectedDateFormatted() {
      if (!this.selectedDate) return '';
      // Usamos la fecha directamente sin ajustes de zona horaria
      const [year, month, day] = this.selectedDate.date.split('-');
      const fecha = new Date(year, month - 1, day);
      return fecha.toLocaleDateString('es-ES', { 
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    }
  },
      watch: {
      selectedMedico: {
        immediate: true,
        handler(newValue) {
          if (this.activeTab === 'agenda') {
            this.loadCitas()
          }
        }
      },
      activeTab: {
        immediate: true,
        handler(newValue) {
          if (newValue === 'agenda') {
            this.loadCitas()
          }
        }
      },
      citas: {
        deep: true,
        handler() {
          if (this.activeTab === 'agenda') {
            this.$nextTick(() => {
              this.updateCalendarDays()
            })
          }
        }
      }
    },
  async mounted() {
    // Verificar si hay token de admin
    const token = localStorage.getItem('adminToken')
    if (!token) {
      this.$router.push('/')
      return
    }
    
    // Configurar axios para incluir el token
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    
    await this.loadData()
    
    // Iniciar actualización en tiempo real del calendario
    this.startRealTimeUpdates()
  },
  
  beforeDestroy() {
    // Limpiar el intervalo cuando se destruye el componente
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
    }
  },
  methods: {
    async loadData() {
      try {
        const [medicosRes, usuariosRes, pacientesRes] = await Promise.all([
          axios.get('/api/admin/medicos'),
          axios.get('/api/admin/usuarios'),
          axios.get('/api/admin/pacientes')
        ])
        
        this.medicos = medicosRes.data
        this.usuarios = usuariosRes.data
        this.pacientes = pacientesRes.data
      } catch (error) {
        console.error('Error cargando datos:', error)
      }
    },
    
    async loadCitas() {
      try {
        let url = '/api/admin/citas'
        if (this.selectedMedico) {
          const medicoId = parseInt(this.selectedMedico)
          url = `/api/admin/citas?medico_id=${medicoId}`
          console.log('🔄 Cargando citas para médico ID:', medicoId)
        } else {
          url = '/api/admin/citas'
          console.log('🔄 Cargando todas las citas')
        }
        
        const response = await axios.get(url)
        console.log('📊 Citas cargadas:', response.data)
        this.citas = response.data
      } catch (error) {
        console.error('Error cargando citas:', error)
        this.citas = []
      }
    },
    
    updateCalendarDays() {
      // Actualizar las citas en los días del calendario
      this.calendarDays.forEach(day => {
        const citasDelDia = this.citas.filter(cita => {
          const citaDate = new Date(cita.fecha).toISOString().split('T')[0]
          return citaDate === day.date
        })
        day.appointments = citasDelDia
      })
    },
    
    editMedico(medico) {
      // Implementar edición de médico
      console.log('Editar médico:', medico)
    },
    
    async deleteMedico(id) {
      if (confirm('¿Estás seguro de eliminar este médico?')) {
        try {
          await axios.delete(`/api/admin/medicos/${id}`)
          await this.loadData()
        } catch (error) {
          console.error('Error eliminando médico:', error)
        }
      }
    },
    
    editUsuario(usuario) {
      // Implementar edición de usuario
      console.log('Editar usuario:', usuario)
    },
    
    async deleteUsuario(id) {
      if (confirm('¿Estás seguro de eliminar este usuario?')) {
        try {
          await axios.delete(`/api/admin/usuarios/${id}`)
          await this.loadData()
        } catch (error) {
          console.error('Error eliminando usuario:', error)
        }
      }
    },
    
    editPaciente(paciente) {
      // Implementar edición de paciente
      console.log('Editar paciente:', paciente)
    },
    
    async deletePaciente(id) {
      if (confirm('¿Estás seguro de eliminar este paciente?')) {
        try {
          await axios.delete(`/api/admin/pacientes/${id}`)
          await this.loadData()
        } catch (error) {
          console.error('Error eliminando paciente:', error)
        }
      }
    },
    
    formatDate(date) {
      if (!date) return '-'
      return new Date(date).toLocaleDateString('es-ES')
    },
    
    logout() {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('adminUser')
      this.$router.push('/')
    },
    
    // Métodos para agenda
    viewAgenda(medico) {
      this.selectedMedico = medico.id
      this.activeTab = 'agenda'
      this.loadCitas() // Cargar citas al cambiar de médico
    },
    
    previousMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1)
    },
    
    nextMonth() {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1)
    },
    
    selectDate(day) {
      this.selectedDate = day
      this.showCitasDetails() // Cargar citas para el día seleccionado
    },
    
    async saveHorarios() {
      try {
        // Aquí se enviaría la configuración de horarios al backend
        console.log('Guardando horarios:', this.horariosConfig)
        this.showHorarioModal = false
        // await axios.post(`/api/admin/medicos/${this.selectedMedico}/horarios`, this.horariosConfig)
      } catch (error) {
        console.error('Error guardando horarios:', error)
      }
    },
    
    async createCita() {
      try {
        // Aquí se enviaría la nueva cita al backend
        console.log('Creando cita:', this.nuevaCita)
        this.showCitaModal = false
        // await axios.post('/api/admin/citas', this.nuevaCita)
        
        // Limpiar formulario
        this.nuevaCita = {
          medico_id: '',
          paciente_id: '',
          fecha: '',
          hora: '',
          duracion: 30,
          motivo: ''
        }
      } catch (error) {
        console.error('Error creando cita:', error)
      }
    },

    // Nuevo método para mostrar detalles de citas
    async showCitasDetails() {
      if (this.selectedDate) {
        try {
          // Usamos directamente la fecha del día seleccionado sin ajustes de zona horaria
          const fechaStr = this.selectedDate.date;
          console.log('📅 Consultando citas para fecha:', fechaStr);
          
          const response = await axios.get(`/api/admin/citas?fecha=${fechaStr}`);
          this.selectedDateCitas = response.data;
          this.showCitasModal = true;
        } catch (error) {
          console.error('Error cargando citas del día:', error);
        }
      }
    },

    // Nuevo método para editar cita
    editCita(cita) {
      this.nuevaCita = {
        medico_id: cita.medico_id,
        paciente_id: cita.paciente_id,
        fecha: cita.fecha,
        hora: cita.hora,
        duracion: cita.duracion,
        motivo: cita.motivo
      };
      this.showCitaModal = true;
      this.showCitasModal = false; // Cerrar el modal de detalles
    },

    // Nuevo método para cancelar cita
    async cancelCita(id) {
      if (confirm('¿Estás seguro de cancelar esta cita?')) {
        try {
          await axios.put(`/api/admin/citas/${id}/cancelar`);
          await this.loadCitas(); // Recargar citas para actualizar el estado
          this.showCitasModal = false;
        } catch (error) {
          console.error('Error cancelando cita:', error);
        }
      }
    },

    formatCitaTime(dateString) {
      const date = new Date(dateString);
      // Extraemos solo la hora y minutos sin ajustes de zona horaria
      const hours = date.getUTCHours().toString().padStart(2, '0');
      const minutes = date.getUTCMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    },
    
    // Método para iniciar actualizaciones en tiempo real
    startRealTimeUpdates() {
      // Actualizar cada 30 segundos si hay un médico seleccionado
      this.updateInterval = setInterval(() => {
        if (this.selectedMedico && this.activeTab === 'agenda') {
          this.loadCitas()
        }
      }, 30000) // 30 segundos
    },
    
    // Método para actualizar el calendario inmediatamente
    async refreshCalendar() {
      if (this.selectedMedico) {
        await this.loadCitas()
        this.updateCalendarDays()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-panel {
  min-height: 100vh;
  background: $bg-light;
  
  &__header {
    background: white;
    padding: 2rem;
    border-bottom: 1px solid $border-color;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  &__title {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  
  &__logo {
    img {
      height: 50px;
      width: auto;
      object-fit: contain;
    }
  }
  
  &__title-text {
    h1 {
      margin: 0 0 0.5rem 0;
      color: $text-primary;
      font-size: 1.5rem;
    }
    
    p {
      margin: 0;
      color: $text-secondary;
      font-size: 0.9rem;
    }
  }
  
  &__user {
    display: flex;
    align-items: center;
    gap: 1rem;
    
    span {
      color: $text-secondary;
    }
  }
  
  &__tabs {
    background: white;
    border-bottom: 1px solid $border-color;
    display: flex;
    gap: 0;
  }
  
  &__tab {
    background: none;
    border: none;
    padding: 1rem 2rem;
    cursor: pointer;
    color: $text-secondary;
    border-bottom: 3px solid transparent;
    transition: all 0.3s ease;
    
    &:hover {
      color: $primary-color;
    }
    
    &--active {
      color: $primary-color;
      border-bottom-color: $primary-color;
    }
    
    i {
      margin-right: 0.5rem;
    }
  }
  
  &__content {
    padding: 2rem;
  }
  
  &__section {
    background: white;
    border-radius: 12px;
    padding: 2rem;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  &__section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h2 {
      margin: 0;
      color: $text-primary;
    }
  }
  
  &__table {
    overflow-x: auto;
    
    table {
      width: 100%;
      border-collapse: collapse;
      
      th, td {
        padding: 1rem;
        text-align: left;
        border-bottom: 1px solid $border-color;
      }
      
      th {
        background: $bg-light;
        font-weight: 600;
        color: $text-primary;
      }
      
      td {
        color: $text-secondary;
      }
    }
  }
}

.status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  
  &--activo {
    background: #dcfce7;
    color: #166534;
  }
  
  &--inactivo {
    background: #fef2f2;
    color: #dc2626;
  }
  
  &--suspendido {
    background: #fef3c7;
    color: #92400e;
  }
}

.btn--danger {
  background: $error-color;
  color: white;
  
  &:hover {
    background: darken($error-color, 10%);
  }
}

// Estilos para agenda
.admin-panel__agenda-controls {
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-bottom: 1rem;
}

.admin-panel__select {
  padding: 0.5rem;
  border: 1px solid $border-color;
  border-radius: 4px;
  background: white;
  min-width: 250px;
}

.admin-panel__calendar-container {
  background: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.admin-panel__calendar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding: 0 1rem;
  
  h4 {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    color: $text-primary;
  }
  
  button {
    padding: 0.5rem;
    min-width: 40px;
    
    &:hover {
      background: $primary-color;
      color: white;
    }
  }
}

.calendar-grid {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: $primary-color;
  color: white;
  
  .weekday {
    padding: 1rem;
    text-align: center;
    font-weight: 600;
    font-size: 0.9rem;
  }
}

.calendar-days {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
}

.calendar-day {
  min-height: 80px;
  padding: 0.5rem;
  border: 1px solid $border-color;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  
  &:hover {
    background: $bg-light;
  }
  
  &.other-month {
    background: #f8f9fa;
    color: #6c757d;
  }
  
  &.today {
    background: $primary-color;
    color: white;
    
    .day-number {
      font-weight: bold;
    }
  }
  
  &.has-appointments {
    background: #e3f2fd;
    
    .appointment-indicator {
      background: $accent-color;
      color: white;
      font-size: 0.7rem;
      padding: 2px 6px;
      border-radius: 10px;
      position: absolute;
      bottom: 4px;
      right: 4px;
    }
  }
  
  .day-number {
    font-size: 0.9rem;
    font-weight: 500;
  }
}

.admin-panel__empty-state {
  text-align: center;
  padding: 4rem 2rem;
  color: $text-secondary;
  
  i {
    font-size: 3rem;
    margin-bottom: 1rem;
    color: $border-color;
  }
  
  h3 {
    margin: 0 0 0.5rem 0;
    color: $text-primary;
  }
  
  p {
    margin: 0;
  }
}

// Estilos para modales
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
}

.modal--large {
  max-width: 900px;
  max-height: 95vh;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid $border-color;
  
  h3 {
    margin: 0;
    color: $text-primary;
  }
}

.modal-body {
  padding: 1.5rem;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding: 1.5rem;
  border-top: 1px solid $border-color;
}

.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  padding-top: 1rem;
}

.modal-close {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  color: $text-secondary;
  transition: color 0.2s ease;

  &:hover {
    color: $primary-color;
  }
}

// Estilos para configuración de horarios
.horario-config {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.horario-day {
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 1rem;
  
  .day-header {
    margin-bottom: 1rem;
  }
  
  .day-hours {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-weight: 500;
  
  input[type="checkbox"] {
    width: 18px;
    height: 18px;
  }
}

.time-range {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  
  label {
    font-size: 0.8rem;
    color: $text-secondary;
  }
}

// Estilos para formulario de citas
.cita-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-weight: 500;
    color: $text-primary;
  }
}

.form-input, .form-select {
  padding: 0.75rem;
  border: 1px solid $border-color;
  border-radius: 6px;
  font-size: 0.9rem;
  
  &:focus {
    outline: none;
    border-color: $primary-color;
    box-shadow: 0 0 0 2px rgba($primary-color, 0.1);
  }
}

textarea.form-input {
  resize: vertical;
  min-height: 80px;
}

.admin-panel__citas-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.admin-panel__cita-item {
  background: $bg-light;
  border: 1px solid $border-color;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.admin-panel__cita-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.admin-panel__cita-time {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: $text-primary;
}

.admin-panel__cita-status {
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  color: white;

  &--pendiente {
    background: $warning-color;
  }
  &--confirmada {
    background: $success-color;
  }
  &--cancelada {
    background: $error-color;
  }
}

.admin-panel__cita-details {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.admin-panel__cita-patient,
.admin-panel__cita-medical {
  flex: 1;
}

.admin-panel__cita-patient h4 {
  margin: 0 0 0.25rem 0;
  color: $text-primary;
}

.admin-panel__cita-patient p,
.admin-panel__cita-medical p {
  margin: 0;
  color: $text-secondary;
  font-size: 0.9rem;
}

.admin-panel__cita-motive {
  margin-top: 0.5rem;
  color: $text-secondary;
  font-size: 0.9rem;
}

.admin-panel__cita-actions {
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.admin-panel__calendar {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.admin-panel__calendar-weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background: $primary-color;
  color: white;
  font-weight: 600;
}

.admin-panel__calendar-weekday {
  padding: 1rem 0.5rem;
  text-align: center;
  border-right: 1px solid rgba(255, 255, 255, 0.2);
  
  &:last-child {
    border-right: none;
  }
}

.admin-panel__calendar-grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
  background: $border-color;
}

.admin-panel__calendar-day {
  background: white;
  min-height: 80px;
  padding: 0.5rem;
  cursor: pointer;
  transition: all 0.2s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    background: $bg-light;
  }

  &.today {
    background: lighten($primary-color, 45%);
    border: 2px solid $primary-color;
  }

  &.has-appointments {
    background: lighten($success-color, 45%);
    border: 2px solid $success-color;
  }

  &.other-month {
    background: #f8f9fa;
    color: $text-secondary;
  }
}

.admin-panel__calendar-day-number {
  font-weight: 600;
  font-size: 1.1rem;
  color: $text-primary;
}

.admin-panel__calendar-appointments {
  margin-top: auto;
}

.admin-panel__appointment-indicator {
  background: $success-color;
  color: white;
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 500;
}
</style> 