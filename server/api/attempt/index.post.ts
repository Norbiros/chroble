import { attempts } from '~~/server/database/schema'
import { compareWord, getTaskForToday, isGameFinished } from '~~/server/utils/task'
import { isWordInList } from '~~/server/utils/words'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  const body = await readBody(event)

  const { answer } = body
  if (!answer || answer.length !== 5) {
    throw createError({ statusCode: 400, message: 'Invalid request' })
  }

  if (!isWordInList(answer)) {
    throw createError({ statusCode: 400, message: 'Takie słowo nie istnieje w słowniku' })
  }

  const normalizedAnswer = answer.toUpperCase()
  const todayTask = (await getTaskForToday())!
  const todayWord = todayTask.word.toUpperCase()

  const correctUserAttempts = await useDrizzle()
    .select()
    .from(attempts)
    .where(
      and(
        eq(attempts.userId, user.id),
        eq(attempts.isCorrect, true),
        eq(attempts.taskId, todayTask.id),
      ),
    )

  if (correctUserAttempts.length > 0) {
    throw createError({ statusCode: 400, message: 'Już dzisiaj rozwiązałeś/aś zagadkę! Spróbuj jutro' })
  }

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

  const word = compareWord(normalizedAnswer, todayWord)
  let winMessage
  if (isGameFinished([word])) {
    winMessage = todayTask.answer
  }

  return {
    letters: compareWord(normalizedAnswer, todayWord),
    winMessage,
  }
})
