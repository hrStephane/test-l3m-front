import axios from 'axios'
import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export interface User {
  id: number
  name: string
  email: string
}

export interface UserCreation {
  name: string
  email: string
  password?: string
}

const apiEndpoint = import.meta.env.VITE_API_BASE_URL;

export const useUsersStore = defineStore('users', () => {
  const users = ref<User[]>([])
  const totalPages = ref(0)

  async function fetchUsers(page: number = 1, limit: number = 10) {
    try {
      const response = await axios.get(`${apiEndpoint}/api/users`, {
        headers: {
          Accept: 'application/json'
        },
        params: {
          page: page,
          limit: limit 
        }
      })
      // console.log(response.data.last_page)
      users.value = response.data.data;
      totalPages.value = response.data.last_page;

      return response.data

    } catch (error) {
      console.error('Error fetching users:', error)
    }
  }
  function getUsers() {
    return users.value
  }

  async function getUser(id: number, transactionsPage: number = 1, transactionPerPage: number = 10) {

    try {
      const response = await axios.get(`${apiEndpoint}/api/users/${id}`, {
        headers: {
          Accept: 'application/json'
        },
        params: {
          page: transactionsPage,
          limit: transactionPerPage
        }
      })

      if(response.data.error){
        throw new Error(response.data.error)
      }

      return {
        'user': response.data.user,
        'transactions': response.data.transactions
      }
    } catch (error) {
      console.error('Error fetching user:', error)
      throw error
    }
  }
  async function updateUser(id: number, data: Partial<User>) {
    try {
      const response = await axios.put(`${apiEndpoint}/api/users/${id}`, data, {
        headers: {
          Accept: 'application/json'
        }
      })

      const index = users.value.findIndex(user => user.id === id)
      if (index !== -1) {
        users.value[index] = { ...users.value[index], ...response.data }
      }
      console.log('User updated:', response.data)
    } catch (error) {
      console.error('Error updating user:', error)
      throw error
    }
  }

  async function createUser(data: UserCreation) {
    try {
      const response = await axios.post(`${apiEndpoint}/api/users`, data, {
        headers: {
          Accept: 'application/json'
        }
      })
      console.log('User created:', response.data)
    } catch (error) {
      console.error('Error creating user:', error)
      throw error
    }
  }

  async function deleteUser(id: number) {
    try {
      const response = await axios.delete(`${apiEndpoint}/api/users/${id}`, {
        headers: {
          Accept: 'application/json'
        }
      })
      console.log('User deleted:', response.data)
    } catch (error) {
      console.error('Error deleting user:', error)
      throw error
    }
  }

  onMounted(() => {
    fetchUsers()
  })

  return {
    users,
    totalPages,
    fetchUsers,
    getUsers,
    getUser,
    updateUser,
    deleteUser,
    createUser
  }
})