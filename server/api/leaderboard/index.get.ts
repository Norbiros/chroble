import { countDistinct } from 'drizzle-orm'
import { attempts, tasks, users } from '~~/server/database/schema'

interface UserData {
  email: string
  solvedCount: number
  detailedData: Record<string, number>
}

export default defineEventHandler(async () => {
  const db = useDrizzle()

  const result = await db
    .select({
      email: users.email,
      day: tasks.date,
      attemptsCount: countDistinct(attempts.id).as('attemptsCount'),
    })
    .from(tasks)
    .leftJoin(attempts, eq(tasks.id, attempts.taskId))
    .leftJoin(users, eq(attempts.userId, users.id))
    .groupBy(users.email, tasks.date)

  const userDayData = result.reduce<Record<string, UserData>>((acc, { email, day, attemptsCount }) => {
    if (email !== null) {
      if (!acc[email]) {
        acc[email] = {
          email,
          solvedCount: 0,
          detailedData: {},
        }
      }
      acc[email].detailedData[day] = attemptsCount
      acc[email].solvedCount += 1
    }
    return acc
  }, {})

  return Object.values(userDayData)
})
