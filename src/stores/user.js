import { login } from '@/services/api'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const id = ref(null)
  const username = ref(null)
  const jwt = ref(null)

  const isFieldFocusRegistered = ref(false)

  const isAuthenticated = computed(() => !!jwt.value)

  function setId(newId) {
    id.value = newId
  }

  function login(token, username0) {
    jwt.value = token
    username.value = username0
  }

  function logout() {
    id.value = null
    username.value = null
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
