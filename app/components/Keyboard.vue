<script setup lang="ts">
const props = defineProps({
  knownLetters: {
    type: Map<string, LetterState>,
    required: true,
  },
})

const emit = defineEmits<{
  (event: 'keyPressed', key: string): void
}>()

const rows = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['backspace', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'enter'],
  ['Ą', 'Ć', 'Ę', 'Ł', 'Ń', 'Ó', 'Ś', 'Ź', 'Ż'],
]

function handleClick(key: string) {
  emit('keyPressed', key)
};

function getKeyClass(key: string): string {
  const state = props.knownLetters.get(key)

  if (!state)
    return 'bg-gray-800' // Default color for unknown keys

  switch (state) {
    case LetterState.Correct:
      return 'bg-green-500' // Correct letter
    case LetterState.Absent:
      return 'bg-gray-500' // Incorrect letter
    case LetterState.Present:
      return 'bg-yellow-500' // Pending letter
    default:
      return 'bg-gray-800' // Default color
  }
}
</script>

<template>
  <div class="text-center w-170 gap-y-2 flex flex-col">
    <div v-for="(row, index) in rows" :key="index" class="flex space-x-2">
      <UKbd
        v-for="key in row"
        :key="key"
        :value="key"
        class="flex-2 h-10 select-none hover:bg-red-500"
        :class="getKeyClass(key)"
        @click="handleClick(key)"
      />
    </div>
  </div>
</template>
