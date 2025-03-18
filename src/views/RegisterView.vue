<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiEmail, mdiAsterisk } from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import LayoutGuest from '@/layouts/LayoutGuest.vue'
import { register } from '@/services/api'

const form = reactive({
  email: '',
  password: '',
  passwordCheck: '',
  username: '',
})

const router = useRouter()

const submit = () => {
  if (form.password !== form.passwordCheck) {
    alert('Passwords do not match!')
    return
  }

  register(form.email, form.password, form.username)
    .then(() => {
      alert('Registration successful! Please login.')
      router.push('/login')
    })
    .catch((error) => {
      alert('Registration failed: ' + error.message)
    })
}
</script>

<template>
  <LayoutGuest>
    <SectionFullScreen v-slot="{ cardClass }" bg="purplePink">
      <CardBox :class="cardClass" is-form @submit.prevent="submit">
        <FormField label="Email" help="Please enter your email">
          <FormControl v-model="form.email" :icon="mdiEmail" name="email" autocomplete="email" />
        </FormField>

        <FormField label="Password" help="Please enter your password">
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
            autocomplete="new-password"
          />
        </FormField>
        <FormField label="Password Check" help="Please re-enter your password">
          <FormControl
            v-model="form.passwordCheck"
            :icon="mdiAsterisk"
            type="password"
            name="passwordCheck"
            autocomplete="new-password"
          />
        </FormField>
        <FormField label="Username" help="Please enter your username">
          <FormControl
            v-model="form.username"
            :icon="mdiAccount"
            name="uesrname"
            autocomplete="username"
          />
        </FormField>
        <template #footer>
          <BaseButtons>
            <BaseButton type="submit" color="info" label="Register" />
            <BaseButton to="/" color="info" outline label="Back" />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
  </LayoutGuest>
</template>
