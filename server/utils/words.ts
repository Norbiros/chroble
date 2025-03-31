import { WORDS } from '~~/server/utils/words/polish'

export function isWordInList(word: string) {
  const normalizedWord = word.trim().toLowerCase()
  return WORDS.includes(normalizedWord)
}
