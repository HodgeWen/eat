import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/eat',
      alias: '/',
      component: () => import('@/views/eat.vue')
    },
    {
      path: '/food',
      component: () => import('@/views/food.vue')
    },
    {
      path: '/food-type',
      component: () => import('@/views/food-type.vue')
    }
  ]
})

export default router
