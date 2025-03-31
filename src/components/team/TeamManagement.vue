<script setup>
import { computed } from 'vue'
import BaseButtons from '../BaseButtons.vue'
import BaseButton from '../BaseButton.vue'
import CardBox from '../CardBox.vue'
import FormField from '../FormField.vue'
import FormControl from '../FormControl.vue'
import SectionTitle from '../SectionTitle.vue'
import router from '@/router'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

const value = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
})

// TODO: call update API
const submitUpdateTeam = () => {
  console.log(value.value.teamName)
  console.log(value.value.description)
}

// TODO: call deleteTeam API
//  - Modal check
const disbandTeam = () => {
  router.push('/teams')
}
</script>

<template>
  <SectionTitle>Team Management</SectionTitle>
  <div>
    <CardBox is-form @submit.prevent="submitUpdateTeam">
      <FormField label="Change team name">
        <FormControl v-model="value.teamName" />
      </FormField>
      <FormField label="Change team description">
        <FormControl v-model="value.description" />
      </FormField>

      <template #footer>
        <BaseButtons>
          <BaseButton color="info" type="submit" label="Submit" />
          <BaseButton label="Disband Team" color="danger" @click="disbandTeam" />
        </BaseButtons>
      </template>
    </CardBox>
  </div>
</template>
