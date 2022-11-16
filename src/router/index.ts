import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/IndexView.vue'

declare module "vue-router" {
  interface RouteMeta {
    requiresLogin?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import("@/views/home/IndexView.vue"),
          meta: {}
        }
      ]
    }
  ]
})

export default router
