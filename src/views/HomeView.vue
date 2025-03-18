<script setup>
import {} from '@mdi/js'
import CardBox from '@/components/CardBox.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import { useRouter } from 'vue-router'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass">
        <h1 class="text-2xl font-bold mb-4">Welcome to Task Tracker App</h1>
        <p class="mb-4">Please login or register to continue.</p>
        <BaseButtons>
          <BaseButton @click="goToLogin" color="info" label="Login" />
          <BaseButton @click="goToRegister" color="info" outline label="Register" />
        </BaseButtons>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
