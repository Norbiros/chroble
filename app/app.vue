<template>
  <NuxtLoadingIndicator color="var(--ui-primary)" :height="2" />
  <UApp>
    <Navbar class="h-[var(--ui-header-height)]" />
    <NuxtPage class="min-h-[calc(100vh-var(--ui-header-height))]" />
  </UApp>
</template>
