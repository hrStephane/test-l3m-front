import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'
import { useTokenStore } from './token'

interface User {
  id: number
  email: string
  name: string
}

interface LoginResponse {
  user: User
  token: string
}

export const useAuthStore = defineStore('auth', () => {
  const tokenStore = useTokenStore()
  const user = ref<User | null>(null)
  const isAuthenticated = ref(!!tokenStore.getToken())

  const apiEndpoint = import.meta.env.VITE_API_BASE_URL;

  if (tokenStore.getToken()) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${tokenStore.getToken()}`
  }

  async function login(email: string, password: string) {
    try {
      const response = await axios.post<LoginResponse>(`${apiEndpoint}/api/auth/login`, {
        email,
        password
      })
      
      user.value = response.data.user
      tokenStore.setToken(response.data.token)
      isAuthenticated.value = true
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      
      return true
    } catch (error) {
      console.error('Login failed:', error)
      return false
    }
  }

  async function register(email: string, password: string, name: string) {
    try {
      const response = await axios.post<LoginResponse>(`${apiEndpoint}/api/auth/register`, {
        email,
        password,
        name
      })
      
      user.value = response.data.user
      tokenStore.setToken(response.data.token)
      isAuthenticated.value = true
      
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      
      return true
    } catch (error) {
      console.error('Registration failed:', error)
      return false
    }
  }

  async function logout() {
    try {
      await axios.post(`${apiEndpoint}/api/auth/logout`)
      user.value = null
      tokenStore.clearToken()
      isAuthenticated.value = false
      delete axios.defaults.headers.common['Authorization']
    } catch (error) {
      console.error('Logout failed:', error)
      return false
    }
  

  }

  return {
    user,
    isAuthenticated,
    login,
    register,
    logout
  }
})