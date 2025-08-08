<template>
  <div class="home">
    <Navbar @show-admin-login="showAdminLogin" />
    
    <!-- Admin Login Modal -->
    <AdminLogin 
      :show-modal="showAdminLoginModal" 
      @close="showAdminLoginModal = false"
      @login-success="handleAdminLoginSuccess"
    />
    
    <!-- Hero Section -->
    <section class="section section--hero">
      <div class="container">
        <div class="hero">
          <div class="hero__content">
            <h1 class="hero__title fade-in-left">
              Cuidado Oncológico <br>
              <span class="hero__title-accent">Especializado</span>
            </h1>
            <p class="hero__subtitle fade-in-left">
              Más de 15 años de experiencia en el tratamiento integral del cáncer. 
              Tecnología de vanguardia y un equipo médico experto comprometido con tu salud.
            </p>
            <div class="hero__actions fade-in-left">
              <router-link to="/cita" class="btn btn--cta btn--large">
                <i class="fas fa-calendar-alt"></i>
                Agendar Cita
              </router-link>
              <router-link to="/servicios" class="btn btn--primary btn--large">
                <i class="fas fa-stethoscope"></i>
                Nuestros Servicios
              </router-link>
            </div>
          </div>
          <div class="hero__image fade-in-right">
            <div class="hero__image-placeholder">
              <i class="fas fa-user-md"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Servicios Destacados -->
    <section class="section section--light">
      <div class="container">
        <div class="text-center mb-8">
          <h2>Servicios Especializados</h2>
          <p>Ofrecemos una atención integral y personalizada para el tratamiento del cáncer</p>
        </div>
        
        <div class="grid grid--3">
          <div class="card card--feature fade-in-up">
            <div class="icon">
              <i class="fas fa-microscope"></i>
            </div>
            <h3>Consultas Oncológicas</h3>
            <p>Evaluación integral y diagnóstico especializado con los mejores oncólogos de la región.</p>
          </div>
          
          <div class="card card--feature fade-in-up">
            <div class="icon">
              <i class="fas fa-pills"></i>
            </div>
            <h3>Quimioterapia</h3>
            <p>Tratamiento farmacológico personalizado con tecnología avanzada y monitoreo constante.</p>
          </div>
          
          <div class="card card--feature fade-in-up">
            <div class="icon">
              <i class="fas fa-radiation"></i>
            </div>
            <h3>Radioterapia</h3>
            <p>Terapia de radiación de precisión con equipos de última generación para máxima efectividad.</p>
          </div>
          
          <div class="card card--feature fade-in-up">
            <div class="icon">
              <i class="fas fa-user-md"></i>
            </div>
            <h3>Cirugía Oncológica</h3>
            <p>Intervenciones quirúrgicas especializadas con técnicas mínimamente invasivas.</p>
          </div>
          
          <div class="card card--feature fade-in-up">
            <div class="icon">
              <i class="fas fa-brain"></i>
            </div>
            <h3>Psicología Oncológica</h3>
            <p>Apoyo emocional y psicológico para pacientes y familiares durante todo el proceso.</p>
          </div>
          
          <div class="card card--feature fade-in-up">
            <div class="icon">
              <i class="fas fa-apple-alt"></i>
            </div>
            <h3>Nutrición Oncológica</h3>
            <p>Planes nutricionales especializados para optimizar el tratamiento y la recuperación.</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Estadísticas -->
    <section class="section section--dark">
      <div class="container">
        <div class="stats">
          <div class="stats__item fade-in-up">
            <div class="stats__number">15+</div>
            <div class="stats__label">Años de Experiencia</div>
          </div>
          <div class="stats__item fade-in-up">
            <div class="stats__number">5000+</div>
            <div class="stats__label">Pacientes Atendidos</div>
          </div>
          <div class="stats__item fade-in-up">
            <div class="stats__number">95%</div>
            <div class="stats__label">Satisfacción del Paciente</div>
          </div>
          <div class="stats__item fade-in-up">
            <div class="stats__number">24/7</div>
            <div class="stats__label">Atención de Emergencias</div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Por qué elegirnos -->
    <section class="section">
      <div class="container">
        <div class="grid grid--2">
          <div class="why-us__content fade-in-left">
                    <h2>¿Por qué elegir Onkos Instituto del Cáncer?</h2>
        <p>En Onkos Instituto del Cáncer, entendemos que cada paciente es único y merece una atención personalizada y compasiva.</p>
            
            <div class="why-us__features">
              <div class="why-us__feature">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Equipo Médico Experto</h4>
                  <p>Oncólogos certificados con más de 15 años de experiencia en el tratamiento del cáncer.</p>
                </div>
              </div>
              
              <div class="why-us__feature">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Tecnología de Vanguardia</h4>
                  <p>Equipos médicos de última generación para diagnósticos precisos y tratamientos efectivos.</p>
                </div>
              </div>
              
              <div class="why-us__feature">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Atención Integral</h4>
                  <p>Enfoque holístico que incluye tratamiento médico, apoyo psicológico y nutricional.</p>
                </div>
              </div>
              
              <div class="why-us__feature">
                <i class="fas fa-check-circle"></i>
                <div>
                  <h4>Horarios Flexibles</h4>
                  <p>Consultas disponibles de lunes a viernes con opciones de citas de emergencia.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="why-us__image fade-in-right">
            <div class="why-us__image-placeholder">
              <i class="fas fa-hospital"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- CTA Section -->
    <section class="section section--light">
      <div class="container">
        <div class="cta text-center">
          <h2>¿Necesitas una consulta?</h2>
          <p>Nuestro equipo está listo para ayudarte. Agenda tu cita hoy mismo y da el primer paso hacia tu recuperación.</p>
          <div class="cta__actions">
            <router-link to="/cita" class="btn btn--cta btn--large">
              <i class="fas fa-calendar-alt"></i>
              Agendar Cita
            </router-link>
            <a href="tel:+5112345678" class="btn btn--secondary btn--large">
              <i class="fas fa-phone"></i>
              Llamar Ahora
            </a>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Footer -->
    <footer class="footer">
      <div class="container">
        <div class="footer__content">
          <div class="footer__section">
            <h3>Onkos Instituto del Cáncer</h3>
            <p>Centro especializado en oncología comprometido con la excelencia médica y el cuidado compasivo de nuestros pacientes.</p>
            <div class="footer__social">
              <a href="#"><i class="fab fa-facebook"></i></a>
              <a href="#"><i class="fab fa-twitter"></i></a>
              <a href="#"><i class="fab fa-instagram"></i></a>
              <a href="#"><i class="fab fa-linkedin"></i></a>
            </div>
          </div>
          
          <div class="footer__section">
            <h4>Servicios</h4>
            <ul>
              <li><a href="/servicios">Consultas Oncológicas</a></li>
              <li><a href="/servicios">Quimioterapia</a></li>
              <li><a href="/servicios">Radioterapia</a></li>
              <li><a href="/servicios">Cirugía Oncológica</a></li>
            </ul>
          </div>
          
          <div class="footer__section">
            <h4>Contacto</h4>
            <ul>
              <li><i class="fas fa-phone"></i> +51 1 234 5678</li>
              <li><i class="fas fa-envelope"></i> contacto@onkos.com</li>
              <li><i class="fas fa-map-marker-alt"></i> Av. Arequipa 123, Lima</li>
              <li><i class="fas fa-clock"></i> Lun-Vie 8:00 AM - 6:00 PM</li>
            </ul>
          </div>
          
          <div class="footer__section">
            <h4>Enlaces Rápidos</h4>
            <ul>
              <li><router-link to="/">Inicio</router-link></li>
              <li><router-link to="/especialistas">Especialistas</router-link></li>
              <li><router-link to="/contacto">Contacto</router-link></li>
              <li><router-link to="/cita">Agendar Cita</router-link></li>
            </ul>
          </div>
        </div>
        
        <div class="footer__bottom">
          <p>&copy; 2024 Onkos Instituto del Cáncer. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Navbar from '@/components/Navbar.vue'
import AdminLogin from '@/components/AdminLogin.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    AdminLogin
  },
  data() {
    return {
      showAdminLoginModal: false
    }
  },
  methods: {
    showAdminLogin() {
      this.showAdminLoginModal = true
    },
    handleAdminLoginSuccess(user) {
      // Redirigir al panel de administración
      this.$router.push('/admin')
    }
  }
}
</script>

<style lang="scss" scoped>
.hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    text-align: center;
  }
  
  &__title {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    
    @media (max-width: 768px) {
      font-size: 2.5rem;
    }
    
    &-accent {
      background: linear-gradient(135deg, $accent-color 0%, #fff 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
  }
  
  &__subtitle {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
    line-height: 1.6;
    color: #ffffff;
  }
  
  &__actions {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    
    @media (max-width: 768px) {
      justify-content: center;
    }
  }
  
  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &__image-placeholder {
    width: 400px;
    height: 400px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8rem;
    color: rgba(255, 255, 255, 0.3);
    
    @media (max-width: 768px) {
      width: 300px;
      height: 300px;
      font-size: 6rem;
    }
  }
}

.stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
  
  &__item {
    padding: 2rem;
  }
  
  &__number {
    font-size: 3rem;
    font-weight: 700;
    color: $accent-color;
    margin-bottom: 0.5rem;
  }
  
  &__label {
    font-size: 1.1rem;
    opacity: 0.8;
  }
}

.why-us {
  &__content {
    h2 {
      margin-bottom: 1.5rem;
    }
    
    p {
      font-size: 1.1rem;
      margin-bottom: 2rem;
    }
  }
  
  &__features {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  &__feature {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    
    i {
      color: $success-color;
      font-size: 1.5rem;
      margin-top: 0.25rem;
    }
    
    h4 {
      margin-bottom: 0.5rem;
      color: $primary-color;
    }
    
    p {
      margin: 0;
      color: $text-secondary;
    }
  }
  
  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  &__image-placeholder {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, $primary-color 0%, $secondary-color 100%);
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 8rem;
    color: white;
    opacity: 0.8;
    
    @media (max-width: 768px) {
      width: 300px;
      height: 300px;
      font-size: 6rem;
    }
  }
}

.cta {
  &__actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    flex-wrap: wrap;
    margin-top: 2rem;
  }
}

.footer {
  background: $bg-dark;
  color: white;
  padding: 4rem 0 2rem;
  
  &__content {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
  }
  
  &__section {
    h3, h4 {
      margin-bottom: 1rem;
      color: $primary-color;
    }
    
    p {
      margin-bottom: 1rem;
      opacity: 0.8;
    }
    
    ul {
      list-style: none;
      
      li {
        margin-bottom: 0.5rem;
        
        a {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity 0.3s ease;
          
          &:hover {
            opacity: 1;
            color: $primary-color;
          }
        }
        
        i {
          margin-right: 0.5rem;
          color: $primary-color;
        }
      }
    }
  }
  
  &__social {
    display: flex;
    gap: 1rem;
    
    a {
      width: 40px;
      height: 40px;
      background: $primary-color;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      text-decoration: none;
      transition: all 0.3s ease;
      
      &:hover {
        background: $secondary-color;
        transform: translateY(-2px);
      }
    }
  }
  
  &__bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding-top: 2rem;
    text-align: center;
    opacity: 0.6;
  }
}
</style> 