import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useAuthStore = defineStore('auth', () => {
  const email = ref('')
  const password = ref('')
  const token = ref(localStorage.getItem('token') || '')
  const dataUser = ref(localStorage.getItem('dataUser') || '')
  const login = async () => {
    if (!email.value || !password.value) return
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email.value,
        password: password.value,
      })
      console.log(response)
      token.value = response.data.token
      dataUser.value = response.data
      localStorage.setItem('token', token.value)
      localStorage.setItem('dataUser', dataUser)
    } catch (error) {
      console.error('Error de autenticación:', error.response?.data?.message || error)
      alert('Credenciales incorrectas')
    }
  }

  // has la funcion para cerrar sesion
  const logout = () => {
    token.value = ''
    localStorage.removeItem('token')
  }

  return { email, password, token, login, logout }
})
