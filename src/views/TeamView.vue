<script setup>
import BaseButton from '@/components/BaseButton.vue'
import CardBox from '@/components/CardBox.vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import { mdiAccountGroup } from '@mdi/js'
import { reactive, ref } from 'vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import { teamApiClient } from '@/services'
import BaseDivider from '@/components/BaseDivider.vue'

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
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton title="Teams" :icon="mdiAccountGroup" main>
        <BaseButton label="create team" color="info" @click="isCreateModalOpen = true" />
      </SectionTitleLineWithButton>

      <CardBox> </CardBox>

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
