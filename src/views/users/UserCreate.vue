<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUsersStore } from '../../stores/users'

const router = useRouter()
const usersStore = useUsersStore()

const formData = ref({
  name: '',
  email: '',
})

const errors = ref({
  name: '',
  email: '',
})

const validateForm = () => {
  errors.value.name = formData.value.name.trim() ? '' : 'Name is required.'
  errors.value.email = formData.value.email.trim() ? '' : 'Email is required.'
  return !errors.value.name && !errors.value.email
}

const handleSubmit = async () => {
  if (!validateForm()) return

  try {
    await usersStore.createUser(formData.value)
    router.push({ name: 'users' })
  } catch (error) {
    console.error('Error creating user:', error)
  }
}
</script>

<template>
  <div>
    <h3>Create User</h3>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name</label>
        <input 
          type="text" 
          v-model="formData.name" 
          id="name" 
          class="border p-2 rounded w-full" 
        />
        <p v-if="errors.name" class="text-red-600">{{ errors.name }}</p>
      </div>

      <div>
        <label for="email">Email</label>
        <input 
          type="email" 
          v-model="formData.email" 
          id="email" 
          class="border p-2 rounded w-full" 
        />
        <p v-if="errors.email" class="text-red-600">{{ errors.email }}</p>
      </div>

      <div class="flex justify-end gap-2 my-4">
        <router-link :to="{ name: 'users' }" class="bg-red-600 text-white p-2 rounded">Cancel</router-link>
        <button type="submit" class="bg-indigo-600 text-white p-2 rounded">Create</button>
      </div>
    </form>
  </div>
</template>