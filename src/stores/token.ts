import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useTokenStore = defineStore('token', () => {
  const token = ref<string | null>(localStorage.getItem('token'))

  function setToken(newToken: string | null) {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('token', newToken)
    } else {
      localStorage.removeItem('token')
    }
  }

  function getToken(): string | null {
    return token.value
  }

  function clearToken() {
    token.value = null
    localStorage.removeItem('token')
  }

  return {
    token,
    setToken,
    getToken,
    clearToken
  }
})