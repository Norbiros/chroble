import { attempts, tasks } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)

  const db = useDrizzle()

  const allTasks = await db.select({ id: tasks.id, date: tasks.date }).from(tasks)

  const solvedTasks = await db
    .select({ taskId: attempts.taskId })
    .from(attempts)
    .where(and(eq(attempts.userId, user.id), eq(attempts.isCorrect, true)))

  const solvedTaskIds = new Set(solvedTasks.map(t => t.taskId))

  return allTasks
    .map(task => ({
      date: task.date,
      solved: solvedTaskIds.has(task.id),
    }))
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
})
