import { promises as fs } from 'node:fs'

// TODO: Use bun api

const path = 'server/utils/words/polish.txt'
let words: string[] = []

async function loadWords() {
  try {
    const content = await fs.readFile(path, 'utf-8')
    words = content.split('\n').map(word => word.trim().toUpperCase())
  } catch (error) {
    console.error('Error loading word list:', error)
  }
}

loadWords().then((_words) => {})

export function isWordInList(word: string) {
  const normalizedWord = word.trim().toUpperCase()
  return words.includes(normalizedWord)
}
