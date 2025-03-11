

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from '../../stores/users'
import TransactionList from '../transactions/TransactionList.vue'

const route = useRoute()
const usersStore = useUsersStore()

interface User {
  id: number;
  name: string;
  email: string;
  transactions?: any;
}


const user = ref<User | null>(null);

const id = parseInt(route.params.id as string) 

onMounted(async () => {
  const user_response = await usersStore.getUser(id)
  user.value = {
    ...user_response.user,
    transactions: user_response.transactions
  }
  console.log(user.value)
})

const fetchUserTransactions = async (page = 1, perPage = 10) => {

  console.log("perPage",perPage);

  const response = await usersStore.getUser(id, page , perPage);


  return response.transactions;
};

</script>

<template>
  <div v-if="user">
    <h3 class="text-xl font-semibold">User Information</h3>
    <div class="shadow rounded-lg p-4 bg-white flex-1">
      <dl>
        <div class="px-4 py-5">
          <dt class="text-sm font-medium">Full name</dt>
          <dd class="text-sm">{{ user.name }}</dd>
        </div>
        <div class="px-4 py-5">
          <dt class="text-sm font-medium">Email address</dt>
          <dd class="text-sm">{{ user.email }}</dd>
        </div>
      </dl>
    </div>
    <div class="px-4 py-3 text-right">
      <router-link :to="{ name: 'user-edit', params: { id: user.id }}" class="text-indigo-600 hover:text-indigo-900">Edit</router-link>
    </div>

    <div>
      <TransactionList
        :transactionsData="user.transactions" 
        :fetchTransactions="fetchUserTransactions">
      </TransactionList>
    </div>

  </div>



</template>
