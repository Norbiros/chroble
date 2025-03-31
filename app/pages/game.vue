<script setup lang="ts">
const words = ref<Letter[][]>([[]])
const knownLetters = ref<Map<string, LetterState>>(new Map())

const isWinModalOpen = ref(false)
const winModalMessage = ref('')

const { data } = await useFetch('/api/attempt')
if (data.value && data.value.letters.length > 0) {
  words.value = [...data.value.letters, []]
}

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
    await processWord(typedWord)
    // TODO: This logic is not correct
    // For example if for word AABBC i write AAAAA a will be shown as yellow
    for (const letter of typedWord) {
      knownLetters.value.set(letter.letter, letter.state)
    }
    typedWord = []
  }

  words.value[words.value.length - 1] = typedWord
}

async function processWord(word: Letter[]) {
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
  }
}
</script>

<template>
  <div>
    <UModal v-model:open="isWinModalOpen">
      <template #content>
        <div class="p-5">
          <h1 class="text-2xl font-bold">
            Gratulacje!
          </h1>
          <span class="text-md">Udało ci się rozwiązać dzisiejszą zagadkę.</span>

          <span>To hasło oznacza:</span>
          <span>{{ winModalMessage }}</span>
        </div>
      </template>
    </UModal>

    <h1 class="w-full text-center font-bold text-6xl p-5 mt-5">
      👑 Chroble
    </h1>
    <div class="flex flex-col gap-3">
      <Row v-for="index in 6" :key="index" :letters="words[index - 1] ?? []" />
    </div>
    <div class="flex justify-center items-center m-4">
      <Keyboard :known-letters="knownLetters" @key-pressed="keyPressed" />
    </div>
  </div>
</template>
