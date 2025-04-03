<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const props = defineProps<{
  items: NavigationMenuItem[]
  isMobile: boolean
}>()

const buttonClass = computed(() => (props.isMobile ? 'text-xl px-5' : 'px-5'))
</script>

<template>
  <UNavigationMenu
    highlight
    highlight-color="primary"
    :orientation="isMobile ? 'vertical' : 'horizontal'"
    :items="items"
    class="flex-1"
    :ui="{
      link: isMobile ? 'text-xl w-full text-center' : '',
      list: isMobile ? 'flex flex-col items-center justify-center' : '',
    }"
  >
    <template #panel>
      <AuthState v-slot="{ loggedIn }">
        <UButton v-if="loggedIn" :class="buttonClass" to="/panel">
          Zagraj!
        </UButton>
        <UButton v-else :class="buttonClass" to="/api/auth/google" external>
          Zaloguj się
        </UButton>
      </AuthState>
    </template>
  </UNavigationMenu>
</template>
