import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Create from "@/views/Create.vue"
import Profile from "@/views/Profile.vue"
import Owner from "@/views/Owner.vue"

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/assets/',
    name: 'Assets',
    component: () => import('../views/Assets.vue')
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
  },
  {
    path: '/owner',
    name: 'Owner',
    component: Owner
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
