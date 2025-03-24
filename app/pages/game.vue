<script setup lang="ts">
const words = ref<Letter[][]>([[]])
const knownLetters = ref<Map<string, LetterState>>(new Map())

function keyPressed(key: string) {
  let typedWord = words.value[words.value.length - 1] ?? []

  if (key === 'backspace') {
    typedWord.pop()
    return
  }

  if (typedWord.length < 5) {
    typedWord.push(new Letter(key, LetterState.Undefined))
  }

  if (key === 'enter' && typedWord.length === 5) {
    words.value.push(processWord(typedWord))
    /// TODO: This logic is not correct
    // For example if for word AABBC i write AAAAA a will be shown as yellow
    for (const letter of typedWord) {
      knownLetters.value.set(letter.letter, letter.state)
    }
    typedWord = []
  }

  words.value[words.value.length - 1] = typedWord
}

function processWord(word: Letter[]): Letter[] {
  // TODO: Verify if it should show yellow multiple times if there is only one letter
  const targetWord = 'MIECZ'
  word.forEach((letter, index) => {
    if (letter.letter === targetWord[index]) {
      letter.state = LetterState.Correct
    } else if (targetWord.includes(letter.letter)) {
      letter.state = LetterState.Present
    } else {
      letter.state = LetterState.Absent
    }
  })
  return word
};
</script>

<template>
  <div>
    <h1 class="w-full text-center font-bold text-6xl p-5 mt-5">
      👑 Kingdomdle
    </h1>
    <div class="flex flex-col gap-3">
      <Row v-for="index in 6" :key="index" :letters="words[index - 1] ?? []" />
    </div>
    <div class="flex justify-center items-center m-4">
      <Keyboard :known-letters="knownLetters" @key-pressed="keyPressed" />
    </div>
  </div>
</template>
