import { solutions, tasks } from '~~/server/database/schema'

export default defineEventHandler(async (event) => {
  const { user } = await requireUserSession(event)
  if (!user) {
    throw createError({
      status: 401,
      message: 'Unauthorized Access',
    })
  }

  const db = useDrizzle()

  const allTasks = await db.select({ id: tasks.id, date: tasks.date }).from(tasks)

  const solvedTasks = await db
    .select({ taskId: solutions.taskId })
    .from(solutions)
    .where(eq(solutions.userId, user.id))

  const solvedTaskIds = new Set(solvedTasks.map(t => t.taskId))

  return allTasks
    .map(task => ({
      date: task.date,
      solved: solvedTaskIds.has(task.id),
    }))
    .sort((a, b) => Date.parse(a.date) - Date.parse(b.date))
})
