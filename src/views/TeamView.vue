<script setup>
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { mdiAccountGroup } from '@mdi/js'
import { onMounted, reactive, ref } from 'vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import { teamApiClient } from '@/services'
import BaseDivider from '@/components/BaseDivider.vue'
import router from '@/router'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseTable from '@/components/BaseTable.vue'
import TeamTable from '@/components/team/TeamTable.vue'

const isCreateModalOpen = ref(false)

const newTeam = reactive({
  name: '',
  description: '',
})

const confirm = () => {
  teamApiClient
    .createTeam(newTeam.name, newTeam.description)
    .then(() => {
      isCreateModalOpen.value = false
      newTeam.name = ''
      newTeam.description = ''
    })
    .catch((error) => {
      console.log(error)
    })
}

const teams = ref([])

const goToTeam = (item) => {
  console.log('item:', item) // item 값 확인
  const teamId = item.teamId
  console.log('teamId:', teamId) // teamId 값 확인
  if (!teamId) {
    console.error('Invalid teamId:', teamId)
    return
  }
  router.push(`/teams/${teamId}/dashboard`)
}

const leaveTeam = (item) => {
  const teamId = item.teamId
  teamApiClient
    .leaveTeam(teamId)
    .then(() => {
      teams.value = teams.value.filter((t) => t.teamId !== teamId)
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(async () => {
  try {
    teamApiClient
      .getMyTeamsWithManager()
      .then((data) => {
        data.myTeams.forEach((t) => {
          teams.value.push({
            teamId: t.teamId,
            teamName: t.teamName,
            myTeamRole: t.myTeamRole,
            teamManagerUsername: t.teamManagerUsername,
          })
        })
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (error) {
    console.error(error)
  }
})
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton title="Teams" :icon="mdiAccountGroup" main>
        <BaseButton label="create team" color="info" @click="isCreateModalOpen = true" />
      </SectionTitleLineWithButton>

      <TeamTable :teams="teams" @go-to-team="goToTeam" @leave-team="leaveTeam" />

      <CardBoxModal
        v-model="isCreateModalOpen"
        title="Let's create a team"
        button-label="Submit"
        has-cancel
        @confirm="() => confirm()"
      >
        <BaseDivider />
        <FormField label="팀명">
          <FormControl v-model="newTeam.name" type="text" required />
        </FormField>
        <FormField label="설명">
          <FormControl v-model="newTeam.description" type="text" />
        </FormField>
      </CardBoxModal>
    </SectionMain>
  </LayoutAuthenticated>
</template>
