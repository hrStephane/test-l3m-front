<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUsersStore } from '../../stores/users'

const route = useRoute()
const router = useRouter()
const usersStore = useUsersStore()

interface User {
  id: number;
  name: string;
  email: string;
}

const user = ref<User | null>(null);
const formData = ref({
  name: '',
  email: '',
})

const id = parseInt(route.params.id as string) 

const handleSubmit = () => {
  usersStore.updateUser(id, formData.value)
  router.push({ name: 'user-details', params: { id: id } })
}

onMounted(async () => {
  let user_response = await usersStore.getUser(id)
  user.value = {
    ...user_response.user
  }
  if (user.value) {
    formData.value.name = user.value.name
    formData.value.email = user.value.email
  }
})
</script>

<template>
  <div v-if="user">
    <h3>Edit User</h3>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="name">Name</label>
        <input type="text" v-model="formData.name" id="name" class="border p-2 rounded w-full" />
      </div>

      <div>
        <label for="email">Email</label>
        <input type="email" v-model="formData.email" id="email" class="border p-2 rounded w-full" />
      </div>

      <div class="flex justify-end gap-2 my-4">
        <router-link :to="{ name: 'users' }" class="bg-red-600 text-white p-2 rounded">Cancel</router-link>
        <button type="submit" class="bg-indigo-600 text-white p-2 rounded">Save</button>
      </div>
    </form>
  </div>
</template>