<template>
  <div class="services">
    <Navbar />
    
    <!-- Hero Section -->
    <section class="section section--hero">
      <div class="container">
        <div class="text-center">
          <h1>Nuestros Servicios</h1>
          <p>Atención integral y especializada para el tratamiento del cáncer</p>
        </div>
      </div>
    </section>
    
    <!-- Servicios Detallados -->
    <section class="section">
      <div class="container">
        <div class="services-grid">
          <div class="service-card" v-for="service in services" :key="service.id">
            <div class="service-card__icon">
              <i :class="service.icon"></i>
            </div>
            <div class="service-card__content">
              <h3>{{ service.title }}</h3>
              <p>{{ service.description }}</p>
              <ul class="service-card__features">
                <li v-for="feature in service.features" :key="feature">{{ feature }}</li>
              </ul>
              <div class="service-card__actions">
                <button class="btn btn--primary" @click="showServiceDetails(service)">
                  <i class="fas fa-info-circle"></i>
                  Más Información
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Modal de Detalles -->
    <div class="modal" v-if="selectedService" @click="closeModal">
      <div class="modal__content" @click.stop>
        <div class="modal__header">
          <h2>{{ selectedService.title }}</h2>
          <button class="modal__close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal__body">
          <div class="service-details">
            <div class="service-details__icon">
              <i :class="selectedService.icon"></i>
            </div>
            <div class="service-details__content">
              <p class="service-details__description">{{ selectedService.description }}</p>
              
              <h4>¿Qué incluye este servicio?</h4>
              <ul class="service-details__features">
                <li v-for="feature in selectedService.features" :key="feature">{{ feature }}</li>
              </ul>
              
              <h4>Proceso de tratamiento</h4>
              <div class="service-details__process">
                <div class="process-step" v-for="(step, index) in selectedService.process" :key="index">
                  <div class="process-step__number">{{ index + 1 }}</div>
                  <div class="process-step__content">
                    <h5>{{ step.title }}</h5>
                    <p>{{ step.description }}</p>
                  </div>
                </div>
              </div>
              
              <h4>Información importante</h4>
              <div class="service-details__info">
                <div class="info-item">
                  <i class="fas fa-clock"></i>
                  <div>
                    <strong>Duración:</strong> {{ selectedService.duration }}
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-user-md"></i>
                  <div>
                    <strong>Especialista:</strong> {{ selectedService.specialist }}
                  </div>
                </div>
                <div class="info-item">
                  <i class="fas fa-calendar-alt"></i>
                  <div>
                    <strong>Frecuencia:</strong> {{ selectedService.frequency }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__footer">
                      <router-link to="/cita" class="btn btn--cta">
            <i class="fas fa-calendar-alt"></i>
            Agendar Cita
          </router-link>
          <button class="btn btn--secondary" @click="closeModal">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'

export default {
  name: 'Services',
  components: {
    Navbar
  },
  data() {
    return {
      selectedService: null,
      services: [
        {
          id: 1,
          title: 'Consultas Oncológicas',
          icon: 'fas fa-microscope',
          description: 'Evaluación integral y diagnóstico especializado con los mejores oncólogos de la región.',
          features: [
            'Evaluación médica completa',
            'Análisis de historial clínico',
            'Diagnóstico especializado',
            'Plan de tratamiento personalizado',
            'Seguimiento continuo'
          ],
          process: [
            {
              title: 'Consulta inicial',
              description: 'Evaluación completa del paciente y análisis de síntomas'
            },
            {
              title: 'Diagnóstico',
              description: 'Realización de pruebas necesarias para confirmar el diagnóstico'
            },
            {
              title: 'Plan de tratamiento',
              description: 'Desarrollo de un plan personalizado según el tipo y estadio del cáncer'
            },
            {
              title: 'Seguimiento',
              description: 'Monitoreo continuo del progreso del tratamiento'
            }
          ],
          duration: '60-90 minutos',
          specialist: 'Oncólogo médico',
          frequency: 'Según plan de tratamiento'
        },
        {
          id: 2,
          title: 'Quimioterapia',
          icon: 'fas fa-pills',
          description: 'Tratamiento farmacológico personalizado con tecnología avanzada y monitoreo constante.',
          features: [
            'Medicamentos personalizados',
            'Monitoreo constante',
            'Manejo de efectos secundarios',
            'Acompañamiento durante el tratamiento',
            'Soporte nutricional'
          ],
          process: [
            {
              title: 'Evaluación pre-tratamiento',
              description: 'Análisis de la condición del paciente y preparación'
            },
            {
              title: 'Administración',
              description: 'Aplicación del tratamiento en ambiente controlado'
            },
            {
              title: 'Monitoreo',
              description: 'Seguimiento de efectos y respuesta al tratamiento'
            },
            {
              title: 'Cuidados post-tratamiento',
              description: 'Orientación sobre cuidados en casa y próximos pasos'
            }
          ],
          duration: '2-6 horas por sesión',
          specialist: 'Oncólogo médico',
          frequency: 'Según protocolo (semanal, quincenal, mensual)'
        },
        {
          id: 3,
          title: 'Radioterapia',
          icon: 'fas fa-radiation',
          description: 'Terapia de radiación de precisión con equipos de última generación para máxima efectividad.',
          features: [
            'Tecnología de precisión',
            'Planificación 3D',
            'Minimización de efectos secundarios',
            'Tratamiento ambulatorio',
            'Monitoreo de respuesta'
          ],
          process: [
            {
              title: 'Simulación',
              description: 'Planificación del tratamiento con imágenes 3D'
            },
            {
              title: 'Marcación',
              description: 'Marcación precisa del área a tratar'
            },
            {
              title: 'Tratamiento',
              description: 'Aplicación de radiación con precisión milimétrica'
            },
            {
              title: 'Seguimiento',
              description: 'Evaluación de respuesta y ajustes si es necesario'
            }
          ],
          duration: '15-30 minutos por sesión',
          specialist: 'Oncólogo radioterapeuta',
          frequency: 'Diario (lunes a viernes) por 4-6 semanas'
        },
        {
          id: 4,
          title: 'Cirugía Oncológica',
          icon: 'fas fa-user-md',
          description: 'Intervenciones quirúrgicas especializadas con técnicas mínimamente invasivas.',
          features: [
            'Técnicas mínimamente invasivas',
            'Equipo quirúrgico especializado',
            'Cuidados pre y post operatorios',
            'Rehabilitación integral',
            'Seguimiento post-quirúrgico'
          ],
          process: [
            {
              title: 'Evaluación pre-quirúrgica',
              description: 'Análisis completo para determinar la mejor estrategia'
            },
            {
              title: 'Cirugía',
              description: 'Intervención con técnicas avanzadas y mínima invasión'
            },
            {
              title: 'Recuperación',
              description: 'Cuidados intensivos y monitoreo post-operatorio'
            },
            {
              title: 'Rehabilitación',
              description: 'Programa de recuperación y reintegración'
            }
          ],
          duration: 'Variable según procedimiento',
          specialist: 'Cirujano oncológico',
          frequency: 'Según indicación médica'
        },
        {
          id: 5,
          title: 'Psicología Oncológica',
          icon: 'fas fa-brain',
          description: 'Apoyo emocional y psicológico para pacientes y familiares durante todo el proceso.',
          features: [
            'Terapia individual',
            'Terapia familiar',
            'Grupos de apoyo',
            'Manejo del estrés',
            'Técnicas de relajación'
          ],
          process: [
            {
              title: 'Evaluación psicológica',
              description: 'Análisis del estado emocional y necesidades'
            },
            {
              title: 'Plan de intervención',
              description: 'Desarrollo de estrategias personalizadas'
            },
            {
              title: 'Terapia',
              description: 'Sesiones individuales o grupales según necesidad'
            },
            {
              title: 'Seguimiento',
              description: 'Evaluación continua del progreso emocional'
            }
          ],
          duration: '50 minutos por sesión',
          specialist: 'Psicólogo oncológico',
          frequency: 'Semanal o quincenal'
        },
        {
          id: 6,
          title: 'Nutrición Oncológica',
          icon: 'fas fa-apple-alt',
          description: 'Planes nutricionales especializados para optimizar el tratamiento y la recuperación.',
          features: [
            'Evaluación nutricional',
            'Planes personalizados',
            'Educación nutricional',
            'Soporte durante tratamiento',
            'Seguimiento continuo'
          ],
          process: [
            {
              title: 'Evaluación nutricional',
              description: 'Análisis del estado nutricional actual'
            },
            {
              title: 'Plan personalizado',
              description: 'Desarrollo de dieta específica para el tratamiento'
            },
            {
              title: 'Educación',
              description: 'Orientación sobre alimentación y suplementos'
            },
            {
              title: 'Acompañamiento',
              description: 'Seguimiento y ajustes según evolución'
            }
          ],
          duration: '45-60 minutos por consulta',
          specialist: 'Nutricionista oncológico',
          frequency: 'Mensual o según necesidad'
        }
      ]
    }
  },
  methods: {
    showServiceDetails(service) {
      this.selectedService = service
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.selectedService = null
      document.body.style.overflow = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.service-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  
  &__icon {
    width: 80px;
    height: 80px;
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    color: white;
    margin-bottom: 1.5rem;
  }
  
  &__content {
    h3 {
      margin-bottom: 1rem;
      color: $primary-color;
    }
    
    p {
      margin-bottom: 1.5rem;
      color: $text-secondary;
      line-height: 1.6;
    }
  }
  
  &__features {
    list-style: none;
    margin-bottom: 1.5rem;
    
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
  
  &__actions {
    display: flex;
    gap: 1rem;
  }
}

.modal {
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
  padding: 1rem;
  
  &__content {
    background: white;
    border-radius: 16px;
    max-width: 800px;
    width: 100%;
    max-height: 90vh;
    overflow-y: auto;
  }
  
  &__header {
    padding: 2rem 2rem 1rem;
    border-bottom: 1px solid $border-color;
    display: flex;
    align-items: center;
    justify-content: space-between;
    
    h2 {
      margin: 0;
      color: $primary-color;
    }
  }
  
  &__close {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    color: $text-light;
    
    &:hover {
      color: $text-primary;
    }
  }
  
  &__body {
    padding: 2rem;
  }
  
  &__footer {
    padding: 1rem 2rem 2rem;
    border-top: 1px solid $border-color;
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
  }
}

.service-details {
  &__icon {
    width: 100px;
    height: 100px;
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.5rem;
    color: white;
    margin: 0 auto 2rem;
  }
  
  &__description {
    font-size: 1.1rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    color: $text-secondary;
  }
  
  &__features {
    list-style: none;
    margin-bottom: 2rem;
    
    li {
      padding: 0.75rem 0;
      color: $text-secondary;
      position: relative;
      padding-left: 2rem;
      
      &::before {
        content: '✓';
        position: absolute;
        left: 0;
        color: $success-color;
        font-weight: bold;
        font-size: 1.2rem;
      }
    }
  }
  
  &__process {
    margin-bottom: 2rem;
  }
  
  &__info {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
  }
}

.process-step {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  
  &__number {
    width: 40px;
    height: 40px;
    background: $primary-color;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    flex-shrink: 0;
  }
  
  &__content {
    h5 {
      margin-bottom: 0.5rem;
      color: $primary-color;
    }
    
    p {
      margin: 0;
      color: $text-secondary;
    }
  }
}

.info-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: $bg-light;
  border-radius: 8px;
  
  i {
    color: $primary-color;
    font-size: 1.2rem;
  }
  
  strong {
    color: $text-primary;
  }
}
</style> 