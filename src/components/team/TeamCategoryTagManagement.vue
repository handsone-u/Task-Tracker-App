<script setup>
import BaseButtons from '../BaseButtons.vue'
import BaseButton from '../BaseButton.vue'
import BaseTable from '../BaseTable.vue'
import { ref, reactive } from 'vue'
import BaseDivider from '../BaseDivider.vue'
import SectionTitle from '../SectionTitle.vue'
import CardBoxModal from '../CardBoxModal.vue'
import FormField from '../FormField.vue'
import FormControl from '../FormControl.vue'

const categories = defineModel('categories')
const tags = defineModel('tags')

const emit = defineEmits(['update:modelValue'])

const categoryHeaders = [{ key: 'name', label: '카테고리 이름' }]
const tagHeaders = [{ key: 'name', label: '태그 이름' }]

const showAddCategoryModal = ref(false)
const showAddTagModal = ref(false)

const newCategory = reactive({
  name: '',
  desctiption: '',
})

const newTag = reactive({
  name: '',
  desctiption: '',
})

const openAddCatgoryModal = () => {
  showAddCategoryModal.value = true
}

const editCategory = (id) => {
  console.log('카테고리/태그 수정:', id)
}

const deleteCategory = (id) => {
  console.log('카테고리/태그 삭제:', id)
}

const openAddTagModal = () => {
  showAddTagModal.value = true
}

const editTag = (id) => {
  console.log('카테고리/태그 수정:', id)
}

const deleteTag = (id) => {
  console.log('카테고리/태그 삭제:', id)
}
</script>
<template>
  <BaseButtons>
    <BaseButton label="Add Category" color="primary" @click="openAddCatgoryModal" />
    <BaseButton label="Add Tag" color="primary" @click="openAddTagModal" />
  </BaseButtons>

  <div class="flex space-x-4">
    <div class="flex-1">
      <SectionTitle>Category</SectionTitle>
      <BaseTable :headers="categoryHeaders" :items="categories" checkable>
        <template #actions="{ item }">
          <BaseButtons>
            <BaseButton label="Edit" color="warning" @click="() => editCategory(item.id)" small />
            <BaseButton
              label="Delete"
              color="danger"
              @click="() => deleteCategory(item.id)"
              small
            />
          </BaseButtons>
        </template>
      </BaseTable>
    </div>

    <div class="flex-1">
      <SectionTitle>Tag</SectionTitle>
      <BaseTable :headers="tagHeaders" :items="tags" checkable>
        <template #actions="{ item }">
          <BaseButtons>
            <BaseButton label="Edit" color="warning" @click="() => editTag(item.id)" small />
            <BaseButton label="Delete" color="danger" @click="() => deleteTag(item.id)" small />
          </BaseButtons>
        </template>
      </BaseTable>
    </div>
  </div>
  <CardBoxModal v-model="showAddCategoryModal" title="Add new category" hasCancel>
    <FormField label="name">
      <FormControl v-model="newCategory.name" required />
    </FormField>
    <FormField label="description">
      <FormControl v-model="newCategory.desctiption" />
    </FormField>
  </CardBoxModal>
  <CardBoxModal v-model="showAddTagModal" title="Add new tag" hasCancel>
    <FormField label="name">
      <FormControl v-model="newTag.name" required />
    </FormField>
    <FormField label="description">
      <FormControl v-model="newTag.desctiption" />
    </FormField>
  </CardBoxModal>
</template>
