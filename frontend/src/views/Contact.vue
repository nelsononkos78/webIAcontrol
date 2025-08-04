<template>
  <div class="contact">
    <Navbar />
    
    <!-- Hero Section -->
    <section class="section section--hero">
      <div class="container">
        <div class="text-center">
          <h1>Contáctanos</h1>
          <p>Estamos aquí para ayudarte. Ponte en contacto con nosotros</p>
        </div>
      </div>
    </section>
    
    <!-- Información de Contacto -->
    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <h2>Información de Contacto</h2>
            <p>Nuestro equipo está disponible para responder tus preguntas y brindarte la atención que necesitas.</p>
            
            <div class="contact-items">
              <div class="contact-item">
                <div class="contact-item__icon">
                  <i class="fas fa-map-marker-alt"></i>
                </div>
                <div class="contact-item__content">
                  <h4>Dirección</h4>
                  <p>Av. Arequipa 123<br>Lima, Perú</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-item__icon">
                  <i class="fas fa-phone"></i>
                </div>
                <div class="contact-item__content">
                  <h4>Teléfono</h4>
                  <p>+51 1 234 5678<br>+51 300 123 4567</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-item__icon">
                  <i class="fas fa-envelope"></i>
                </div>
                <div class="contact-item__content">
                  <h4>Email</h4>
                  <p>contacto@onkos.com<br>citas@onkos.com</p>
                </div>
              </div>
              
              <div class="contact-item">
                <div class="contact-item__icon">
                  <i class="fas fa-clock"></i>
                </div>
                <div class="contact-item__content">
                  <h4>Horarios</h4>
                  <p>Lunes a Viernes: 8:00 AM - 6:00 PM<br>Sábados: 8:00 AM - 12:00 PM</p>
                </div>
              </div>
            </div>
            
            <div class="emergency-contact">
              <h3>Emergencias</h3>
              <p>Para emergencias médicas, llama inmediatamente:</p>
                          <a href="tel:+513001234567" class="emergency-phone">
              <i class="fas fa-phone"></i>
              +51 300 123 4567
              </a>
            </div>
          </div>
          
          <div class="contact-form">
            <h2>Envíanos un Mensaje</h2>
            <form @submit.prevent="submitForm">
              <div class="form-group">
                <label for="name">Nombre completo *</label>
                <input 
                  type="text" 
                  id="name" 
                  v-model="form.name" 
                  required
                  placeholder="Tu nombre completo"
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
                <label for="phone">Teléfono</label>
                <input 
                  type="tel" 
                  id="phone" 
                  v-model="form.phone" 
                  placeholder="+51 300 123 4567"
                />
              </div>
              
              <div class="form-group">
                <label for="subject">Asunto *</label>
                <select id="subject" v-model="form.subject" required>
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta médica</option>
                  <option value="cita">Agendar cita</option>
                  <option value="informacion">Información general</option>
                  <option value="emergencia">Emergencia</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              
              <div class="form-group">
                <label for="message">Mensaje *</label>
                <textarea 
                  id="message" 
                  v-model="form.message" 
                  required
                  rows="5"
                  placeholder="Describe tu consulta o mensaje..."
                ></textarea>
              </div>
              
              <div class="form-group">
                <label class="checkbox-label">
                  <input 
                    type="checkbox" 
                    v-model="form.newsletter"
                  />
                  <span class="checkmark"></span>
                  Suscribirme al boletín de noticias
                </label>
              </div>
              
              <button type="submit" class="btn btn--cta btn--large" :disabled="isSubmitting">
                <i class="fas fa-paper-plane"></i>
                {{ isSubmitting ? 'Enviando...' : 'Enviar Mensaje' }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Mapa -->
    <section class="section section--light">
      <div class="container">
        <div class="map-section">
          <h2 class="text-center mb-8">Ubicación</h2>
          <div class="map-container">
            <div class="map-placeholder">
              <i class="fas fa-map"></i>
              <p>Mapa interactivo de la ubicación</p>
              <p class="map-address">Av. Arequipa 123, Lima, Perú</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- FAQ -->
    <section class="section">
      <div class="container">
        <h2 class="text-center mb-8">Preguntas Frecuentes</h2>
        <div class="faq-grid">
          <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
            <div class="faq-question" @click="toggleFaq(index)">
              <h4>{{ faq.question }}</h4>
              <i class="fas fa-chevron-down" :class="{ 'faq-icon--rotated': faq.isOpen }"></i>
            </div>
            <div class="faq-answer" :class="{ 'faq-answer--open': faq.isOpen }">
              <p>{{ faq.answer }}</p>
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
  name: 'Contact',
  components: {
    Navbar
  },
  data() {
    return {
      isSubmitting: false,
      form: {
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        newsletter: false
      },
      faqs: [
        {
          question: '¿Cómo puedo agendar una cita?',
          answer: 'Puedes agendar una cita llamando al +51 1 234 5678, enviando un email a citas@onkos.com, o usando nuestro formulario en línea en la sección "Agendar Cita".',
          isOpen: false
        },
        {
          question: '¿Qué documentos necesito para mi primera consulta?',
          answer: 'Para tu primera consulta necesitas: documento de identidad, historia clínica previa, resultados de exámenes recientes, y autorización de tu EPS si aplica.',
          isOpen: false
        },
        {
          question: '¿Trabajan con todas las EPS?',
          answer: 'Trabajamos con la mayoría de EPS del país. Te recomendamos contactarnos para confirmar la cobertura de tu plan específico.',
          isOpen: false
        },
        {
          question: '¿Ofrecen atención de emergencia?',
          answer: 'Sí, contamos con atención de emergencia 24/7. Para emergencias llama al +51 300 123 4567.',
          isOpen: false
        },
        {
          question: '¿Cuánto tiempo dura una consulta oncológica?',
          answer: 'Una consulta oncológica típicamente dura entre 60-90 minutos, dependiendo de la complejidad del caso y las pruebas necesarias.',
          isOpen: false
        },
        {
          question: '¿Puedo traer un acompañante a la consulta?',
          answer: 'Sí, recomendamos que vengas acompañado por un familiar o persona de confianza, especialmente para la primera consulta.',
          isOpen: false
        }
      ]
    }
  },
  methods: {
    async submitForm() {
      this.isSubmitting = true
      
      try {
        // Simular envío del formulario
        await new Promise(resolve => setTimeout(resolve, 2000))
        
        // Aquí normalmente se enviaría a un endpoint del backend
        console.log('Formulario enviado:', this.form)
        
        // Mostrar mensaje de éxito
        alert('¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.')
        
        // Limpiar formulario
        this.form = {
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          newsletter: false
        }
        
      } catch (error) {
        console.error('Error al enviar formulario:', error)
        alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.')
      } finally {
        this.isSubmitting = false
      }
    },
    
    toggleFaq(index) {
      this.faqs[index].isOpen = !this.faqs[index].isOpen
    }
  }
}
</script>

<style lang="scss" scoped>
.contact-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}

.contact-info {
  h2 {
    margin-bottom: 1rem;
    color: $primary-color;
  }
  
  p {
    margin-bottom: 2rem;
    color: $text-secondary;
    line-height: 1.6;
  }
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.contact-item {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  
  &__icon {
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-size: 1.2rem;
    flex-shrink: 0;
  }
  
  &__content {
    h4 {
      margin-bottom: 0.5rem;
      color: $primary-color;
    }
    
    p {
      margin: 0;
      color: $text-secondary;
      line-height: 1.5;
    }
  }
}

.emergency-contact {
  background: $bg-light;
  padding: 2rem;
  border-radius: 16px;
  border-left: 4px solid $error-color;
  
  h3 {
    color: $error-color;
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 1rem;
    color: $text-secondary;
  }
  
  .emergency-phone {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: $error-color;
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 600;
    font-size: 1.1rem;
    transition: all 0.3s ease;
    
    &:hover {
      background: darken($error-color, 10%);
      transform: translateY(-2px);
    }
  }
}

.contact-form {
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  
  h2 {
    margin-bottom: 2rem;
    color: $primary-color;
  }
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
    min-height: 120px;
  }
}

.checkbox-label {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: $text-secondary;
  
  input[type="checkbox"] {
    width: auto;
    margin-right: 0.5rem;
  }
}

.map-section {
  .map-container {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
  
  .map-placeholder {
    height: 400px;
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: white;
    text-align: center;
    
    i {
      font-size: 4rem;
      margin-bottom: 1rem;
      opacity: 0.8;
    }
    
    p {
      margin: 0.5rem 0;
      font-size: 1.1rem;
    }
    
    .map-address {
      font-size: 0.9rem;
      opacity: 0.8;
    }
  }
}

.faq-grid {
  display: grid;
  gap: 1rem;
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.faq-question {
  padding: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.3s ease;
  
  &:hover {
    background: $bg-light;
  }
  
  h4 {
    margin: 0;
    color: $primary-color;
  }
  
  .faq-icon {
    transition: transform 0.3s ease;
    
    &--rotated {
      transform: rotate(180deg);
    }
  }
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
  
  &--open {
    max-height: 200px;
  }
  
  p {
    padding: 0 1.5rem 1.5rem;
    margin: 0;
    color: $text-secondary;
    line-height: 1.6;
  }
}
</style> 