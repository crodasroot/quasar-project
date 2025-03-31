import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export const useAuthStore = defineStore('auth', () => {
  const email = ref('');
  const password = ref('');
  const token = ref(localStorage.getItem('token') || '');

  const login = async () => {
    if (!email.value || !password.value) return;
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email: email.value,
        password: password.value,
      });
      token.value = response.data.token;
      localStorage.setItem('token', token.value);
    } catch (error) {
      console.error('Error de autenticación:', error.response?.data?.message || error);
      alert('Credenciales incorrectas');
    }
  };

  return { email, password, token, login };
});
