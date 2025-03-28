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

const headers = [
  { key: 'teamName', label: '팀 이름' },
  { key: 'teamManagerUsername', label: '팀장' },
  { key: 'myTeamRole', label: '역할' },
]

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

const leaveTeam = (teamId) => {
  teamApiClient
    .leaveTeam(teamId)
    .then(() => {
      teams.value = teams.value.filter((t) => t.teamId !== teamId)
    })
    .catch((error) => {
      console.error(error)
    })
}

const updateSelected = () => {}

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

      <BaseTable
        :headers="headers"
        :items="teams"
        selectable
        @update:selected-items="updateSelected"
      >
        <template #actions="{ item }">
          <BaseButtons>
            <BaseButton color="info" :rounded-full="true" small @click="() => goToTeam(item)" />
            <BaseButton
              color="danger"
              :rounded-full="true"
              outline
              small
              @click="() => leaveTeam(item)"
            />
          </BaseButtons>
        </template>
      </BaseTable>
      <!-- <CardBox hasTable>
        <table class="w-full">
          <thead>
            <tr class="border-b">
              <th class="p-3 text-left">teamName</th>
              <th class="p-3 text-left">teamManagerUsername</th>
              <th class="p-3 text-left">myRole</th>
              <th class="p-3 text-center">액션</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="team in teams" :key="team.teamId" class="border-b">
              <td class="p-3">{{ team.teamName }}</td>
              <td class="p-3">{{ team.teamManagerUsername }}</td>
              <td class="p-3">{{ team.myTeamRole }}</td>
              <td class="p-3">
                // TODO: 팀 매니저는 팀 삭제 가능하도록 버튼 구현.
                <BaseButtons type="justify-start lg:justify-center" no-wrap>
                  <BaseButton
                    label="보기"
                    color="info"
                    :rounded-full="true"
                    small
                    @click="() => goToTeam(team.teamId)"
                  />
                  <BaseButton
                    label="탈퇴"
                    color="danger"
                    :rounded-full="true"
                    outline
                    small
                    @click="() => leaveTeam(team.teamId)"
                  />
                </BaseButtons>
              </td>
            </tr>
          </tbody>
        </table>
      </CardBox> -->

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
