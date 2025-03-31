<script setup>
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import BaseButton from '@/components/BaseButton.vue'
import TeamManagement from '@/components/team/TeamManagement.vue'
import TeamMembers from '@/components/team/TeamMembers.vue'
import TeamProjects from '@/components/team/TeamProjects.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import { useUserStore } from '@/stores/user'
import { ref, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mdiAccountGroup } from '@mdi/js'
import { useTeamStore } from '@/stores/team'
import BaseButtons from '@/components/BaseButtons.vue'
import TeamCategoryTagManagement from '@/components/team/TeamCategoryTagManagement.vue'

const route = useRoute()
const userStore = useUserStore()
const teamStore = useTeamStore()

const activeTab = ref('projects')
const isTeamLeader = computed(() => {
  return true
})

const teamId = ref(route.params.teamId)

const team = ref({
  teamName: 'team1',
  description: 'desc',
})

const categories = ref([
  { id: 1, name: 'c1' },
  { id: 2, name: 'c2' },
])

const tags = ref([
  { id: 3, name: 't1' },
  { id: 4, name: 't2' },
])

watch(
  () => route.params.teamId,
  async (newTeamId) => {
    if (!newTeamId) return
    teamId.value = newTeamId

    try {
      await Promise.all([])
    } catch (error) {
      console.error('팀 조회 실패:', error)
    }
  },
  { immediate: true },
)
</script>
<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton title="Team Dashboard" :icon="mdiAccountGroup" main>
        <BaseButtons>
          <BaseButton
            v-if="isTeamLeader"
            :active="activeTab === 'management'"
            @click="activeTab = 'management'"
            color="danger"
            label="Team Management"
            small
          />
          <BaseButton
            :active="activeTab === 'members'"
            @click="activeTab = 'members'"
            color="info"
            label="Team Members"
            small
          />
          <BaseButton
            :active="activeTab === 'projects'"
            @click="activeTab = 'projects'"
            color="info"
            label="Projects"
            small
          />
          <BaseButton
            :active="activeTab === 'categoryAndTagManagement'"
            @click="activeTab = 'categoryAndTagManagement'"
            color="info"
            label="Category/Tag"
            small
          />
        </BaseButtons>
      </SectionTitleLineWithButton>
      <div class="tabs flex space-x-4 border-b"></div>
      <div class="tab-content mt-4">
        <div v-if="activeTab === 'management'">
          <TeamManagement v-model="team" />
        </div>
        <div v-else-if="activeTab === 'members'">
          <TeamMembers :isTeamLeader="isTeamLeader" />
        </div>
        <div v-else-if="activeTab === 'projects'">
          <TeamProjects />
        </div>
        <div v-else-if="activeTab === 'categoryAndTagManagement'">
          <TeamCategoryTagManagement v-model:categories="categories" v-model:tags="tags" />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
