<script setup lang="ts">
import Row from '~/components/Row.vue'

const words = ref<Letter[][]>([[]])
const knownLetters = ref<Map<string, LetterState>>(new Map())

const isWinModalOpen = ref(false)
const winModalMessage = ref('')

const { data } = await useFetch('/api/attempt')
if (data.value && data.value.letters.length > 0) {
  words.value = [...data.value.letters, []]
}

for (const word of words.value) {
  updateKnownLetters(word)
}

const rows = ref<(InstanceType<typeof Row>)[]>([])

async function keyPressed(key: string) {
  let typedWord = words.value[words.value.length - 1] ?? []

  if (key === 'backspace') {
    typedWord.pop()
    return
  }

  if (typedWord.length < 5 && key !== 'enter') {
    typedWord.push(new Letter(key, LetterState.Undefined))
  }

  if (key === 'enter' && typedWord.length === 5) {
    const disableClear = await processWord(typedWord)
    if (!disableClear) {
      updateKnownLetters(typedWord)
      typedWord = []
    }
  }

  words.value[words.value.length - 1] = typedWord
}

async function processWord(word: Letter[]): Promise<boolean> {
  // TODO: Verify if it should show yellow multiple times if there is only one letter
  const lettersString = word.map(letter => letter.letter).join('')

  try {
    const response = await $fetch('/api/attempt', {
      method: 'POST',
      body: {
        answer: lettersString,
      },
    })

    word.forEach((letter, index) => {
      letter.state = response.letters[index]!.state
    })

    words.value.push(response.letters as Letter[])
    rows.value[words.value.length - 2]?.reveal()

    if (response?.winMessage) {
      winModalMessage.value = response?.winMessage
      isWinModalOpen.value = true
    }
  } catch (exception) {
    console.error(exception)
    const errorData = (exception as any)?.data
    useToast().add({
      title: 'Błąd',
      description: `${errorData.message} :c`,
      color: 'error',
    })
    if (errorData?.data?.disableClear) {
      return true
    }
  }
  return false
}

function updateKnownLetters(word: Letter[]) {
  for (const letter of word) {
    const previousLetter = knownLetters.value.get(letter.letter) ?? LetterState.Undefined
    if (letter.state > previousLetter) {
      knownLetters.value.set(letter.letter, letter.state)
    }
  }
}
</script>

<template>
  <div>
    <UModal v-model:open="isWinModalOpen">
      <template #content>
        <div class="p-5 flex flex-col">
          <h1 class="text-2xl font-bold">
            Gratulacje!
          </h1>
          <span class="text-md">Udało ci się rozwiązać dzisiejszą zagadkę.</span>

          <span class="font-bold">To hasło oznacza:</span>
          <span>{{ winModalMessage }}</span>
        </div>
      </template>
    </UModal>

    <h1 class="w-full text-center font-bold text-6xl p-5 mt-5">
      👑 Chroble
    </h1>
    <div class="flex flex-col gap-3">
      <Row v-for="index in 6" :key="index" :ref="el => rows[index - 1] = (el as unknown as InstanceType<typeof Row>)" :letters="words[index - 1] ?? []" />
    </div>
    <div class="flex justify-center items-center m-4">
      <Keyboard :known-letters="knownLetters" @key-pressed="keyPressed" />
    </div>
  </div>
</template>
