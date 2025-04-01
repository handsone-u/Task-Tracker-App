<script setup>
import { ref, computed } from 'vue'
import SectionMain from '@/components/SectionMain.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import BaseButton from '@/components/BaseButton.vue'
import CardBoxModal from '@/components/CardBoxModal.vue'
import ProjectCard from '@/components/project/ProjectCard.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'

const projectStatus = [
  { id: 'COMPLETED', label: '완료됨' },
  { id: 'IN_PROGRESS', label: '진행 중' },
  { id: 'NOT_STARTED', label: '시작 전' },
  { id: 'STOPPED', label: '중단됨' },
]

const projects = ref([
  {
    id: 1,
    projectName: 'Project Alpha',
    description: 'Alpha Project Description',
    status: projectStatus[3], // 중단됨
    startedAt: '2025-03-01T10:00:00.000Z',
    dueAt: '2025-04-10T23:59:59.000Z',
    leaderId: 'alice@gmail.com',
    members: ['Alice', 'Bob'],
  },
  {
    id: 2,
    projectName: 'Project Beta',
    description: 'Beta Project Description',
    status: projectStatus[1], // 진행 중
    startedAt: '2025-02-15T09:00:00.000Z',
    dueAt: '2025-03-30T18:00:00.000Z',
    leaderId: 'bob@gmail.com',
    members: ['Bob', 'Charlie'],
  },
  {
    id: 3,
    projectName: 'Project Gamma',
    description: 'Gamma Project Description',
    status: projectStatus[0], // 완료됨
    startedAt: '2025-01-01T08:00:00.000Z',
    dueAt: '2025-02-01T17:00:00.000Z',
    leaderId: 'charlie@gmail.com',
    members: ['Charlie', 'Alice'],
  },
  {
    id: 4,
    projectName: 'Project Delta',
    description: 'Delta Project Description',
    status: projectStatus[2], // 시작 전
    startedAt: '2025-04-01T10:00:00.000Z',
    dueAt: '2025-05-01T23:59:59.000Z',
    leaderId: 'david@gmail.com',
    members: ['David', 'Eve'],
  },
  {
    id: 5,
    projectName: 'Project Epsilon',
    description: 'Epsilon Project Description',
    status: projectStatus[1], // 진행 중
    startedAt: '2025-03-10T09:00:00.000Z',
    dueAt: '2025-04-20T18:00:00.000Z',
    leaderId: 'eve@gmail.com',
    members: ['Eve', 'Frank'],
  },
  {
    id: 6,
    projectName: 'Project Zeta',
    description: 'Zeta Project Description',
    status: projectStatus[0], // 완료됨
    startedAt: '2025-02-01T08:00:00.000Z',
    dueAt: '2025-03-01T17:00:00.000Z',
    leaderId: 'frank@gmail.com',
    members: ['Frank', 'Alice'],
  },
])

const showCreateProjectModal = ref(false)
const showEditProjectModal = ref(false)

const newProject = ref({
  projectName: '',
  description: '',
  status: projectStatus[2],
  startedAt: '',
  dueAt: '',
})

const selectedProject = ref({
  projectName: '',
  description: '',
  status: projectStatus[0], // 기본 상태 설정
  startedAt: '',
  dueAt: '',
})

const openCreateProjectModal = () => {
  showCreateProjectModal.value = true
  newProject.value = {
    projectName: '',
    description: '',
    status: projectStatus[2],
    startedAt: '',
    dueAt: '',
  }
}

const openEditProjectModal = (id) => {
  selectedProject.value = projects.value.find((project) => project.id === id)
  showEditProjectModal.value = true
}

const handleCreateSubmit = () => {
  projects.value.push({
    ...newProject.value,
    id: Date.now(), // 임시 ID 생성
  })
  showCreateProjectModal.value = false
}

const handleEditSubmit = () => {
  showEditProjectModal.value = false
}

const deleteProject = (id) => {
  projects.value = projects.value.filter((project) => project.id !== id)
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton title="Project" main></SectionTitleLineWithButton>
      <BaseButton label="New Project" color="primary" @click="openCreateProjectModal" />

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <ProjectCard
          v-for="project in projects"
          :key="project.id"
          :project="project"
          @edit="openEditProjectModal"
          @delete="deleteProject"
        />
      </div>

      <CardBoxModal
        v-model="showCreateProjectModal"
        title="Create Project"
        @confirm="handleCreateSubmit"
      >
        <FormField label="프로젝트 이름">
          <FormControl v-model="newProject.projectName" name="projectName" required />
        </FormField>

        <FormField label="프로젝트 설명">
          <FormControl
            v-model="newProject.description"
            name="description"
            type="textarea"
            rows="3"
          />
        </FormField>

        <FormField label="프로젝트 상태">
          <FormControl
            v-model="newProject.status"
            name="status"
            type="select"
            :options="projectStatus"
          />
        </FormField>

        <FormField label="시작일">
          <FormControl v-model="newProject.startedAt" name="startedAt" type="date" required />
        </FormField>

        <FormField label="마감일">
          <FormControl v-model="newProject.dueAt" name="dueAt" type="date" required />
        </FormField>
      </CardBoxModal>

      <CardBoxModal v-model="showEditProjectModal" title="Edit Project" @confirm="handleEditSubmit">
        <FormField label="프로젝트 이름">
          <FormControl v-model="selectedProject.projectName" name="projectName" required />
        </FormField>

        <FormField label="프로젝트 설명">
          <FormControl
            v-model="selectedProject.description"
            name="description"
            type="textarea"
            rows="3"
          />
        </FormField>

        <FormField label="프로젝트 상태">
          <FormControl
            v-model="selectedProject.status"
            name="status"
            type="select"
            :options="projectStatus"
          />
        </FormField>

        <FormField label="시작일">
          <FormControl v-model="selectedProject.startedAt" name="startedAt" type="date" required />
        </FormField>

        <FormField label="마감일">
          <FormControl v-model="selectedProject.dueAt" name="dueAt" type="date" required />
        </FormField>
      </CardBoxModal>
    </SectionMain>
  </LayoutAuthenticated>
</template>
