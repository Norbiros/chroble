<script setup lang="ts">
const props = defineProps<{
  value: number
  label: string
  color: string
}>()

const displayed = ref(0)

function animateCounter(target: number, speed = 30) {
  let count = 0
  const interval = setInterval(() => {
    count += Math.ceil(target / 20)
    if (count >= target) {
      displayed.value = target
      clearInterval(interval)
    } else {
      displayed.value = count
    }
  }, speed)
}

onMounted(() => {
  animateCounter(props.value)
})

watch(() => props.value, (newVal) => {
  animateCounter(newVal)
})
</script>

<template>
  <div class="rounded-2xl shadow p-4" style="background: #3b3530">
    <div class="text-3xl font-bold" :class="color">
      {{ displayed }}
    </div>
    <div class="text-sm">
      {{ label }}
    </div>
  </div>
</template>
