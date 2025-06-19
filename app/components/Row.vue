<script setup lang="ts">
const props = defineProps({
  letters: {
    type: Array as () => Letter[],
    required: true,
  },
})

function getLetterClass(state: LetterState): string {
  switch (state) {
    case LetterState.Correct:
      return 'bg-green-500 text-white'
    case LetterState.Present:
      return 'bg-yellow-500 text-white'
    case LetterState.Absent:
      return 'bg-gray-300 text-black'
    default:
      return ''
  }
}

function getLetterAtIndex(index: number): Letter {
  return props.letters[index] || new Letter('', LetterState.Undefined)
}

const revealActive = ref(false)

function reveal() {
  revealActive.value = true
}

defineExpose({ reveal })
</script>

<template>
  <div class="flex justify-center space-x-2 transition-colors duration-600 ease-in-out" :class="revealActive ? 'animate-flipRow' : ''">
    <div
      v-for="index in 5"
      :key="index"
      class="w-12 h-12 flex items-center justify-center border border-gray-300 rounded"
      style="backface-visibility: hidden;"
      :class="[
        getLetterClass(getLetterAtIndex(index - 1).state),
        index <= letters.length ? 'animate-scaleIn' : '',
      ]"
    >
      {{ getLetterAtIndex(index - 1).letter }}
    </div>
  </div>
</template>
