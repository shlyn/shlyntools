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
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'home',
          component: () => import("@/views/home/IndexView.vue"),
          meta: {}
        },
        {
          path: '/xen-multi-mint',
          name: 'xenMultiMint',
          component: () => import("@/views/xen-multi-mint/IndexView.vue"),
          meta: {}
        },
        {
          path: '/xen-subgraph',
          name: 'xenSubgraph',
          component: () => import("@/views/xen-subgraph/IndexView.vue"),
          meta: {}
        }
      ]
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
