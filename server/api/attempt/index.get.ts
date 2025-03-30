import { attempts } from '~~/server/database/schema'
import { getTaskForToday } from '~~/server/utils/task'
//
export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const todayTask = await getTaskForToday()
  if (!todayTask) {
    throw createError({ statusCode: 404, message: 'No task found for today' })
  }

  const todayWord = todayTask.word.toUpperCase()

  const userAttempts = await useDrizzle()
    .select({ answer: attempts.answer, taskId: attempts.taskId })
    .from(attempts)
    .where(and(eq(attempts.userId, user.id), eq(attempts.taskId, todayTask.id)))

  return userAttempts.map((attempt) => {
    const normalizedAnswer = attempt.answer.toUpperCase()
    return compareWord(normalizedAnswer, todayWord)
  })
})
