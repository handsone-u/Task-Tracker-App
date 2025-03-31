import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export const useTeamStore = defineStore('team', () => {
  const teams = ref([])

  return {
    teams,
  }
})
