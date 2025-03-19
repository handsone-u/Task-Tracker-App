import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const id = ref(null)
  const username = ref(localStorage.getItem('username') || null)
  const jwt = ref(localStorage.getItem('jwt') || null)

  const isFieldFocusRegistered = ref(false)

  const isAuthenticated = computed(() => !!jwt.value)

  function setId(newId) {
    id.value = newId
  }

  function login(token, username0) {
    jwt.value = token
    username.value = username0
    localStorage.setItem('jwt', token)
    localStorage.setItem('username', username0)
  }

  function logout() {
    id.value = null
    username.value = null
    jwt.value = null
    localStorage.removeItem('jwt')
    localStorage.removeItem('username')
  }

  return {
    id,
    username,
    jwt,
    isFieldFocusRegistered,
    isAuthenticated,
    setId,
    login,
    logout,
  }
})
