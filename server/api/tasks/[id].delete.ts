// server/api/tasks/[id].delete.ts
import { Task } from '~~/shared/types'

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id')

  // In a real scenario, you'd run:
  // await myDatabase.tasks.delete(id)
  
  return { 
    success: true,
    message: `Task ${id} deleted successfully` 
  }
})