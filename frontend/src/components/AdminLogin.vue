<template>
  <div class="admin-login" v-if="showModal">
    <div class="admin-login__overlay" @click="closeModal"></div>
    <div class="admin-login__modal">
      <div class="admin-login__header">
        <h2>Acceso Administrativo</h2>
        <button @click="closeModal" class="admin-login__close">
          <i class="fas fa-times"></i>
        </button>
      </div>
      
      <form @submit.prevent="handleLogin" class="admin-login__form">
        <div class="admin-login__field">
          <label for="email">Correo o Usuario</label>
          <input
            id="email"
            v-model="email"
            type="text"
            placeholder="Ingresa tu correo o nombre de usuario"
            required
            :disabled="isLoading"
          />
        </div>
        
        <div class="admin-login__field">
          <label for="password">Contraseña</label>
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Ingresa tu contraseña"
            required
            :disabled="isLoading"
          />
        </div>
        
        <div v-if="error" class="admin-login__error">
          {{ error }}
        </div>
        
        <button 
          type="submit" 
          class="btn btn--primary admin-login__submit"
          :disabled="isLoading"
        >
          <i v-if="isLoading" class="fas fa-spinner fa-spin"></i>
          <span v-else>Iniciar Sesión</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'AdminLogin',
  props: {
    showModal: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      email: '',
      password: '',
      error: '',
      isLoading: false
    }
  },
  methods: {
    async handleLogin() {
      this.isLoading = true
      this.error = ''
      
      try {
        const response = await axios.post('/api/admin/login', {
          email: this.email,
          password: this.password
        })
        
        if (response.data.success) {
          // Guardar token en localStorage
          localStorage.setItem('adminToken', response.data.token)
          localStorage.setItem('adminUser', JSON.stringify(response.data.user))
          
          // Emitir evento de login exitoso
          this.$emit('login-success', response.data.user)
          
          // Cerrar modal
          this.closeModal()
          
          // Limpiar formulario
          this.email = ''
          this.password = ''
        }
      } catch (error) {
        this.error = error.response?.data?.message || 'Error al iniciar sesión'
      } finally {
        this.isLoading = false
      }
    },
    
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.admin-login {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
  }
  
  &__modal {
    position: relative;
    background: white;
    border-radius: 12px;
    padding: 2rem;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
    animation: slideIn 0.3s ease-out;
  }
  
  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 2rem;
    
    h3 {
      margin: 0;
      color: $text-primary;
      font-size: 1.5rem;
    }
  }
  
  &__close {
    background: none;
    border: none;
    font-size: 1.2rem;
    color: $text-light;
    cursor: pointer;
    padding: 0.5rem;
    
    &:hover {
      color: $text-primary;
    }
  }
  
  &__form {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  
  &__field {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    
    label {
      font-weight: 500;
      color: $text-primary;
      font-size: 0.9rem;
    }
    
    input {
      padding: 0.75rem 1rem;
      border: 2px solid $border-color;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      
      &:focus {
        outline: none;
        border-color: $primary-color;
      }
      
      &::placeholder {
        color: $text-light;
      }
    }
  }
  
  &__error {
    background: #fef2f2;
    color: #dc2626;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    border: 1px solid #fecaca;
    font-size: 0.9rem;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 