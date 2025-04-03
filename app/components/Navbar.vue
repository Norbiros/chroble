<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [],
  [
    {
      label: 'Ranking',
      to: '/leaderboard',
    },
    {
      label: 'Dzisiejsza gra',
      to: '/game',
    },
    {
      slot: 'panel',
    },
  ],
])

const isOpen = ref(false)
const route = useRoute()

watch(() => route.path, () => {
  isOpen.value = false
})
</script>

<template>
  <nav class="px-10 top-0 z-10 sticky w-full border-b border-neutral-600 bg-(--ui-bg) flex items-center justify-between">
    <ULink class="text-xl font-bold whitespace-nowrap text-white" to="/">
      👑 Chroble
    </ULink>
    <UButton :icon="isOpen ? 'i-heroicons-x-mark' : 'i-heroicons-bars-3'" class="md:hidden" @click="isOpen = !isOpen" />

    <NavbarLinks :items="items" :is-mobile="false" class="hidden md:flex" />

    <USlideover v-model:open="isOpen" class="top-(--ui-header-height) h-full" :overlay="false" :modal="false">
      <template #content>
        <NavbarLinks :items="items" :is-mobile="true" class="items-center text-center text-3xl" />
      </template>
    </USlideover>
  </nav>
</template>
