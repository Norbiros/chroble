import { compareWord, getTaskForToday } from '~~/server/utils/task'
import { isWordInList } from '~~/server/utils/words'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await readBody(event)

  const { answer } = body
  if (!answer || answer.length !== 5) {
    throw createError({ statusCode: 400, message: 'Invalid request' })
  }

  if (!isWordInList(answer)) {
    throw createError({ statusCode: 400, message: 'Invalid word' })
  }

  const normalizedAnswer = answer.toUpperCase()
  const todayTask = (await getTaskForToday())!
  const todayWord = todayTask.word.toUpperCase()

  await useDrizzle()
    .insert(tables.attempts)
    .values({
      userId: user.id,
      taskId: todayTask.id,
      answer: normalizedAnswer,
      isCorrect: todayWord === normalizedAnswer,
    })
    .returning()
    .get()

  return compareWord(normalizedAnswer, todayWord)
})
