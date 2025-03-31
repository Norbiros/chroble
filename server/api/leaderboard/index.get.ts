import { count, countDistinct, desc } from 'drizzle-orm'
import { attempts, users } from '~~/server/database/schema'

export default defineEventHandler(async () => {
  const db = useDrizzle()

  return db
    .select({
      userId: users.id,
      email: users.email,
      solvedCount: countDistinct(attempts.taskId),
    })
    .from(users)
    .leftJoin(attempts, eq(users.id, attempts.userId))
    .where(eq(attempts.isCorrect, true))
    .groupBy(users.id)
    .orderBy(desc(count()))
})
