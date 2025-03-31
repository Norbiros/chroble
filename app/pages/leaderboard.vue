<script setup lang="ts">
import type { TableColumn } from '#ui/components/Table.vue'

const { data } = await useFetch('/api/leaderboard')

const columns: TableColumn<any>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'solvedCount',
    header: 'Ilość rozwiązanych zadań',
  },
]
</script>

<template>
  <div class="mx-12 mt-10">
    <h1 class="text-2xl font-bold">
      Ranking
    </h1>
    <UTable :data="data" :columns="columns" class="flex-1" />
  </div>
</template>
