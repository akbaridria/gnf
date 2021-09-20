import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Create from "@/views/Create.vue"
import Profile from "@/views/Profile.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/assets/:tokenId',
    name: 'Assets',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Assets.vue')
  },
  {
    path: '/create',
    name: 'Create',
    component: Create
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
