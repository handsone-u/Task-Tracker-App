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

  function setUsername(newUsername) {
    username.value = newUsername
  }

  function setJwtToken(token) {
    jwt.value = token
  }

  function logout() {
    id.value = null
    username.value = null
    jwt.value
  }

  return {
    id,
    username,
    jwt,
    isFieldFocusRegistered,
    isAuthenticated,
    setId,
    setUsername,
    setJwtToken,
    logout,
  }
})
