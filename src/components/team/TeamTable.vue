<script setup>
import BaseTable from '../BaseTable.vue'
import BaseButtons from '../BaseButtons.vue'
import BaseButton from '../BaseButton.vue'

const props = defineProps({
  teams: {
    type: Array,
    required: true,
  },
})

const emits = defineEmits(['go-to-team', 'leave-team'])

const headers = [
  { key: 'teamName', label: '팀 이름' },
  { key: 'teamManagerUsername', label: '팀장' },
  { key: 'myTeamRole', label: '역할' },
]

const updateSelected = () => {}
</script>

<template>
  <BaseTable :headers="headers" :items="teams" checkable @update:selected-items="updateSelected">
    <template #actions="{ item }">
      <BaseButtons>
        <BaseButton color="info" :rounded-full="true" small @click="$emit('go-to-team', item)" />
        <BaseButton
          color="danger"
          :rounded-full="true"
          outline
          small
          @click="$emit('leave-team', item)"
        />
      </BaseButtons>
    </template>
  </BaseTable>
</template>
