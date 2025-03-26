import { compareWord, getTaskForToday } from '~~/server/utils/task'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await readBody(event)

  const { answer } = body
  if (!answer || answer.length !== 5) {
    throw createError({ statusCode: 400, message: 'Invalid request' })
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
