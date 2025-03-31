<script setup lang="ts">
const { data } = await useFetch('/api/leaderboard')

const columns: TableColumn<any>[] = [
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'solvedCount',
    header: 'Ilość rozwiązanych',
  },
]
</script>

<template>
  <div class="mx-20">
    <h1 class="text-2xl font-bold">
      Ranking
    </h1>
    <UTable :data="data" :columns="columns" class="flex-1 mx-10" />
  </div>
</template>
