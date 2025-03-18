import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {
  const id = ref(null)
  const password = ref(null)
  const jwt = ref(null)

  const isFieldFocusRegistered = ref(false)

  function setJwtToken(token) {
    jwt.value = token
  }

  return {
    id,
    password,
    jwt,
    isFieldFocusRegistered,
    setJwtToken,
  }
})
