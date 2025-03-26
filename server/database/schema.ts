import type { InferSelectModel } from 'drizzle-orm'
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

export const attempts = sqliteTable('attempts', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id),
  taskId: integer('task_id').notNull().references(() => tasks.id),
  answer: text('answer').notNull(),
  isCorrect: integer('is_correct', { mode: 'boolean' }).notNull(),
  attemptAt: integer('attempt_at', { mode: 'timestamp_ms' }).default(sql`(CURRENT_TIMESTAMP)`),
})

export type Task = InferSelectModel<typeof tasks>
