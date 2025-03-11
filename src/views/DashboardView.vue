<script setup lang="ts">
import { UsersIcon } from '@heroicons/vue/24/outline'
import { useUsersStore } from '../stores/users'
import { onMounted, computed } from 'vue'
import { useTransactionsStore } from '../stores/transactions'

const usersStore = useUsersStore()
const transactionsStore = useTransactionsStore()

onMounted(async () => {
  await usersStore.fetchUsers()
  await transactionsStore.fetchTransactions()
})

const totalUsers = computed(() => usersStore.users.length)
const totalTransactions = computed(() => transactionsStore.transactions.length)
</script>

<template>
  <div class="flex space-x-4">
    <div class="shadow rounded-lg p-4 bg-white">
      <div class="flex items-center space-x-4">
        <UsersIcon class="h-6 w-6 text-gray-500" aria-hidden="true" />
        <div>
          <p class="text-sm text-gray-500">Total Users</p>
          <p class="text-xl font-semibold">{{ totalUsers }}</p>
        </div>
      </div>
      <router-link to="/users" class="text-indigo-600 text-sm mt-2 block">
        View all users
      </router-link>
    </div>
    <div class="shadow rounded-lg p-4 bg-white">
      <div class="flex items-center space-x-4">
        <SomeOtherIcon class="h-6 w-6 text-gray-500" aria-hidden="true" />
        <div>
          <p class="text-sm text-gray-500">Total transactions</p>
          <p class="text-xl font-semibold">{{ totalTransactions }}</p>
        </div>
      </div>
      <router-link to="/transactions" class="text-indigo-600 text-sm mt-2 block">
        View transactions
      </router-link>
    </div>
  </div>
</template>