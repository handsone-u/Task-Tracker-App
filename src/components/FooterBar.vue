<script setup>
import { containerMaxW } from '@/config.js'
import BaseLevel from '@/components/BaseLevel.vue'
import JustboilLogo from '@/components/JustboilLogo.vue'
import { mdiGithub } from '@mdi/js'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="py-2 px-6" :class="containerMaxW">
    <BaseLevel>
      <div class="text-center md:text-left">
        <b>&copy;{{ year }}, Task Tracker</b>
        <br />
        <slot />
        <a
          href="https://github.com/handsone-u/task-tracker-app"
          target="_blank"
          class="text-blue-600"
        >
          GitHub
        </a>
      </div>
      <!-- <div class="md:py-2">
        <a href="https://justboil.me">
          <JustboilLogo class="w-auto h-8 md:h-6" />
        </a>
      </div> -->
    </BaseLevel>
  </footer>
</template>
