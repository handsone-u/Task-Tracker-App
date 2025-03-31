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

const route = useRoute()
const userStore = useUserStore()
const teamStore = useTeamStore()

const activeTab = ref('projects')
const isTeamLeader = ref('TEAM_MEMBER')

const teamId = ref(route.params.teamId)

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
            :active="activeTab === 'members'"
            @click="activeTab = 'members'"
            label="Team Members"
            small
          />
          <BaseButton
            :active="activeTab === 'projects'"
            @click="activeTab = 'projects'"
            label="Projects"
            small
          />
          <BaseButton
            v-if="isTeamLeader"
            :active="activeTab === 'management'"
            @click="activeTab = 'management'"
            label="Team Management"
            small
          />
          <BaseButton label="Category 관리" small />
          <BaseButton label="Tag 관리" small />
        </BaseButtons>
      </SectionTitleLineWithButton>
      <div class="tabs flex space-x-4 border-b"></div>
      <div class="tab-content mt-4">
        <div v-if="activeTab === 'management'">
          <TeamManagement />
        </div>
        <div v-else-if="activeTab === 'members'">
          <TeamMembers />
        </div>
        <div v-else-if="activeTab === 'projects'">
          <TeamProjects />
        </div>
      </div>
    </SectionMain>
  </LayoutAuthenticated>
</template>
