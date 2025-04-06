import { tasks } from '~~/server/database/schema'

export default defineNitroPlugin(() => {
  onHubReady(async () => {
    const tasksList = await useDrizzle()
      .select()
      .from(tasks)

    for (const task of tasksList) {
      const word = task.word
      if (!isWordInList(word)) {
        console.error(`Word "${word}" in task "${task.date}" is not in the list!`)
      }
    }
  })
})
