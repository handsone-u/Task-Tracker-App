<script setup>
import BaseButtons from './BaseButtons.vue'
import CardBox from './CardBox.vue'
import { ref } from 'vue'
import TableCheckboxCell from './TableCheckboxCell.vue'

// TODO: 페이징 추가 필요
const props = defineProps({
  headers: {
    type: Array,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['update:selectedItems'])

const selectedItems = ref([])

function selectItem(item) {
  if (selectedItems.value.includes(item)) {
    selectedItems.value = selectedItems.value.filter((i) => i !== item)
  } else {
    selectedItems.value.push(item)
  }
  emit('update:selectedItems', selectedItems.value)
}

function selectAll(event) {
  selectedItems.value = event.target.checked ? [...items] : []
  emit('update:selectedItems', selectedItems.value)
}
</script>

<template>
  <CardBox class="mb-6" has-table>
    <table class="w-full">
      <thead>
        <tr>
          <th v-if="checkable" class="p-3 text-left">
            <input type="checkbox" @change="selectAll" />
          </th>
          <th v-for="header in headers" :key="header.key" class="p-3 text-left">
            {{ header.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in items" :key="index" class="border-b">
          <TableCheckboxCell v-if="checkable" />
          <td v-for="header in headers" :key="header.key" :data-label="header.label" class="p-3">
            {{ item[header.key] }}
          </td>
          <td v-if="$slots.actions" class="before:hidden lg:w-1 whitespace-nowrap">
            <BaseButtons type="justify-start lg:justify-end" no-wrap>
              <slot name="actions" :item="item" />
            </BaseButtons>
          </td>
        </tr>
      </tbody>
    </table>
  </CardBox>
</template>
