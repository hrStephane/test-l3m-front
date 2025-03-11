<script setup>
  import { ref } from 'vue';
  import { TailwindPagination } from 'laravel-vue-pagination';
  import { useUsersStore } from '../../stores/users';

  const usersStore = useUsersStore();
  const users = ref({});
  const perPage = ref(10);

  const perPageOptions = [1,5,10,50,100]

  const getUsers = async (page = 1) => {
    const response = await usersStore.fetchUsers(page, perPage.value);
    users.value = response;
    console.log(response);
  };

  const deleteUser = async (id) => {
    try {
      await usersStore.deleteUser(id);
      getUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const changePerPage = () => {
    getUsers();
  };

  getUsers();
</script>

<template>
  <div>
    <div class="flex justify-between items-center">
      <h1 class="text-xl font-semibold">Users</h1>
      <router-link :to="{ name: 'user-create'}" class="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700">
        Create User
      </router-link>
    </div>

   

    <div class="mt-8">
      <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg">
        <table class="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold">Name</th>
              <th class="px-3 py-3.5 text-left text-sm font-semibold">Email</th>
              <th class="relative py-3.5 pl-3 pr-4">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="user in users.data" :key="user.id">
              <td class="py-4 pl-4 pr-3 text-sm">{{ user.name }}</td>
              <td class="px-3 py-4 text-sm">{{ user.email }}</td>
              <td class="text-right py-4 pr-4 text-sm">
                <router-link :to="{ name: 'user-details', params: { id: user.id }}" class="text-indigo-600 hover:text-indigo-900 mr-4">View</router-link>
                <router-link :to="{ name: 'user-edit', params: { id: user.id }}" class="text-indigo-600 hover:text-indigo-900 mr-4">Edit</router-link>
                <button @click="deleteUser(user.id)" class="text-red-600 hover:text-red-900">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>

        <TailwindPagination
          :data="users"
          @pagination-change-page="getUsers"
        />
      </div>
    </div>


    <div class="mt-4">
      <label for="perPage" class="mr-2">Items per page:</label>
      <select v-model="perPage" @change="changePerPage" id="perPage">
        <option v-for="value in perPageOptions" :key="value" :value="value">{{ value }}</option>
      </select>
    </div>

  </div>
</template>
