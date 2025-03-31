import type { Task } from '~~/server/database/schema'
import { Letter } from '#shared/utils/letter'
import { tasks } from '~~/server/database/schema'

export async function getTaskForToday(): Promise<Task | undefined> {
  const db = useDrizzle()

  const today = new Date()
  const formattedDate = today.toISOString().split('T')[0] || ''

  const solvedTasks = await db
    .select()
    .from(tasks)
    .where(eq(tasks.date, formattedDate))

  return solvedTasks[0]
}

export function compareWord(word: string, correctWord: string): Letter[] {
  const output = []
  const correctWordCount: any = {}
  const wordCount: any = {}

  // Count occurrences of each letter in both words
  for (const letter of correctWord) {
    correctWordCount[letter] = (correctWordCount[letter] || 0) + 1
  }
  for (const letter of word) {
    wordCount[letter] = (wordCount[letter] || 0) + 1
  }

  // First pass: Mark correct letters
  word.split('').forEach((letter, index) => {
    if (letter === correctWord[index]) {
      output.push(new Letter(letter, LetterState.Correct))
      correctWordCount[letter]--
      wordCount[letter]--
    } else {
      output.push(null) // Placeholder for now
    }
  })

  // Second pass: Mark present letters
  for (let i = 0; i < word.length; i++) {
    if (output[i] === null) {
      const letter = word[i]
      if (correctWord.includes(letter) && correctWordCount[letter] > 0 && wordCount[letter] > 0) {
        output[i] = new Letter(letter, LetterState.Present)
        correctWordCount[letter]--
        wordCount[letter]--
      } else {
        output[i] = new Letter(letter, LetterState.Absent)
      }
    }
  }

  return output
}
