<script setup>
import CardBox from '../CardBox.vue'
import BaseButtons from '../BaseButtons.vue'
import BaseButton from '../BaseButton.vue'
import PillTag from '../PillTag.vue'
import {
  mdiTagEdit,
  mdiTrashCan,
  mdiCheckCircle,
  mdiProgressClock,
  mdiPauseCircle,
  mdiCloseCircle,
} from '@mdi/js'

const props = defineProps({
  project: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['edit', 'delete'])

const formatDate = (date) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' }
  return new Date(date).toLocaleDateString(undefined, options)
}

const statusConfig = {
  COMPLETED: { color: 'success', icon: mdiCheckCircle },
  IN_PROGRESS: { color: 'info', icon: mdiProgressClock },
  NOT_STARTED: { color: 'warning', icon: mdiPauseCircle },
  STOPPED: { color: 'contrast', icon: mdiCloseCircle },
}
</script>

<template>
  <CardBox>
    <div class="flex items-center justify-between mb-4">
      <h3 class="text-lg font-semibold text-gray-800 dark:text-white">
        {{ project.projectName }}
      </h3>
      <PillTag
        :label="project.status.value"
        :color="statusConfig[project.status.id]?.color"
        :icon="statusConfig[project.status.id]?.icon"
      />
    </div>

    <p class="text-sm text-gray-600 dark:text-gray-400 mb-4">
      {{ project.description }}
    </p>

    <div class="grid grid-cols-2 gap-4 text-sm text-gray-600 dark:text-gray-400 mb-4">
      <div class="flex flex-col items-start">
        <div class="flex items-center mb-1">
          <svg class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="currentColor">
            <use xlink:href="#mdi-calendar" />
          </svg>
          <span><strong>시작일:</strong></span>
        </div>
        <span class="text-gray-800 dark:text-white">{{ formatDate(project.startedAt) }}</span>
      </div>
      <div class="flex flex-col items-start">
        <div class="flex items-center mb-1">
          <svg class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="currentColor">
            <use xlink:href="#mdi-calendar" />
          </svg>
          <span><strong>마감일:</strong></span>
        </div>
        <span class="text-gray-800 dark:text-white">{{ formatDate(project.dueAt) }}</span>
      </div>
      <div class="flex flex-col items-start">
        <div class="flex items-center mb-1">
          <svg class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="currentColor">
            <use xlink:href="#mdi-calendar" />
          </svg>
          <span><strong>팀원:</strong></span>
        </div>
        <span class="text-gray-800 dark:text-white">{{ project.members.join(', ') }}</span>
      </div>
      <div class="flex flex-col items-start">
        <div class="flex items-center mb-1">
          <svg class="w-5 h-5 mr-2 text-gray-500 dark:text-gray-400" fill="currentColor">
            <use xlink:href="#mdi-calendar" />
          </svg>
          <span><strong>프로젝트 리더:</strong></span>
        </div>
        <span class="text-gray-800 dark:text-white">{{ project.leaderId }}</span>
      </div>
    </div>

    <BaseButtons type="flex justify-center space-x-2">
      <BaseButton
        color="info"
        :icon="mdiTagEdit"
        @click="$emit('edit', project.id)"
        label="Edit"
        small
      />
      <BaseButton
        color="danger"
        :icon="mdiTrashCan"
        @click="$emit('delete', project.id)"
        label="Delete"
        small
      />
    </BaseButtons>
  </CardBox>
</template>
