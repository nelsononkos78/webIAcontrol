<template>
  <div class="chatbot" :class="{ 'chatbot--open': isOpen }">
    <!-- Botón flotante del chatbot -->
    <button class="chatbot__toggle" @click="toggleChat" :class="{ 'chatbot__toggle--hidden': isOpen }">
      <i class="fas fa-comments"></i>
      <span class="chatbot__notification" v-if="hasUnreadMessages"></span>
    </button>
    
    <!-- Ventana del chat -->
    <div class="chatbot__window" v-if="isOpen">
              <div class="chatbot__header">
          <div class="chatbot__header-info">
            <i class="fas fa-headset"></i>
            <div>
              <h4>Lucía</h4>
              <span>Recepcionista</span>
            </div>
          </div>
          <button class="chatbot__close" @click="closeChat">
            <i class="fas fa-times"></i>
          </button>
        </div>
      
      <div class="chatbot__messages" ref="messagesContainer">
        <div 
          v-for="(message, index) in messages" 
          :key="index"
          class="chatbot__message"
          :class="message.type"
        >
          <div class="chatbot__message-avatar" v-if="message.type === 'bot'">
            <i class="fas fa-headset"></i>
          </div>
          <div class="chatbot__message-content">
            <div class="chatbot__message-text" v-html="formatMessage(message.text)"></div>
            <div class="chatbot__message-time">{{ formatTime(message.timestamp) }}</div>
          </div>
        </div>
        
        <div v-if="isTyping" class="chatbot__message bot">
          <div class="chatbot__message-avatar">
            <i class="fas fa-headset"></i>
          </div>
          <div class="chatbot__message-content">
            <div class="chatbot__typing">
              <div class="chatbot__typing-text">Lucía está escribiendo...</div>
              <div class="chatbot__typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="chatbot__input">
        <form @submit.prevent="sendMessage">
          <input
            v-model="currentMessage"
            type="text"
            placeholder="Escribe tu mensaje..."
            :disabled="isTyping"
            ref="messageInput"
          />
          <button type="submit" :disabled="!currentMessage.trim() || isTyping">
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChatBot',
  data() {
    return {
      isOpen: false,
      messages: [],
      currentMessage: '',
      isTyping: false,
      hasUnreadMessages: false,
      conversationHistory: [],
      // Variables para agendamiento de citas
      isSchedulingAppointment: false,
      appointmentData: {
        nombre: '',
        dni: '',
        telefono: '',
        correo: '',
        fecha_nacimiento: '',
        especialidad: '',
        fecha: '',
        hora: '',
        motivo: ''
      },
      currentStep: '',
      pacienteValidado: null
    }
  },
  mounted() {
    // Mensaje de bienvenida
    this.addMessage({
      type: 'bot',
      text: 'Hola, soy Lucía. ¿En qué puedo ayudarte hoy?',
      timestamp: new Date()
    })
  },
  methods: {
    toggleChat() {
      this.isOpen = !this.isOpen
      if (this.isOpen) {
        this.hasUnreadMessages = false
        this.$nextTick(() => {
          this.$refs.messageInput?.focus()
          this.scrollToBottom()
        })
      }
    },
    
    closeChat() {
      this.isOpen = false
    },
    
    async sendMessage() {
      if (!this.currentMessage.trim() || this.isTyping) return
      
      const userMessage = this.currentMessage.trim()
      this.addMessage({
        type: 'user',
        text: userMessage,
        timestamp: new Date()
      })
      
      this.currentMessage = ''
      this.isTyping = true
      
      try {
        // Primero verificar si está en proceso de agendamiento
        let botResponse = await this.handleAppointmentScheduling(userMessage)
        
        if (botResponse) {
          // Procesar respuesta del agendamiento
          const messages = this.processLongResponse(botResponse)
          
          // Enviar mensajes con delays entre ellos
          for (let i = 0; i < messages.length; i++) {
            const message = messages[i]
            
            // Calcular tiempo de escritura para este mensaje
            const typingTime = this.calculateTypingTime(message)
            
            // Esperar el tiempo calculado
            await this.delay(typingTime)
            
            // Agregar el mensaje
            this.addMessage({
              type: 'bot',
              text: message,
              timestamp: new Date()
            })
            
            // Pequeña pausa entre mensajes si hay más
            if (i < messages.length - 1) {
              await this.delay(500) // 0.5 segundos entre mensajes
            }
          }
        } else {
          // Si no está en agendamiento, usar el chatbot normal
          const response = await axios.post('/api/chat', {
            message: userMessage,
            conversationHistory: this.conversationHistory
          })
          
          // Procesar la respuesta y dividir si es muy larga
          const messages = this.processLongResponse(response.data.response)
          
          // Agregar la conversación al historial
          this.conversationHistory.push(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: response.data.response }
          )
          
          // Limitar el historial a los últimos 10 mensajes
          if (this.conversationHistory.length > 10) {
            this.conversationHistory = this.conversationHistory.slice(-10)
          }
          
          // Enviar mensajes con delays entre ellos
          for (let i = 0; i < messages.length; i++) {
            const message = messages[i]
            
            // Calcular tiempo de escritura para este mensaje
            const typingTime = this.calculateTypingTime(message)
            
            // Esperar el tiempo calculado
            await this.delay(typingTime)
            
            // Agregar el mensaje
            this.addMessage({
              type: 'bot',
              text: message,
              timestamp: new Date()
            })
            
            // Pequeña pausa entre mensajes si hay más
            if (i < messages.length - 1) {
              await this.delay(500) // 0.5 segundos entre mensajes
            }
          }
        }
        
      } catch (error) {
        console.error('Error al enviar mensaje:', error)
        this.addMessage({
          type: 'bot',
          text: 'Lo siento, he tenido un problema técnico. Por favor, intenta de nuevo en unos momentos o contacta directamente con la clínica.',
          timestamp: new Date()
        })
      } finally {
        this.isTyping = false
        this.$nextTick(() => {
          this.scrollToBottom()
        })
      }
    },
    
    // Calcular tiempo de escritura basado en la longitud del texto
    calculateTypingTime(text) {
      // Velocidad promedio de escritura: 40 palabras por minuto
      const wordsPerMinute = 40
      const words = text.split(' ').length
      const minutes = words / wordsPerMinute
      const milliseconds = minutes * 60 * 1000
      
      // Tiempo mínimo de 1 segundo, máximo de 8 segundos
      const minTime = 1000
      const maxTime = 8000
      
      return Math.max(minTime, Math.min(maxTime, milliseconds))
    },
    
    // Función para crear un delay
    delay(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    
    // Procesar respuestas largas y dividirlas en múltiples mensajes
    processLongResponse(text) {
      // Si el texto es corto, devolver como un solo mensaje
      if (text.length <= 200) {
        return [text]
      }
      
      // Dividir por párrafos si existen
      const paragraphs = text.split('\n\n').filter(p => p.trim())
      
      if (paragraphs.length > 1) {
        return paragraphs.map(p => p.trim())
      }
      
      // Dividir por oraciones si es muy largo
      const sentences = text.match(/[^.!?]+[.!?]+/g) || [text]
      
      if (sentences.length <= 3) {
        return [text]
      }
      
      // Agrupar oraciones en mensajes de tamaño razonable
      const messages = []
      let currentMessage = ''
      
      for (const sentence of sentences) {
        if ((currentMessage + sentence).length > 300) {
          if (currentMessage.trim()) {
            messages.push(currentMessage.trim())
          }
          currentMessage = sentence
        } else {
          currentMessage += sentence
        }
      }
      
      if (currentMessage.trim()) {
        messages.push(currentMessage.trim())
      }
      
      return messages.length > 0 ? messages : [text]
    },
    
    addMessage(message) {
      this.messages.push(message)
      this.$nextTick(() => {
        this.scrollToBottom()
      })
      
      // Mostrar notificación si el chat está cerrado
      if (!this.isOpen && message.type === 'bot') {
        this.hasUnreadMessages = true
      }
    },
    
    scrollToBottom() {
      const container = this.$refs.messagesContainer
      if (container) {
        container.scrollTop = container.scrollHeight
      }
    },
    
    formatMessage(text) {
      // Convertir URLs en enlaces
      return text.replace(
        /(https?:\/\/[^\s]+)/g,
        '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
      )
    },
    
    formatTime(timestamp) {
      return new Date(timestamp).toLocaleTimeString('es-ES', {
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    
    // Métodos para agendamiento de citas
    async handleAppointmentScheduling(userMessage) {
      if (!this.isSchedulingAppointment) {
        // Detectar si el usuario quiere agendar una cita
        const appointmentKeywords = [
          'agendar', 'cita', 'cita médica', 'consulta', 'turno', 'hora médica',
          'quiero una cita', 'necesito una cita', 'me gustaría agendar',
          'reservar cita', 'programar cita', 'hacer una cita',
          'cita con el doctor', 'cita con el médico', 'ver al doctor',
          'consulta médica', 'revisión médica', 'chequeo médico'
        ]
        const wantsAppointment = appointmentKeywords.some(keyword => 
          userMessage.toLowerCase().includes(keyword)
        )
        
        if (wantsAppointment) {
          this.isSchedulingAppointment = true
          this.currentStep = 'nombre'
          return 'Perfecto, te ayudo a agendar tu cita. ¿Cuál es tu nombre completo?'
        }
        return null
      }
      
      // Procesar el paso actual del agendamiento
      return await this.processAppointmentStep(userMessage)
    },
    
    async processAppointmentStep(userMessage) {
      switch (this.currentStep) {
        case 'nombre':
          this.appointmentData.nombre = userMessage
          this.currentStep = 'dni'
          return '¿Cuál es tu número de DNI? (8 dígitos)'
          
        case 'dni':
          if (!/^\d{8}$/.test(userMessage)) {
            return 'El DNI debe tener exactamente 8 dígitos. Por favor, ingresa tu DNI correctamente.'
          }
          this.appointmentData.dni = userMessage
          this.currentStep = 'telefono'
          return '¿Cuál es tu número de teléfono?'
          
        case 'telefono':
          this.appointmentData.telefono = userMessage
          this.currentStep = 'correo'
          return '¿Cuál es tu correo electrónico?'
          
        case 'correo':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userMessage)) {
            return 'Por favor, ingresa un correo electrónico válido.'
          }
          this.appointmentData.correo = userMessage
          this.currentStep = 'validar_paciente'
          return await this.validarPaciente()
          
        case 'fecha_nacimiento':
          // Validar formato de fecha DD/MM/AAAA
          const dateRegex = /^(\d{2})\/(\d{2})\/(\d{4})$/
          const match = userMessage.match(dateRegex)
          if (!match) {
            return 'Por favor, ingresa la fecha en formato DD/MM/AAAA (ejemplo: 15/03/1985)'
          }
          
          const [, day, month, year] = match
          const fecha = `${year}-${month}-${day}`
          this.appointmentData.fecha_nacimiento = fecha
          this.currentStep = 'especialidad'
          return '¿Qué especialidad necesitas? Tenemos:\n• Oncología Médica\n• Radioterapia\n• Cirugía Oncológica\n• Psicología Oncológica\n• Nutrición Oncológica\n• Medicina Nuclear\n• Hematología Oncológica'
          
        case 'especialidad':
          this.appointmentData.especialidad = userMessage
          this.currentStep = 'fecha'
          return '¿Qué fecha prefieres para tu cita? (formato: DD/MM/AAAA)'
          
        case 'fecha':
          const fechaMatch = userMessage.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)
          if (!fechaMatch) {
            return 'Por favor, ingresa la fecha en formato DD/MM/AAAA'
          }
          
          const [, fDay, fMonth, fYear] = fechaMatch
          const fechaCita = `${fYear}-${fMonth}-${fDay}`
          
          // Validar que la fecha sea futura
          const fechaActual = new Date()
          const fechaSeleccionada = new Date(fechaCita)
          if (fechaSeleccionada <= fechaActual) {
            return 'La fecha debe ser futura. Por favor, selecciona una fecha posterior a hoy.'
          }
          
          this.appointmentData.fecha = fechaCita
          this.currentStep = 'hora'
          return '¿A qué hora prefieres? (horario de atención: 8:00 - 18:00)'
          
        case 'hora':
          const horaMatch = userMessage.match(/^(\d{1,2}):(\d{2})$/)
          if (!horaMatch) {
            return 'Por favor, ingresa la hora en formato HH:MM (ejemplo: 10:00)'
          }
          
          const [, hora, minutos] = horaMatch
          const horaNum = parseInt(hora)
          if (horaNum < 8 || horaNum >= 18) {
            return 'El horario de atención es de 8:00 a 18:00. Por favor, selecciona una hora dentro de este rango.'
          }
          
          this.appointmentData.hora = `${hora.padStart(2, '0')}:${minutos}`
          this.currentStep = 'motivo'
          return '¿Cuál es el motivo de tu consulta? (opcional)'
          
        case 'motivo':
          this.appointmentData.motivo = userMessage
          this.currentStep = 'confirmar'
          return await this.confirmarCita()
          
        case 'confirmar':
          if (userMessage.toLowerCase().includes('sí') || userMessage.toLowerCase().includes('si') || userMessage.toLowerCase().includes('confirmar')) {
            return await this.crearCita()
          } else {
            this.resetAppointmentData()
            return 'Entendido, cancelamos el agendamiento. ¿En qué más puedo ayudarte?'
          }
          
        case 'reactivar':
          if (userMessage.toLowerCase().includes('sí') || userMessage.toLowerCase().includes('si')) {
            try {
              await axios.put(`/api/chatbot/reactivar-paciente/${this.pacienteValidado.id}`)
              this.currentStep = 'especialidad'
              return `¡Perfecto! Tu cuenta ha sido reactivada. ¿Qué especialidad necesitas? Tenemos:\n• Oncología Médica\n• Radioterapia\n• Cirugía Oncológica\n• Psicología Oncológica\n• Nutrición Oncológica\n• Medicina Nuclear\n• Hematología Oncológica`
            } catch (error) {
              console.error('Error reactivando paciente:', error)
              return 'Error al reactivar tu cuenta. Por favor, contacta directamente con la clínica.'
            }
          } else {
            this.resetAppointmentData()
            return 'Entendido, cancelamos el agendamiento. ¿En qué más puedo ayudarte?'
          }
          
        case 'actualizar':
          if (userMessage.toLowerCase().includes('sí') || userMessage.toLowerCase().includes('si')) {
            try {
              await axios.put(`/api/chatbot/actualizar-paciente/${this.pacienteValidado.id}`, {
                nombre: this.appointmentData.nombre,
                telefono: this.appointmentData.telefono,
                correo: this.appointmentData.correo,
                fecha_nacimiento: this.pacienteValidado.fecha_nacimiento
              })
              this.currentStep = 'especialidad'
              return `¡Perfecto! Tu información ha sido actualizada. ¿Qué especialidad necesitas? Tenemos:\n• Oncología Médica\n• Radioterapia\n• Cirugía Oncológica\n• Psicología Oncológica\n• Nutrición Oncológica\n• Medicina Nuclear\n• Hematología Oncológica`
            } catch (error) {
              console.error('Error actualizando paciente:', error)
              return 'Error al actualizar tu información. Por favor, contacta directamente con la clínica.'
            }
          } else {
            this.currentStep = 'especialidad'
            return `Entendido, usaremos tus datos existentes. ¿Qué especialidad necesitas? Tenemos:\n• Oncología Médica\n• Radioterapia\n• Cirugía Oncológica\n• Psicología Oncológica\n• Nutrición Oncológica\n• Medicina Nuclear\n• Hematología Oncológica`
          }
          
        default:
          return null
      }
    },
    
    async validarPaciente() {
      try {
        const response = await axios.post('/api/chatbot/validar-paciente', {
          dni: this.appointmentData.dni,
          nombre: this.appointmentData.nombre,
          telefono: this.appointmentData.telefono,
          correo: this.appointmentData.correo
        })
        
        const resultado = response.data
        
        switch (resultado.tipo) {
          case 'paciente_nuevo':
            this.currentStep = 'fecha_nacimiento'
            return 'Perfecto, eres un paciente nuevo. ¿Cuál es tu fecha de nacimiento? (formato: DD/MM/AAAA)'
            
          case 'paciente_existente':
            this.pacienteValidado = resultado.paciente
            this.currentStep = 'especialidad'
            return `¡Hola ${resultado.paciente.nombre}! Te he encontrado en nuestro sistema. ¿Qué especialidad necesitas? Tenemos:\n• Oncología Médica\n• Radioterapia\n• Cirugía Oncológica\n• Psicología Oncológica\n• Nutrición Oncológica\n• Medicina Nuclear\n• Hematología Oncológica`
            
          case 'paciente_inactivo':
            this.pacienteValidado = resultado.paciente
            this.currentStep = 'reactivar'
            return 'Te he encontrado en nuestro sistema pero tu cuenta está inactiva. ¿Deseas reactivarla? (responde sí o no)'
            
          case 'datos_diferentes':
            this.pacienteValidado = resultado.paciente
            this.currentStep = 'actualizar'
            return `Te he encontrado en nuestro sistema pero algunos datos son diferentes: ${resultado.diferencias.join(', ')}. ¿Deseas actualizar tu información? (responde sí o no)`
            
          default:
            return 'Error en la validación. Por favor, intenta nuevamente.'
        }
      } catch (error) {
        console.error('Error validando paciente:', error)
        return 'Error en la validación. Por favor, intenta nuevamente.'
      }
    },
    
    async confirmarCita() {
      const especialidades = {
        'Oncología Médica': 'Oncología Médica',
        'Radioterapia': 'Radioterapia',
        'Cirugía Oncológica': 'Cirugía Oncológica',
        'Psicología Oncológica': 'Psicología Oncológica',
        'Nutrición Oncológica': 'Nutrición Oncológica',
        'Medicina Nuclear': 'Medicina Nuclear',
        'Hematología Oncológica': 'Hematología Oncológica'
      }
      
      const especialidadNombre = especialidades[this.appointmentData.especialidad] || this.appointmentData.especialidad
      
      return `Perfecto, confirma los datos de tu cita:\n\n` +
             `👤 Paciente: ${this.appointmentData.nombre}\n` +
             `🆔 DNI: ${this.appointmentData.dni}\n` +
             `📞 Teléfono: ${this.appointmentData.telefono}\n` +
             `📧 Correo: ${this.appointmentData.correo}\n` +
             `🏥 Especialidad: ${especialidadNombre}\n` +
             `📅 Fecha: ${this.appointmentData.fecha.split('-').reverse().join('/')}\n` +
             `🕐 Hora: ${this.appointmentData.hora}\n` +
             `📝 Motivo: ${this.appointmentData.motivo || 'No especificado'}\n\n` +
             `¿Confirmas estos datos? (responde sí o no)`
    },
    
    async crearCita() {
      try {
        // Obtener médico por especialidad
        const medicosResponse = await axios.get(`/api/chatbot/medicos/${encodeURIComponent(this.appointmentData.especialidad)}`)
        const medicos = medicosResponse.data
        
        if (medicos.length === 0) {
          this.resetAppointmentData()
          return 'Lo siento, no hay médicos disponibles para esa especialidad en este momento. Por favor, contacta directamente con la clínica.'
        }
        
        const medico = medicos[0] // Tomar el primer médico disponible
        
        // Verificar disponibilidad
        const disponibilidadResponse = await axios.post('/api/chatbot/verificar-disponibilidad', {
          fecha: this.appointmentData.fecha,
          hora: this.appointmentData.hora,
          medico_id: medico.id
        })
        
        if (!disponibilidadResponse.data.disponible) {
          this.resetAppointmentData()
          return 'Lo siento, ese horario no está disponible. Por favor, selecciona otra fecha u hora.'
        }
        
        // Crear la cita
        let pacienteId = this.pacienteValidado ? this.pacienteValidado.id : null
        
        if (!pacienteId) {
          // Crear paciente nuevo
          const pacienteResponse = await axios.post('/api/chatbot/crear-paciente', {
            nombre: this.appointmentData.nombre,
            dni: this.appointmentData.dni,
            telefono: this.appointmentData.telefono,
            correo: this.appointmentData.correo,
            fecha_nacimiento: this.appointmentData.fecha_nacimiento
          })
          pacienteId = pacienteResponse.data.paciente.id
        }
        
        const citaResponse = await axios.post('/api/chatbot/agendar-cita', {
          paciente_id: pacienteId,
          medico_id: medico.id,
          fecha: this.appointmentData.fecha,
          hora: this.appointmentData.hora,
          motivo: this.appointmentData.motivo,
          duracion: 30
        })
        
        this.resetAppointmentData()
        
        return `¡Perfecto! Tu cita ha sido agendada exitosamente.\n\n` +
               `📋 Número de cita: #${citaResponse.data.cita.id}\n` +
               `👨‍⚕️ Médico: ${medico.nombre}\n` +
               `📅 Fecha: ${this.appointmentData.fecha.split('-').reverse().join('/')}\n` +
               `🕐 Hora: ${this.appointmentData.hora}\n\n` +
               `Te enviaremos un recordatorio por correo electrónico. Si necesitas cambiar o cancelar tu cita, contacta directamente con la clínica.\n\n` +
               `¿En qué más puedo ayudarte?`
        
      } catch (error) {
        console.error('Error creando cita:', error)
        this.resetAppointmentData()
        return 'Lo siento, hubo un error al agendar tu cita. Por favor, contacta directamente con la clínica o intenta nuevamente.'
      }
    },
    
    resetAppointmentData() {
      this.isSchedulingAppointment = false
      this.currentStep = ''
      this.pacienteValidado = null
      this.appointmentData = {
        nombre: '',
        dni: '',
        telefono: '',
        correo: '',
        fecha_nacimiento: '',
        especialidad: '',
        fecha: '',
        hora: '',
        motivo: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.chatbot {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  
  &__toggle {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
    border: none;
    color: white;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.3);
    transition: all 0.3s ease;
    position: relative;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 25px rgba(102, 126, 234, 0.4);
    }
    
    &--hidden {
      opacity: 0;
      visibility: hidden;
    }
  }
  
  &__notification {
    position: absolute;
    top: -5px;
    right: -5px;
    width: 20px;
    height: 20px;
    background: $error-color;
    border-radius: 50%;
    border: 2px solid white;
    animation: pulse 2s infinite;
  }
  
  &__window {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 450px;
    height: 500px;
    background: white;
    border-radius: 16px 16px 0 0;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    display: flex;
    flex-direction: column;
    overflow: hidden;
    
    @media (max-width: 480px) {
      width: calc(100vw - 40px);
      height: 60vh;
      bottom: 0;
      right: 0;
      border-radius: 16px 16px 0 0;
    }
  }
  
  &__header {
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
    color: white;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  &__header-info {
    display: flex;
    align-items: center;
    gap: 12px;
    
    i {
      font-size: 20px;
    }
    
    h4 {
      margin: 0;
      font-size: 16px;
    }
    
    span {
      font-size: 12px;
      opacity: 0.8;
    }
  }
  
  &__close {
    background: none;
    border: none;
    color: white;
    font-size: 18px;
    cursor: pointer;
    padding: 4px;
    
    &:hover {
      opacity: 0.8;
    }
  }
  
  &__messages {
    flex: 1;
    padding: 16px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  
  &__message {
    display: flex;
    gap: 12px;
    max-width: 90%;
    
    &.user {
      align-self: flex-end;
      flex-direction: row-reverse;
      
      .chatbot__message-content {
        background: $primary-color;
        color: white;
        border-radius: 18px 18px 4px 18px;
        min-width: 200px;
      }
    }
    
    &.bot {
      align-self: flex-start;
      
      .chatbot__message-content {
        background: $bg-light;
        color: $text-primary;
        border-radius: 18px 18px 18px 4px;
        min-width: 200px;
      }
    }
  }
  
  &__message-avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: $primary-color;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    flex-shrink: 0;
  }
  
  &__message-content {
    padding: 16px 20px;
    word-wrap: break-word;
    max-width: 100%;
  }
  
  &__message-text {
    margin-bottom: 4px;
    line-height: 1.4;
    
    a {
      color: inherit;
      text-decoration: underline;
    }
  }
  
  &__message-time {
    font-size: 11px;
    opacity: 0.7;
  }
  
  &__typing {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding: 8px 0;
    
    &-text {
      font-size: 13px;
      color: $text-light;
      font-style: italic;
    }
    
    &-dots {
      display: flex;
      gap: 4px;
      
      span {
        width: 8px;
        height: 8px;
        background: $text-light;
        border-radius: 50%;
        animation: typing 1.4s infinite ease-in-out;
        
        &:nth-child(1) { animation-delay: -0.32s; }
        &:nth-child(2) { animation-delay: -0.16s; }
        &:nth-child(3) { animation-delay: 0s; }
      }
    }
  }
  
  &__input {
    padding: 16px;
    border-top: 1px solid $border-color;
    
    form {
      display: flex;
      gap: 8px;
    }
    
    input {
      flex: 1;
      padding: 12px 16px;
      border: 1px solid $border-color;
      border-radius: 24px;
      font-size: 14px;
      outline: none;
      transition: border-color 0.3s ease;
      
      &:focus {
        border-color: $primary-color;
      }
      
      &:disabled {
        background: $bg-light;
        cursor: not-allowed;
      }
    }
    
    button {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: $primary-color;
      border: none;
      color: white;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover:not(:disabled) {
        background: $secondary-color;
        transform: scale(1.1);
      }
      
      &:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes typing {
  0%, 80%, 100% {
    transform: scale(0.8);
    opacity: 0.5;
  }
  40% {
    transform: scale(1);
    opacity: 1;
  }
}
</style> 