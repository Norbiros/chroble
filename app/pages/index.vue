<script setup lang="ts">
const { loggedIn } = useUserSession()

const route = useRoute()
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
  useRouter().replace({ query: {} })
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4">
    <h1 class="font-bold text-2xl text-(--ui-primary)">
      👑 Chroble
    </h1>

    <span class="mx-5 text-center">Pokaż swoją dominacje nad innymi uczniami 31 liceum w wiedzy o słowach i królu Bolesławie!</span>

    <UButton
      v-if="!loggedIn"
      to="/api/auth/google"
      icon="i-simple-icons-google"
      label="Zaloguj się szkolnym kontem Google"
      class="p-2"
      external
    />

    <div v-else>
      <UButton to="/panel">
        Otwórz panel
      </UButton>
    </div>
  </div>
</template>
