<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, clear } = useUserSession()
const { data } = await useFetch('/api/task/list')

function logout() {
  clear()
  navigateTo('/')
}
</script>

<template>
  <div class="m-10 flex flex-col gap-5">
    <h1 class="font-bold text-2xl flex items-center gap-2">
      <img :src="user?.picture" alt="User profile picture" class="rounded-full h-8">
      Witaj {{ user?.email }}!
    </h1>

    Miłego zgadywania słów!

    <div class="grid grid-cols-7">
      <div v-for="(task, index) in data" :key="index" class="border border-gray-700 w-40 text-center">
        <h2 class="bg-red-600">
          {{ task.date }}
        </h2>
        <div>{{ task.solved ? 'Rozwiązane' : 'Nie rozwiązane' }}</div>
        <UIcon name="i-material-symbols-crown" :class="task.solved ? 'text-yellow-500' : 'text-gray-500'" />
      </div>
    </div>

    <div>
      <UButton @click="logout">
        Wyloguj
      </UButton>
    </div>
  </div>
</template>
