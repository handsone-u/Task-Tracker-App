import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { useMainStore } from '@/stores/main.js'
import { useDarkModeStore } from './stores/darkMode'
import { useUserStore } from './stores/user'

import './css/main.css'
import { useTeamStore } from './stores/team'

// Init Pinia
const pinia = createPinia()

// Create Vue app
createApp(App).use(router).use(pinia).mount('#app')

// Init dark mode store
const darkModeStore = useDarkModeStore(pinia)

if (
  (!localStorage['darkMode'] && window.matchMedia('(prefers-color-scheme: dark)').matches) ||
  localStorage['darkMode'] === '1'
) {
  darkModeStore.set(true)
}

// Init user store
const userStore = useUserStore(pinia)

if (localStorage.getItem('jwt')) {
  userStore.setUserInformation(
    localStorage.getItem('jwt'),
    localStorage.getItem('id'),
    localStorage.getItem('username'),
  )
}

const teamStore = useTeamStore(pinia)

// Default title tag
const defaultDocumentTitle = 'Task-Tracker'

// Set document title from route meta
router.afterEach((to) => {
  document.title = to.meta?.title
    ? `${to.meta.title} — ${defaultDocumentTitle}`
    : defaultDocumentTitle
})
