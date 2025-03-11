import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/RegisterView.vue'),
      meta: { requiresGuest: true }
    },
    {
      path: '/',
      component: () => import('../layouts/DashboardLayout.vue'),
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('../views/DashboardView.vue')
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('../views/users/UserList.vue')
        },
        {
          path: 'users/:id',
          name: 'user-details',
          component: () => import('../views/users/UserDetails.vue')
        },
        {
          path: 'users/:id/edit',
          name: 'user-edit',
          component: () => import('../views/users/UserEdit.vue')
        },
        {
          path: 'users/create',
          name: 'user-create',
          component: () => import('../views/users/UserCreate.vue')
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import('../views/transactions/TransactionList.vue')
        },
        {
          path: 'transactions/:id',
          name: 'transaction-details',
          component: () => import('../views/transactions/TransactionDetails.vue')
        },
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  
  if (to.meta.requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (to.meta.requiresGuest && authStore.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router