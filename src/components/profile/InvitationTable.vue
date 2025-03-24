<script setup>
import { memberApiClient } from '@/services'
import { ref, computed, onMounted } from 'vue'
import BaseButton from '../BaseButton.vue'
import BaseButtons from '../BaseButtons.vue'
import { mdiTrashCan, mdiHandOkay } from '@mdi/js'
import BaseLevel from '../BaseLevel.vue'
import TableCheckboxCell from '../TableCheckboxCell.vue'

const invitations = ref([])

const currentPage = ref(0)

const currentPageHuman = computed(() => currentPage.value + 1)

const perPage = ref(5)

const numPages = computed(() => Math.ceil(invitations.value.length / perPage.value))

const pagesList = computed(() => {
  const pagesList = []

  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }

  return pagesList
})

const itemsPaginated = computed(() =>
  invitations.value.slice(
    perPage.value * currentPage.value,
    perPage.value * (currentPage.value + 1),
  ),
)

const checkedRows = ref([])

const checked = (isChecked, item) => {
  if (isChecked) {
    checkedRows.value.push(item)
  } else {
    checkedRows.value = remove(checkedRows.value, (row) => row.id === item.id)
  }
}

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach((item) => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

function acceptInvitation(itemId) {
  memberApiClient.acceptInvitation(itemId).catch((error) => {
    console.error(error)
  })
  invitations.value = invitations.value.filter((item) => item.id !== itemId)
}

function declineInvitation(itemId) {
  memberApiClient.declineInvitation(itemId).catch((error) => {
    console.error(error)
  })
  invitations.value = invitations.value.filter((item) => item.id !== itemId)
}

onMounted(async () => {
  try {
    memberApiClient
      .getInvitations()
      .then((data) => {
        console.log(data)
        invitations.value = data.getInvitations()
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
  <table>
    <thead>
      <tr>
        <th />
        <th>Team Name</th>
        <th />
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in itemsPaginated" :key="item.id">
        <TableCheckboxCell @checked="checked($event, item)" />
        <td data-label="Name">
          {{ item.teamName }}
        </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap">
          <BaseButtons type="justify-start lg:justify-end" no-wrap>
            <BaseButton
              color="info"
              label="Accept"
              :icon="mdiHandOkay"
              :rounded-full="true"
              @click="acceptInvitation(item.id)"
              small
            />
            <BaseButton
              color="danger"
              label="Decline"
              :icon="mdiTrashCan"
              :rounded-full="true"
              @click="declineInvitation(item.id)"
              small
            />
          </BaseButtons>
        </td>
      </tr>
    </tbody>
  </table>

  <div class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800">
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          :color="page === currentPage ? 'lightDark' : 'whiteDark'"
          small
          @click="currentPage = page"
        />
      </BaseButtons>
      <small class="ml-auto">Page {{ currentPageHuman }} of {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
