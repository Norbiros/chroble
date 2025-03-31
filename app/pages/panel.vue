<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

const { user, clear } = useUserSession()
const { data } = await useFetch('/api/task/list')

const today = new Date().toISOString().split('T')[0]

function logout() {
  clear()
  navigateTo('/')
}
</script>

<template>
  <div class="m-10 flex flex-col gap-5">
    <header class="flex items-center justify-between">
      <div class="flex items-center gap-2">
        <h1 class="font-bold text-2xl">
          Witaj {{ user?.email }} w Chroble!
        </h1>
      </div>
      <UButton class="bg-red-600 hover:bg-red-700 text-white" @click="logout">
        Wyloguj
      </UButton>
    </header>

    <p class="text-lg font-medium">
      Miłego zgadywania słów!
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-7 gap-5">
      <div
        v-for="(task, index) in data"
        :key="index"
        class="border rounded-lg shadow-lg" :class="[
          task.date === today ? 'border-red-500' : 'border-gray-700',
        ]"
      >
        <h2 class="bg-red-500 text-white p-2 rounded-t-lg">
          {{ task.date }}
        </h2>
        <div class="p-3 flex flex-wrap justify-center items-center gap-2">
          <UIcon
            name="i-material-symbols-crown"
            :class="task.solved ? 'text-yellow-500 text-xl' : 'text-gray-500 text-xl'"
          />
          {{ task.solved ? 'Rozwiązane' : 'Nie rozwiązane' }}
          <br>
          <UButton v-if="task.date === today && !task.solved" to="/game">
            Rozwiąż
          </UButton>
        </div>
      </div>
    </div>
  </div>
</template>
