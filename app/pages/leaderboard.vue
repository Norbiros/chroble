<script setup lang="ts">
import type { TableColumn } from '#ui/components/Table.vue'

const { data } = await useFetch('/api/leaderboard')
const { data: taskList } = await useFetch('/api/task/list')

const columns: TableColumn<any>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'solvedCount',
    header: 'Rozwiązane',
  },
  ...taskList.value!.map(date => ({
    accessorKey: `detailedData.${date}`,
    header: date.split('-')[2],
    data: ({ row }: { row: any }) => row.getValue(`detailedData.${date}`) || 0,
  })),
]

const sorting = ref([
  {
    id: 'solvedCount',
    desc: true,
  },
])
</script>

<template>
  <div class="mx-12 mt-10">
    <h1 class="text-2xl font-bold">
      Ranking
    </h1>
    <UTable :data="data" :columns="columns" :sorting="sorting" class="flex-1" />
  </div>
</template>
