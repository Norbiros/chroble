<script setup lang="ts">
import { ref } from 'vue'

const { loggedIn } = useUserSession()
const route = useRoute()
const router = useRouter()

if (route.query.error) {
  let description
  switch (route.query.error) {
    case 'invalid_domain':
      description = 'Możesz zalogować się używając tylko konta szkolnego (@lo31.krakow.pl)'
      break
    default:
      description = 'Nieznany błąd'
  }

  await callOnce(() => useToast().add({ title: 'Nie udało się zalogować', description, color: 'error' }))
  router.replace({ query: {} })
}

const attempts = ref(2834)
const daysLeft = ref(30)
const users = ref(67)
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-6 text-center px-4 py-10">
    <h1 class="font-bold text-4xl text-(--ui-primary)">
      👑 Chroble
    </h1>

    <p class="max-w-xl text-lg ">
      Pokaż swoją dominację nad innymi uczniami 31 liceum w wiedzy o słowach i królu Bolesławie!
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 w-full max-w-2xl">
      <LandingBox :value="attempts" label="prób" color="text-amber-400" />
      <LandingBox :value="daysLeft" label="dni" color="text-blue-400" />
      <LandingBox :value="users" label="użytkowników" color="text-purple-600" />
    </div>

    <p class="text-sm  text-dimmed mt-4">
      Stworzone z okazji Jubileuszu 1000 lat Królestwa Polskiego
    </p>

    <div class="mt-2">
      <UButton
        v-if="!loggedIn"
        to="/api/auth/google"
        icon="i-simple-icons-google"
        label="Zaloguj się szkolnym kontem Google"
        class="p-3"
        external
      />
      <UButton
        v-else
        to="/panel"
        class="p-3"
      >
        Otwórz panel
      </UButton>
    </div>
  </div>
</template>
