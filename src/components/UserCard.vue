<script setup>
import { computed, ref } from 'vue'
import BaseLevel from '@/components/BaseLevel.vue'
import UserAvatarCurrentUser from '@/components/UserAvatarCurrentUser.vue'
import CardBox from '@/components/CardBox.vue'
import PillTag from '@/components/PillTag.vue'
import { useUserStore } from '@/stores/user'
import { mdiCheckDecagram, mdiAlertDecagram } from '@mdi/js'

const userStore = useUserStore()

const userName = computed(() => userStore.username)
const isVerified = ref(false)
</script>

<template>
  <CardBox>
    <BaseLevel type="justify-around lg:justify-center">
      <UserAvatarCurrentUser class="lg:mx-12" />
      <div class="space-y-3 text-center md:text-left lg:mx-12">
        <div class="flex justify-center md:block"></div>
        <h1 class="text-2xl">
          Hello, <b>{{ userName }}</b
          >!
        </h1>
        <!-- TODO: last login date and location. -->
        <!-- <p>Last login <b>12 mins ago</b> from <b>127.0.0.1</b></p> -->
        <div class="flex justify-center md:block">
          <PillTag v-if="isVerified" label="Verified" color="info" :icon="mdiCheckDecagram" />
          <PillTag v-else label="Not Verified" color="warning" :icon="mdiAlertDecagram" />
        </div>
      </div>
    </BaseLevel>
  </CardBox>
</template>
