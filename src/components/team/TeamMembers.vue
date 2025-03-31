<script setup>
import BaseTable from '../BaseTable.vue'
import BaseButton from '../BaseButton.vue'
import BaseButtons from '../BaseButtons.vue'
import CardBoxModal from '../CardBoxModal.vue'
import { ref } from 'vue'
import SectionTitle from '../SectionTitle.vue'
import FormField from '../FormField.vue'
import FormControl from '../FormControl.vue'
import { mdiIdentifier } from '@mdi/js'

const props = defineProps({
  isTeamLeader: {
    type: Boolean,
    default: false,
  },
})

const headers = [
  { key: 'username', label: '팀원 이름' },
  { key: 'role', label: '역할' },
]

const members = ref([
  { id: 1, username: 'Alice', role: 'Manager' },
  { id: 2, username: 'Bob', role: 'Member' },
])

const showInviteModal = ref(false)

const inviteMembersId = ref('')

function handleSelectedMembers(selectedMembers) {
  console.log('선택된 멤버:', selectedMembers)
}

const kickMember = (memberId) => {
  members.value = members.value.filter((m) => m.id !== memberId)
}

const openInviteModal = () => {
  showInviteModal.value = true
}
</script>
<template>
  <SectionTitle>Members</SectionTitle>
  <BaseButtons> <BaseButton label="invite" color="success" @click="openInviteModal" /></BaseButtons>
  <BaseTable
    :headers="headers"
    :items="members"
    selectable
    @update:selected-items="handleSelectedMembers"
  >
    <template #actions="{ item }">
      <BaseButton
        v-if="isTeamLeader"
        label="kick"
        color="danger"
        @click="() => kickMember(item.id)"
        small
      />
    </template>
  </BaseTable>
  <CardBoxModal v-model="showInviteModal" title="invite new member" button-label="Invite" hasCancel>
    <FormField label="Email address">
      <FormControl v-model="inviteMembersId" :icon="mdiIdentifier" type="email" required />
    </FormField>
  </CardBoxModal>
</template>
