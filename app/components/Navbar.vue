<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const items = ref<NavigationMenuItem[][]>([
  [
    {
      slot: 'icon',
      to: '/',
    },
  ],
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
      to: '/panel',
    },
  ],
])
</script>

<template>
  <nav class="px-10 top-0 z-10 sticky w-full border-b-1 border-neutral-600 bg-(--ui-bg)">
    <UNavigationMenu
      highlight
      highlight-color="primary"
      orientation="horizontal"
      :items="items"
      class="flex-1"
    >
      <template #icon>
        <h1 class="text-xl font-bold whitespace-nowrap text-white">
          👑 Chroble
        </h1>
      </template>

      <template #panel>
        <div>
          <UButton class="px-5">
            Zagraj!
          </UButton>
        </div>
      </template>
    </UNavigationMenu>
  </nav>
</template>
