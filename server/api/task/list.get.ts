import { tasks } from '~~/server/database/schema'

export default defineEventHandler(async () => {
  const result = await useDrizzle()
    .select({ date: tasks.date })
    .from(tasks)

  return result.map(item => item.date).sort()
})
