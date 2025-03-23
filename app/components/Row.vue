<script setup lang="ts">
import { defineProps } from 'vue'

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
      return '' // Default case
  }
};

function getLetterAtIndex(index: number): Letter {
  return props.letters[index] || new Letter('', LetterState.Undefined)
}
</script>

<template>
  <div class="flex justify-center space-x-2">
    <div
      v-for="index in 5"
      :key="index"
      class="w-12 h-12 flex items-center justify-center border border-gray-300 rounded"
      :class="getLetterClass(getLetterAtIndex(index - 1).state)"
    >
      {{ getLetterAtIndex(index - 1).letter }}
    </div>
  </div>
</template>
