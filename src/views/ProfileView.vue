<script setup>
import { reactive } from 'vue'
import {
  mdiAccount,
  mdiMail,
  mdiAsterisk,
  mdiFormTextboxPassword,
  mdiAccountMultiplePlus,
  mdiInformation,
} from '@mdi/js'
import SectionMain from '@/components/SectionMain.vue'
import CardBox from '@/components/CardBox.vue'
import BaseDivider from '@/components/BaseDivider.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import FormFilePicker from '@/components/FormFilePicker.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import UserCard from '@/components/UserCard.vue'
import LayoutAuthenticated from '@/layouts/LayoutAuthenticated.vue'
import SectionTitleLineWithButton from '@/components/SectionTitleLineWithButton.vue'
import { useUserStore } from '@/stores/user'
import { memberApiClient } from '@/services'
import InvitationTable from '@/components/profile/InvitationTable.vue'
import NotificationBar from '@/components/NotificationBar.vue'

const userStore = useUserStore()

const profileForm = reactive({
  username: userStore.username,
  email: userStore.id,
  isEdittable: false,
})

const passwordForm = reactive({
  password_current: '',
  password: '',
  password_confirmation: '',
  isEdittable: false,
})

const notification = reactive({
  visible: false,
  title: '',
  text: '',
  icon: '',
  color: 'info', // info, success, danger, warning
})

const toggleProfileFormEditable = () => {
  profileForm.isEdittable = !profileForm.isEdittable
}

const togglePasswordFormEditable = () => {
  passwordForm.isEdittable = !passwordForm.isEdittable
}

const closeNotification = () => {
  notification.visible = false
}

const submitProfile = () => {
  memberApiClient
    .updateProfile(profileForm.username)
    .then(() => {
      userStore.setUserInformation(userStore.jwt, userStore.id, profileForm.username)
      notification.visible = true
      notification.title = 'Profile updated'
      notification.text = 'Your profile has been updated successfully.'
      notification.icon = mdiInformation
      notification.color = 'success'
      profileForm.isEdittable = false
    })
    .catch((error) => {
      console.error(error)
      notification.visible = true
      notification.title = 'Profile update failed'
      notification.text = 'Failed to update your profile. Please try again.'
      notification.icon = mdiInformation
      notification.color = 'danger'
    })
}

const submitPassword = () => {
  memberApiClient
    .resetPassword(passwordForm.password, passwordForm.password_confirmation)
    .then(() => {
      passwordForm.isEdittable = false
      passwordForm.password_current = ''
      passwordForm.password = ''
      passwordForm.password_confirmation = ''
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <LayoutAuthenticated>
    <SectionMain>
      <SectionTitleLineWithButton :icon="mdiAccount" title="Profile" main>
      </SectionTitleLineWithButton>

      <UserCard class="mb-6" />

      <NotificationBar
        v-if="notification.visible"
        :color="notification.color"
        :icon="notification.icon"
      >
        <b>{{ notification.title }} </b>. {{ notification.text }}
        <template #right>
          <BaseButton label="Close" :rounded-full="true" small @click="closeNotification" />
        </template>
      </NotificationBar>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CardBox is-form @submit.prevent="submitProfile">
          <!-- <FormField label="Avatar" help="Max 500kb">
            <FormFilePicker label="Upload" />
          </FormField> -->

          <FormField label="Username" help="Required. Your name">
            <FormControl
              v-model="profileForm.username"
              :icon="mdiAccount"
              name="username"
              required
              autocomplete="username"
              :disabled="!profileForm.isEdittable"
            />
          </FormField>
          <FormField label="E-mail" help="Required. Your e-mail">
            <FormControl
              v-model="profileForm.email"
              :icon="mdiMail"
              type="email"
              name="email"
              required
              autocomplete="email"
              :disabled="!profileForm.isEdittable"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton
                color="info"
                type="submit"
                label="Submit"
                :disabled="!profileForm.isEdittable"
              />
              <BaseButton color="info" label="Edit" outline @click="toggleProfileFormEditable" />
            </BaseButtons>
          </template>
        </CardBox>

        <CardBox is-form @submit.prevent="submitPassword">
          <FormField label="Current password" help="Required. Your current password">
            <FormControl
              v-model="passwordForm.password_current"
              :icon="mdiAsterisk"
              name="password_current"
              type="password"
              required
              autocomplete="current-password"
              :disabled="!passwordForm.isEdittable"
            />
          </FormField>

          <BaseDivider />

          <FormField label="New password" help="Required. New password">
            <FormControl
              v-model="passwordForm.password"
              :icon="mdiFormTextboxPassword"
              name="password"
              type="password"
              required
              autocomplete="new-password"
              :disabled="!passwordForm.isEdittable"
            />
          </FormField>

          <FormField label="Confirm password" help="Required. New password one more time">
            <FormControl
              v-model="passwordForm.password_confirmation"
              :icon="mdiFormTextboxPassword"
              name="password_confirmation"
              type="password"
              required
              autocomplete="new-password"
              :disabled="!passwordForm.isEdittable"
            />
          </FormField>

          <template #footer>
            <BaseButtons>
              <BaseButton
                type="submit"
                color="info"
                label="Submit"
                :disabled="!passwordForm.isEdittable"
              />
              <BaseButton color="info" label="Edit" outline @click="togglePasswordFormEditable" />
            </BaseButtons>
          </template>
        </CardBox>
      </div>
      <SectionTitleLineWithButton :icon="mdiAccountMultiplePlus" title="Invitation">
      </SectionTitleLineWithButton>
      <InvitationTable />
    </SectionMain>
  </LayoutAuthenticated>
</template>
