<template>
  <div class="doctors">
    <Navbar />
    
    <!-- Hero Section -->
    <section class="section section--hero">
      <div class="container">
        <div class="text-center">
          <h1>Nuestros Especialistas</h1>
          <p>Equipo médico experto comprometido con tu salud y bienestar</p>
        </div>
      </div>
    </section>
    
    <!-- Especialistas -->
    <section class="section">
      <div class="container">
        <div class="doctors-grid">
          <div class="doctor-card" v-for="doctor in doctors" :key="doctor.id">
            <div class="doctor-card__image">
              <div class="doctor-card__image-placeholder">
                <i class="fas fa-user-md"></i>
              </div>
            </div>
            <div class="doctor-card__content">
              <h3>{{ doctor.name }}</h3>
              <p class="doctor-card__specialty">{{ doctor.specialty }}</p>
              <p class="doctor-card__experience">{{ doctor.experience }} de experiencia</p>
              <p class="doctor-card__description">{{ doctor.description }}</p>
              
              <div class="doctor-card__credentials">
                <h4>Credenciales</h4>
                <ul>
                  <li v-for="credential in doctor.credentials" :key="credential">{{ credential }}</li>
                </ul>
              </div>
              
              <div class="doctor-card__specialties">
                <h4>Especialidades</h4>
                <div class="specialties-tags">
                  <span v-for="specialty in doctor.specialties" :key="specialty" class="specialty-tag">
                    {{ specialty }}
                  </span>
                </div>
              </div>
              
              <div class="doctor-card__schedule">
                <h4>Horarios de Consulta</h4>
                <div class="schedule-info">
                  <div class="schedule-item">
                    <i class="fas fa-calendar-day"></i>
                    <span>{{ doctor.schedule.days }}</span>
                  </div>
                  <div class="schedule-item">
                    <i class="fas fa-clock"></i>
                    <span>{{ doctor.schedule.hours }}</span>
                  </div>
                </div>
              </div>
              
              <div class="doctor-card__actions">
                <router-link :to="`/cita?doctor=${doctor.id}`" class="btn btn--cta">
                  <i class="fas fa-calendar-alt"></i>
                  Agendar Cita
                </router-link>
                <button class="btn btn--secondary" @click="showDoctorDetails(doctor)">
                  <i class="fas fa-info-circle"></i>
                  Ver Perfil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Modal de Detalles del Doctor -->
    <div class="modal" v-if="selectedDoctor" @click="closeModal">
      <div class="modal__content" @click.stop>
        <div class="modal__header">
          <h2>{{ selectedDoctor.name }}</h2>
          <button class="modal__close" @click="closeModal">
            <i class="fas fa-times"></i>
          </button>
        </div>
        <div class="modal__body">
          <div class="doctor-details">
            <div class="doctor-details__header">
              <div class="doctor-details__image">
                <div class="doctor-details__image-placeholder">
                  <i class="fas fa-user-md"></i>
                </div>
              </div>
              <div class="doctor-details__info">
                <h3>{{ selectedDoctor.name }}</h3>
                <p class="doctor-details__specialty">{{ selectedDoctor.specialty }}</p>
                <p class="doctor-details__experience">{{ selectedDoctor.experience }} de experiencia</p>
              </div>
            </div>
            
            <div class="doctor-details__content">
              <div class="doctor-details__section">
                <h4>Biografía</h4>
                <p>{{ selectedDoctor.biography }}</p>
              </div>
              
              <div class="doctor-details__section">
                <h4>Formación Académica</h4>
                <ul>
                  <li v-for="education in selectedDoctor.education" :key="education">{{ education }}</li>
                </ul>
              </div>
              
              <div class="doctor-details__section">
                <h4>Experiencia Profesional</h4>
                <ul>
                  <li v-for="experience in selectedDoctor.professionalExperience" :key="experience">{{ experience }}</li>
                </ul>
              </div>
              
              <div class="doctor-details__section">
                <h4>Publicaciones y Investigación</h4>
                <ul>
                  <li v-for="publication in selectedDoctor.publications" :key="publication">{{ publication }}</li>
                </ul>
              </div>
              
              <div class="doctor-details__section">
                <h4>Idiomas</h4>
                <div class="languages">
                  <span v-for="language in selectedDoctor.languages" :key="language" class="language-tag">
                    {{ language }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal__footer">
                      <router-link :to="`/cita?doctor=${selectedDoctor.id}`" class="btn btn--cta">
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
  name: 'Doctors',
  components: {
    Navbar
  },
  data() {
    return {
      selectedDoctor: null,
      doctors: [
        {
          id: 1,
          name: 'Dr. Carlos Mendoza',
          specialty: 'Oncólogo Médico',
          experience: '20 años',
          description: 'Especialista en el tratamiento médico del cáncer con amplia experiencia en quimioterapia y terapias dirigidas.',
          credentials: [
            'Médico Cirujano - Universidad Nacional Mayor de San Marcos',
            'Especialista en Oncología - Universidad de los Andes',
            'Fellowship en Oncología Médica - MD Anderson Cancer Center',
            'Miembro de la Sociedad Americana de Oncología Clínica (ASCO)'
          ],
          specialties: [
            'Cáncer de mama',
            'Cáncer de pulmón',
            'Cáncer colorrectal',
            'Linfomas',
            'Terapias dirigidas'
          ],
          schedule: {
            days: 'Lunes a Viernes',
            hours: '8:00 AM - 5:00 PM'
          },
          biography: 'El Dr. Carlos Mendoza es un oncólogo médico con más de 20 años de experiencia en el tratamiento del cáncer. Se ha especializado en terapias dirigidas y medicina personalizada, participando en numerosos ensayos clínicos internacionales.',
          education: [
            'Médico Cirujano - Universidad Nacional Mayor de San Marcos (2000)',
            'Especialización en Oncología - Universidad de los Andes (2005)',
            'Fellowship en Oncología Médica - MD Anderson Cancer Center, Houston (2007)',
            'Maestría en Investigación Clínica - Universidad de Texas (2008)'
          ],
          professionalExperience: [
            'Oncólogo Médico - Clínica Onkos Instituto del Cáncer (2008-presente)',
            'Investigador Principal - Ensayos Clínicos Fase I-III',
            'Profesor Asociado - Universidad de los Andes',
            'Miembro del Comité de Ética en Investigación'
          ],
          publications: [
            'Mendoza C. et al. "Nuevas terapias dirigidas en cáncer de mama triple negativo" - Journal of Clinical Oncology (2023)',
            'Mendoza C. et al. "Efectividad de la inmunoterapia en cáncer de pulmón" - The Lancet Oncology (2022)',
            'Mendoza C. et al. "Medicina personalizada en oncología" - Nature Reviews Cancer (2021)'
          ],
          languages: ['Español', 'Inglés', 'Francés']
        },
        {
          id: 2,
          name: 'Dra. Ana García',
          specialty: 'Oncóloga Radioterapeuta',
          experience: '15 años',
          description: 'Especialista en radioterapia con experiencia en técnicas de precisión y radioterapia estereotáctica.',
          credentials: [
            'Médico Cirujano - Universidad Javeriana',
            'Especialista en Radioterapia - Universidad Nacional',
            'Fellowship en Radioterapia Oncológica - Memorial Sloan Kettering',
            'Certificación en Radioterapia Estereotáctica'
          ],
          specialties: [
            'Radioterapia de precisión',
            'Radioterapia estereotáctica',
            'Brachiterapia',
            'Cáncer de próstata',
            'Tumores cerebrales'
          ],
          schedule: {
            days: 'Lunes a Viernes',
            hours: '7:00 AM - 4:00 PM'
          },
          biography: 'La Dra. Ana García es una oncóloga radioterapeuta con amplia experiencia en técnicas avanzadas de radioterapia. Se ha especializado en radioterapia estereotáctica y técnicas de precisión para minimizar efectos secundarios.',
          education: [
            'Médico Cirujano - Universidad Javeriana (2005)',
            'Especialización en Radioterapia - Universidad Nacional (2010)',
            'Fellowship en Radioterapia Oncológica - Memorial Sloan Kettering (2012)',
            'Certificación en Radioterapia Estereotáctica - ASTRO (2013)'
          ],
          professionalExperience: [
            'Oncóloga Radioterapeuta - Clínica Onkos Instituto del Cáncer (2012-presente)',
            'Directora del Departamento de Radioterapia',
            'Investigadora en Ensayos Clínicos de Radioterapia',
            'Miembro de la Sociedad Americana de Radioterapia (ASTRO)'
          ],
          publications: [
            'García A. et al. "Radioterapia estereotáctica en tumores cerebrales" - International Journal of Radiation Oncology (2023)',
            'García A. et al. "Técnicas de precisión en radioterapia de próstata" - Radiotherapy and Oncology (2022)',
            'García A. et al. "Brachiterapia en cáncer ginecológico" - Brachytherapy (2021)'
          ],
          languages: ['Español', 'Inglés', 'Portugués']
        },
        {
          id: 3,
          name: 'Dr. Luis Rodríguez',
          specialty: 'Cirujano Oncológico',
          experience: '18 años',
          description: 'Cirujano especializado en técnicas mínimamente invasivas y cirugía robótica para el tratamiento del cáncer.',
          credentials: [
            'Médico Cirujano - Universidad del Rosario',
            'Especialista en Cirugía General - Universidad Nacional',
            'Fellowship en Cirugía Oncológica - Mayo Clinic',
            'Certificación en Cirugía Robótica - Intuitive Surgical'
          ],
          specialties: [
            'Cirugía mínimamente invasiva',
            'Cirugía robótica',
            'Cáncer de colon',
            'Cáncer gástrico',
            'Cáncer de páncreas'
          ],
          schedule: {
            days: 'Lunes a Jueves',
            hours: '8:00 AM - 6:00 PM'
          },
          biography: 'El Dr. Luis Rodríguez es un cirujano oncológico con amplia experiencia en técnicas mínimamente invasivas y cirugía robótica. Ha realizado más de 2000 procedimientos quirúrgicos oncológicos con excelentes resultados.',
          education: [
            'Médico Cirujano - Universidad del Rosario (2002)',
            'Especialización en Cirugía General - Universidad Nacional (2007)',
            'Fellowship en Cirugía Oncológica - Mayo Clinic (2009)',
            'Certificación en Cirugía Robótica - Intuitive Surgical (2010)'
          ],
          professionalExperience: [
            'Cirujano Oncológico - Clínica Onkos Instituto del Cáncer (2009-presente)',
            'Jefe del Departamento de Cirugía Oncológica',
            'Instructor en Cirugía Robótica',
            'Miembro de la Sociedad Americana de Cirujanos (ACS)'
          ],
          publications: [
            'Rodríguez L. et al. "Cirugía robótica en cáncer de colon" - Annals of Surgery (2023)',
            'Rodríguez L. et al. "Técnicas mínimamente invasivas en cáncer gástrico" - Surgical Endoscopy (2022)',
            'Rodríguez L. et al. "Resultados a largo plazo en cirugía pancreática" - HPB (2021)'
          ],
          languages: ['Español', 'Inglés', 'Italiano']
        },
        {
          id: 4,
          name: 'Dra. Lucía López',
          specialty: 'Psicóloga Oncológica',
          experience: '12 años',
          description: 'Psicóloga especializada en el apoyo emocional y psicológico de pacientes oncológicos y sus familias.',
          credentials: [
            'Psicóloga - Universidad de los Andes',
            'Especialista en Psicología Clínica - Universidad Nacional',
            'Maestría en Psicología Oncológica - Universidad de Barcelona',
            'Certificación en Terapia Cognitivo-Conductual'
          ],
          specialties: [
            'Terapia individual',
            'Terapia familiar',
            'Grupos de apoyo',
            'Manejo del estrés',
            'Duelo y pérdida'
          ],
          schedule: {
            days: 'Lunes a Viernes',
            hours: '9:00 AM - 6:00 PM'
          },
          biography: 'La Dra. Lucía López es una psicóloga oncológica con amplia experiencia en el apoyo emocional de pacientes con cáncer y sus familias. Se ha especializado en técnicas de manejo del estrés y terapia familiar.',
          education: [
            'Psicóloga - Universidad de los Andes (2008)',
            'Especialización en Psicología Clínica - Universidad Nacional (2010)',
            'Maestría en Psicología Oncológica - Universidad de Barcelona (2012)',
            'Certificación en Terapia Cognitivo-Conductual - Beck Institute (2013)'
          ],
          professionalExperience: [
            'Psicóloga Oncológica - Clínica Onkos Instituto del Cáncer (2012-presente)',
            'Coordinadora del Programa de Apoyo Psicológico',
            'Facilitadora de Grupos de Apoyo',
            'Miembro de la Sociedad Americana de Psicología (APA)'
          ],
          publications: [
            'López M. et al. "Intervenciones psicológicas en pacientes oncológicos" - Psycho-Oncology (2023)',
            'López M. et al. "Apoyo familiar en el proceso oncológico" - Journal of Family Psychology (2022)',
            'López M. et al. "Manejo del estrés en cuidadores" - Supportive Care in Cancer (2021)'
          ],
          languages: ['Español', 'Inglés', 'Catalán']
        }
      ]
    }
  },
  methods: {
    showDoctorDetails(doctor) {
      this.selectedDoctor = doctor
      document.body.style.overflow = 'hidden'
    },
    closeModal() {
      this.selectedDoctor = null
      document.body.style.overflow = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.doctors-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 2rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.doctor-card {
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
  }
  
  &__image {
    text-align: center;
    margin-bottom: 1.5rem;
  }
  
  &__image-placeholder {
    width: 120px;
    height: 120px;
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 3rem;
    color: white;
  }
  
  &__content {
    h3 {
      text-align: center;
      margin-bottom: 0.5rem;
      color: $primary-color;
    }
  }
  
  &__specialty {
    text-align: center;
    color: $secondary-color;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  &__experience {
    text-align: center;
    color: $text-light;
    font-size: 0.9rem;
    margin-bottom: 1rem;
  }
  
  &__description {
    text-align: center;
    color: $text-secondary;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }
  
  &__credentials {
    margin-bottom: 1.5rem;
    
    h4 {
      color: $primary-color;
      margin-bottom: 0.5rem;
    }
    
    ul {
      list-style: none;
      
      li {
        padding: 0.25rem 0;
        color: $text-secondary;
        font-size: 0.9rem;
        position: relative;
        padding-left: 1rem;
        
        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: $primary-color;
        }
      }
    }
  }
  
  &__specialties {
    margin-bottom: 1.5rem;
    
    h4 {
      color: $primary-color;
      margin-bottom: 0.5rem;
    }
  }
  
  &__schedule {
    margin-bottom: 1.5rem;
    
    h4 {
      color: $primary-color;
      margin-bottom: 0.5rem;
    }
  }
  
  &__actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
}

.specialties-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.specialty-tag {
  background: $bg-light;
  color: $primary-color;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
  border: 1px solid $primary-color;
}

.schedule-info {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: $text-secondary;
  font-size: 0.9rem;
  
  i {
    color: $primary-color;
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
    max-width: 900px;
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

.doctor-details {
  &__header {
    display: flex;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;
    padding-bottom: 2rem;
    border-bottom: 1px solid $border-color;
    
    @media (max-width: 768px) {
      flex-direction: column;
      text-align: center;
    }
  }
  
  &__image-placeholder {
    width: 150px;
    height: 150px;
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    color: white;
  }
  
  &__info {
    h3 {
      margin-bottom: 0.5rem;
      color: $primary-color;
    }
  }
  
  &__specialty {
    color: $secondary-color;
    font-weight: 500;
    margin-bottom: 0.5rem;
  }
  
  &__experience {
    color: $text-light;
    font-size: 0.9rem;
  }
  
  &__section {
    margin-bottom: 2rem;
    
    h4 {
      color: $primary-color;
      margin-bottom: 1rem;
    }
    
    p {
      color: $text-secondary;
      line-height: 1.6;
    }
    
    ul {
      list-style: none;
      
      li {
        padding: 0.5rem 0;
        color: $text-secondary;
        position: relative;
        padding-left: 1.5rem;
        
        &::before {
          content: '•';
          position: absolute;
          left: 0;
          color: $primary-color;
          font-weight: bold;
        }
      }
    }
  }
}

.languages {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.language-tag {
  background: $primary-color;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 500;
}
</style> 