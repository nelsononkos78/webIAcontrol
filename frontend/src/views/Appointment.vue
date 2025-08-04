<template>
  <div class="appointment">
    <Navbar />
    
    <!-- Hero Section -->
    <section class="section section--hero">
      <div class="container">
        <div class="text-center">
          <h1>Agendar Cita</h1>
          <p>Programa tu consulta con nuestros especialistas oncológicos</p>
        </div>
      </div>
    </section>
    
    <!-- Formulario de Cita -->
    <section class="section">
      <div class="container">
        <div class="appointment-container">
          <div class="appointment-form">
            <h2>Información de la Cita</h2>
            <form @submit.prevent="submitAppointment">
              <!-- Información Personal -->
              <div class="form-section">
                <h3>Información Personal</h3>
                <div class="form-grid">
                  <div class="form-group">
                    <label for="firstName">Nombre *</label>
                    <input 
                      type="text" 
                      id="firstName" 
                      v-model="form.firstName" 
                      required
                      placeholder="Tu nombre"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="lastName">Apellido *</label>
                    <input 
                      type="text" 
                      id="lastName" 
                      v-model="form.lastName" 
                      required
                      placeholder="Tu apellido"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="email">Email *</label>
                    <input 
                      type="email" 
                      id="email" 
                      v-model="form.email" 
                      required
                      placeholder="tu@email.com"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="phone">Teléfono *</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      v-model="form.phone" 
                      required
                      placeholder="+51 300 123 4567"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="dateOfBirth">Fecha de Nacimiento *</label>
                    <input 
                      type="date" 
                      id="dateOfBirth" 
                      v-model="form.dateOfBirth" 
                      required
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="documentType">Tipo de Documento *</label>
                    <select id="documentType" v-model="form.documentType" required>
                      <option value="">Selecciona tipo de documento</option>
                      <option value="cc">Cédula de Ciudadanía</option>
                      <option value="ce">Cédula de Extranjería</option>
                      <option value="ti">Tarjeta de Identidad</option>
                      <option value="pp">Pasaporte</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="documentNumber">Número de Documento *</label>
                    <input 
                      type="text" 
                      id="documentNumber" 
                      v-model="form.documentNumber" 
                      required
                      placeholder="Número de documento"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Información de la Cita -->
              <div class="form-section">
                <h3>Detalles de la Cita</h3>
                <div class="form-grid">
                  <div class="form-group">
                    <label for="appointmentType">Tipo de Cita *</label>
                    <select id="appointmentType" v-model="form.appointmentType" required>
                      <option value="">Selecciona tipo de cita</option>
                      <option value="primera">Primera Consulta</option>
                      <option value="seguimiento">Consulta de Seguimiento</option>
                      <option value="emergencia">Consulta de Emergencia</option>
                      <option value="segunda-opinion">Segunda Opinión</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="specialty">Especialidad *</label>
                    <select id="specialty" v-model="form.specialty" required>
                      <option value="">Selecciona especialidad</option>
                      <option value="oncologia-medica">Oncología Médica</option>
                      <option value="radioterapia">Radioterapia</option>
                      <option value="cirugia-oncologica">Cirugía Oncológica</option>
                      <option value="psicologia-oncologica">Psicología Oncológica</option>
                      <option value="nutricion-oncologica">Nutrición Oncológica</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="preferredDoctor">Doctor Preferido</label>
                    <select id="preferredDoctor" v-model="form.preferredDoctor">
                      <option value="">Sin preferencia</option>
                      <option value="dr-mendoza">Dr. Carlos Mendoza - Oncólogo Médico</option>
                      <option value="dra-garcia">Dra. Ana García - Oncóloga Radioterapeuta</option>
                      <option value="dr-rodriguez">Dr. Luis Rodríguez - Cirujano Oncológico</option>
                      <option value="dra-lopez">Dra. Lucía López - Psicóloga Oncológica</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="preferredDate">Fecha Preferida *</label>
                    <input 
                      type="date" 
                      id="preferredDate" 
                      v-model="form.preferredDate" 
                      required
                      :min="minDate"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="preferredTime">Horario Preferido *</label>
                    <select id="preferredTime" v-model="form.preferredTime" required>
                      <option value="">Selecciona horario</option>
                      <option value="08:00">8:00 AM</option>
                      <option value="09:00">9:00 AM</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <!-- Información Médica -->
              <div class="form-section">
                <h3>Información Médica</h3>
                <div class="form-group">
                  <label for="medicalHistory">Historia Médica</label>
                  <textarea 
                    id="medicalHistory" 
                    v-model="form.medicalHistory" 
                    rows="4"
                    placeholder="Describe tu historial médico, diagnósticos previos, tratamientos recibidos..."
                  ></textarea>
                </div>
                
                <div class="form-group">
                  <label for="currentSymptoms">Síntomas Actuales</label>
                  <textarea 
                    id="currentSymptoms" 
                    v-model="form.currentSymptoms" 
                    rows="4"
                    placeholder="Describe los síntomas que estás experimentando..."
                  ></textarea>
                </div>
                
                <div class="form-group">
                  <label for="medications">Medicamentos Actuales</label>
                  <textarea 
                    id="medications" 
                    v-model="form.medications" 
                    rows="3"
                    placeholder="Lista de medicamentos que estás tomando actualmente..."
                  ></textarea>
                </div>
                
                <div class="form-group">
                  <label for="allergies">Alergias</label>
                  <input 
                    type="text" 
                    id="allergies" 
                    v-model="form.allergies" 
                    placeholder="Alergias conocidas (medicamentos, alimentos, etc.)"
                  />
                </div>
              </div>
              
              <!-- Información de Seguro -->
              <div class="form-section">
                <h3>Información de Seguro (Opcional)</h3>
                <div class="form-grid">
                  <div class="form-group">
                    <label for="insuranceType">Tipo de Seguro</label>
                    <select id="insuranceType" v-model="form.insuranceType">
                      <option value="">Selecciona tipo de seguro</option>
                      <option value="eps">EPS</option>
                      <option value="particular">Particular</option>
                      <option value="prepagada">Medicina Prepagada</option>
                      <option value="otro">Otro</option>
                    </select>
                  </div>
                  
                  <div class="form-group">
                    <label for="insuranceCompany">Compañía de Seguro</label>
                    <input 
                      type="text" 
                      id="insuranceCompany" 
                      v-model="form.insuranceCompany" 
                      placeholder="Nombre de la compañía"
                    />
                  </div>
                  
                  <div class="form-group">
                    <label for="policyNumber">Número de Póliza</label>
                    <input 
                      type="text" 
                      id="policyNumber" 
                      v-model="form.policyNumber" 
                      placeholder="Número de póliza o afiliación"
                    />
                  </div>
                </div>
              </div>
              
              <!-- Términos y Condiciones -->
              <div class="form-section">
                <div class="form-group">
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="form.termsAccepted"
                      required
                    />
                    <span class="checkmark"></span>
                    Acepto los <a href="#" @click.prevent="showTerms">términos y condiciones</a> *
                  </label>
                </div>
                
                <div class="form-group">
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="form.privacyAccepted"
                      required
                    />
                    <span class="checkmark"></span>
                    Autorizo el tratamiento de mis datos personales según la <a href="#" @click.prevent="showPrivacy">política de privacidad</a> *
                  </label>
                </div>
                
                <div class="form-group">
                  <label class="checkbox-label">
                    <input 
                      type="checkbox" 
                      v-model="form.newsletter"
                    />
                    <span class="checkmark"></span>
                    Deseo recibir información sobre servicios y novedades de la clínica
                  </label>
                </div>
              </div>
              
              <!-- Botones -->
              <div class="form-actions">
                <button type="button" class="btn btn--secondary" @click="resetForm">
                  <i class="fas fa-undo"></i>
                  Limpiar Formulario
                </button>
                <button type="submit" class="btn btn--cta btn--large" :disabled="isSubmitting">
                  <i class="fas fa-calendar-check"></i>
                  {{ isSubmitting ? 'Enviando Solicitud...' : 'Solicitar Cita' }}
                </button>
              </div>
            </form>
          </div>
          
          <div class="appointment-info">
            <div class="info-card">
              <h3>Información Importante</h3>
              <ul>
                <li>Llega 15 minutos antes de tu cita</li>
                <li>Trae tu documento de identidad</li>
                <li>Lleva exámenes médicos previos</li>
                <li>Usa mascarilla durante la consulta</li>
                <li>Puedes venir acompañado</li>
              </ul>
            </div>
            
            <div class="info-card">
              <h3>Horarios de Atención</h3>
              <div class="schedule-info">
                <div class="schedule-item">
                  <strong>Lunes a Viernes:</strong>
                  <span>8:00 AM - 6:00 PM</span>
                </div>
                <div class="schedule-item">
                  <strong>Sábados:</strong>
                  <span>8:00 AM - 12:00 PM</span>
                </div>
                <div class="schedule-item">
                  <strong>Emergencias:</strong>
                  <span>24/7</span>
                </div>
              </div>
            </div>
            
            <div class="info-card">
              <h3>Contacto de Emergencia</h3>
              <p>Para emergencias médicas:</p>
                          <a href="tel:+513001234567" class="emergency-phone">
              <i class="fas fa-phone"></i>
              +51 300 123 4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Appointment',
  components: {
    Navbar
  },
  data() {
    return {
      isSubmitting: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        documentType: '',
        documentNumber: '',
        appointmentType: '',
        specialty: '',
        preferredDoctor: '',
        preferredDate: '',
        preferredTime: '',
        medicalHistory: '',
        currentSymptoms: '',
        medications: '',
        allergies: '',
        insuranceType: '',
        insuranceCompany: '',
        policyNumber: '',
        termsAccepted: false,
        privacyAccepted: false,
        newsletter: false
      }
    }
  },
  computed: {
    minDate() {
      const today = new Date()
      return today.toISOString().split('T')[0]
    }
  },
  methods: {
    async submitAppointment() {
      this.isSubmitting = true
      
      try {
        // Simular envío de la solicitud
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Aquí normalmente se enviaría a un endpoint del backend
        console.log('Solicitud de cita enviada:', this.form)
        
        // Mostrar mensaje de éxito
        alert('¡Solicitud de cita enviada exitosamente! Nos pondremos en contacto contigo en las próximas 24 horas para confirmar tu cita.')
        
        // Limpiar formulario
        this.resetForm()
        
      } catch (error) {
        console.error('Error al enviar solicitud:', error)
        alert('Hubo un error al enviar la solicitud. Por favor, intenta de nuevo.')
      } finally {
        this.isSubmitting = false
      }
    },
    
    resetForm() {
      this.form = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        dateOfBirth: '',
        documentType: '',
        documentNumber: '',
        appointmentType: '',
        specialty: '',
        preferredDoctor: '',
        preferredDate: '',
        preferredTime: '',
        medicalHistory: '',
        currentSymptoms: '',
        medications: '',
        allergies: '',
        insuranceType: '',
        insuranceCompany: '',
        policyNumber: '',
        termsAccepted: false,
        privacyAccepted: false,
        newsletter: false
      }
    },
    
    showTerms() {
      alert('Términos y condiciones de la clínica...')
    },
    
    showPrivacy() {
      alert('Política de privacidad de la clínica...')
    }
  }
}
</script>

<style lang="scss" scoped>
.appointment-container {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 3rem;
  
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
}

.appointment-form {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  h2 {
    margin-bottom: 2rem;
    color: $primary-color;
  }
}

.form-section {
  margin-bottom: 2rem;
  padding-bottom: 2rem;
  border-bottom: 1px solid $border-color;
  
  &:last-of-type {
    border-bottom: none;
  }
  
  h3 {
    color: $primary-color;
    margin-bottom: 1.5rem;
    font-size: 1.25rem;
  }
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.form-group {
  margin-bottom: 1.5rem;
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    color: $text-primary;
    font-weight: 500;
  }
  
  input,
  select,
  textarea {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid $border-color;
    border-radius: 8px;
    font-size: 16px;
    transition: border-color 0.3s ease;
    
    &:focus {
      outline: none;
      border-color: $primary-color;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 100px;
  }
}

.checkbox-label {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  cursor: pointer;
  color: $text-secondary;
  line-height: 1.5;
  
  input[type="checkbox"] {
    width: auto;
    margin-top: 0.25rem;
  }
  
  a {
    color: $primary-color;
    text-decoration: none;
    
    &:hover {
      text-decoration: underline;
    }
  }
}

.form-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
  margin-top: 2rem;
  
  @media (max-width: 768px) {
    flex-direction: column;
  }
}

.appointment-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.info-card {
  background: white;
  padding: 1.5rem;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  
  h3 {
    color: $primary-color;
    margin-bottom: 1rem;
    font-size: 1.1rem;
  }
  
  ul {
    list-style: none;
    
    li {
      padding: 0.5rem 0;
      color: $text-secondary;
      position: relative;
      padding-left: 1.5rem;
      
      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: $success-color;
        font-weight: bold;
      }
    }
  }
}

.schedule-info {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.schedule-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
  border-bottom: 1px solid $border-color;
  
  &:last-child {
    border-bottom: none;
  }
  
  strong {
    color: $text-primary;
  }
  
  span {
    color: $text-secondary;
  }
}

.emergency-phone {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: $error-color;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  margin-top: 1rem;
  transition: all 0.3s ease;
  
  &:hover {
    background: darken($error-color, 10%);
    transform: translateY(-2px);
  }
}
</style> 