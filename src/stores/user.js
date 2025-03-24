import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const id = ref(localStorage.getItem('id') || null)
  const username = ref(localStorage.getItem('username') || null)
  const jwt = ref(localStorage.getItem('jwt') || null)

  const isFieldFocusRegistered = ref(false)

  const isAuthenticated = computed(() => !!jwt.value)

  function setUserInformation(token, id0, username0) {
    jwt.value = token
    id.value = id0
    username.value = username0
    localStorage.setItem('jwt', token)
    localStorage.setItem('id', id0)
    localStorage.setItem('username', username0)
  }

  function setLogout() {
    id.value = null
    username.value = null
    jwt.value = null
    localStorage.removeItem('jwt')
    localStorage.removeItem('id')
    localStorage.removeItem('username')
  }

  return {
    id,
    username,
    jwt,
    isFieldFocusRegistered,
    isAuthenticated,
    setUserInformation,
    setLogout,
  }
})
