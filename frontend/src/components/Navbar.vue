<template>
  <nav class="navbar" :class="{ 'navbar--scrolled': isScrolled }">
    <div class="container">
      <div class="navbar__content">
        <router-link to="/" class="navbar__logo">
          <img src="@/assets/LOGO.png" alt="Onkos Instituto del Cáncer" class="navbar__logo-img">
        </router-link>
        
        <div class="navbar__menu" :class="{ 'navbar__menu--open': isMenuOpen }">
          <router-link to="/" class="navbar__link" @click="closeMenu">Inicio</router-link>
          <router-link to="/servicios" class="navbar__link" @click="closeMenu">Servicios</router-link>
          <router-link to="/especialistas" class="navbar__link" @click="closeMenu">Especialistas</router-link>
          <router-link to="/contacto" class="navbar__link" @click="closeMenu">Contacto</router-link>
          <router-link to="/cita" class="btn btn--cta" @click="closeMenu">
            <i class="fas fa-calendar-alt"></i>
            Agendar Cita
          </router-link>
          <button @click="showAdminLogin" class="navbar__admin-link" title="Acceso Administrativo">
            <i class="fas fa-cog"></i>
          </button>
        </div>
        
        <button class="navbar__toggle" @click="toggleMenu" :class="{ 'navbar__toggle--active': isMenuOpen }">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',
  data() {
    return {
      isScrolled: false,
      isMenuOpen: false
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll() {
      this.isScrolled = window.scrollY > 50
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen
      document.body.style.overflow = this.isMenuOpen ? 'hidden' : ''
    },
    closeMenu() {
      this.isMenuOpen = false
      document.body.style.overflow = ''
    },
    showAdminLogin() {
      this.$emit('show-admin-login')
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  transition: all 0.3s ease;
  
  &--scrolled {
    background: rgba(255, 255, 255, 0.98);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  }
  
  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0;
  }
  
  &__logo {
    display: flex;
    align-items: center;
    text-decoration: none;
    transition: transform 0.3s ease;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  &__logo-img {
    height: 100%;
    width: auto;
    max-width: 220px;
    
    @media (max-width: 768px) {
      height: 40px;
      max-width: 150px;
    }
  }
  
  &__menu {
    display: flex;
    align-items: center;
    gap: 2rem;
    
    @media (max-width: 768px) {
      position: fixed;
      top: 100%;
      left: 0;
      right: 0;
      background: white;
      flex-direction: column;
      padding: 2rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      transform: translateY(-100%);
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease;
      
      &--open {
        transform: translateY(0);
        opacity: 1;
        visibility: visible;
      }
    }
  }
  
  &__link {
    color: $text-primary;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
    
    &:hover,
    &.router-link-active {
      color: $primary-color;
    }
  }
  
  &__admin-link {
    background: none;
    border: none;
    color: $text-light;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: all 0.3s ease;
    
    &:hover {
      color: $primary-color;
      background: rgba($primary-color, 0.1);
    }
  }
  
  &__toggle {
    display: none;
    flex-direction: column;
    background: none;
    border: none;
    cursor: pointer;
    padding: 8px;
    
    @media (max-width: 768px) {
      display: flex;
    }
    
    span {
      width: 25px;
      height: 3px;
      background: $primary-color;
      margin: 3px 0;
      transition: all 0.3s ease;
      border-radius: 2px;
    }
    
    &--active {
      span:nth-child(1) {
        transform: rotate(45deg) translate(5px, 5px);
      }
      
      span:nth-child(2) {
        opacity: 0;
      }
      
      span:nth-child(3) {
        transform: rotate(-45deg) translate(7px, -6px);
      }
    }
  }
}
</style> 