import { name } from '@vue/eslint-config-prettier/skip-formatting'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    meta: {
      title: 'Login',
    },
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },
  {
    meta: {
      title: 'Register',
    },
    path: '/register',
    name: 'register',
    component: () => import('@/views/RegisterView.vue'),
  },
  {
    meta: {
      title: 'Home',
    },
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    meta: {
      title: 'Profile',
    },
    path: '/profile',
    name: 'profile',
    component: () => import('@/views/ProfileView.vue'),
  },
  {
    mata: {
      title: 'Teams',
    },
    path: '/teams',
    name: 'teams',
    component: () => import('@/views/TeamView.vue'),
  },
  {
    mata: {
      title: 'Team-Dashboard',
    },
    path: `/teams/:teamId/dashboard`,
    name: 'team-dashboard',
    component: () => import('@/views/TeamDashboardView.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { top: 0 }
  },
})

export default router
