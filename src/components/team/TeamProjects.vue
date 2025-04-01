<script setup>
import SectionTitle from '../SectionTitle.vue'
import BaseButton from '../BaseButton.vue'
import BaseTable from '../BaseTable.vue'
import { computed, ref } from 'vue'
import CardBoxModal from '../CardBoxModal.vue'

const headers = [
  { key: 'projectName', label: '프로젝트 이름' },
  { key: 'status', label: '상태' },
]

const projects = ref([
  { id: 1, projectName: 'Project Alpha', status: 'In Progress', description: 'this...' },
  { id: 2, projectName: 'Project Beta', status: 'Completed', description: "it's..." },
])

const showProjectDetailModal = ref(false)
const selectedProjectId = ref(null)
const selectedProject = computed(() => {
  return projects.value.find((p) => p.id === selectedProjectId.value)
})

const viewProject = (id) => {
  selectedProjectId.value = id
  showProjectDetailModal.value = true
}

const deleteProject = (id) => {
  projects.value = projects.value.filter((p) => p.id !== id)
}
</script>
<template>
  <SectionTitle>Projects</SectionTitle>
  <BaseTable :headers="headers" :items="projects" checkable>
    <template #actions="{ item }">
      <BaseButton label="View" color="info" @click="() => viewProject(item.id)" small />
      <BaseButton label="Delete" color="danger" @click="() => deleteProject(item.id)" small />
    </template>
  </BaseTable>

  <CardBoxModal v-model="showProjectDetailModal" :title="selectedProject?.projectName" hasCancel>
    <p><strong>Status:</strong> {{ selectedProject?.status }}</p>
    <p><strong>Description:</strong> {{ selectedProject?.description }}</p>
  </CardBoxModal>
</template>
