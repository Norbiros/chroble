import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  email: text('email').notNull().unique(),
})

export const tasks = sqliteTable('tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  date: text('date').notNull(),
  word: text('word').notNull(),
  answer: text('answer').notNull(),
})

export const solutions = sqliteTable('solved_tasks', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  taskId: integer('task_id').notNull().references(() => tasks.id),
  solvedAt: integer('solved_at', { mode: 'timestamp_ms' }).default(sql`(CURRENT_TIMESTAMP)`),
})

export const attempts = sqliteTable('attempts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  solutionId: integer('solution_id').notNull().references(() => solutions.id),
  attemptAt: integer('attempt_at', { mode: 'timestamp_ms' }).default(sql`(CURRENT_TIMESTAMP)`),
  answer: text('answer').notNull(),
})
