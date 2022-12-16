import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/layout/IndexView.vue'

declare module "vue-router" {
  interface RouteMeta {
    requiresLogin?: boolean;
  }
}

const router = createRouter({
  history: createWebHistory(),
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
    },
    {
      path: '/tools',
      component: Layout,
      redirect: '/tools/contract-deploy',
      children: [
        {
          path: '/tools/contract-deploy',
          name: 'contractTool',
          component: () => import("@/views/tools/ContractDeploy.vue"),
          meta: {}
        }
      ]
    },
    {
      path: '/xen-crypto',
      component: Layout,
      redirect: '/xen-crypto/batch-mint',
      children: [
        {
          path: '/xen-crypto/batch-mint',
          name: 'xenBatchMint',
          component: () => import("@/views/xen-crypto/XenFactory.vue"),
          meta: {}
        },
        {
          path: '/xen-crypto/subgraph',
          name: 'xenSubgraph',
          component: () => import("@/views/xen-crypto/XenSubgraph.vue"),
          meta: {}
        }
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import("@/views/not-found/IndexView.vue")
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router
