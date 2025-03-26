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
  const output: Letter[] = []
  word.split('').forEach((letter, index) => {
    if (letter === correctWord[index]) {
      output.push(new Letter(letter, LetterState.Correct))
    } else if (correctWord.includes(letter)) {
      output.push(new Letter(letter, LetterState.Present))
    } else {
      output.push(new Letter(letter, LetterState.Absent))
    }
  })

  return output
}
