import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'list',
      component: () => import('../views/TodoListView.vue')
    },
    {
      path: '/details',
      name: 'details',
      component: () => import('../views/TodoDetailsView.vue')
    }
  ]
})

export default router
