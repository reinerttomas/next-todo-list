import { ITask } from './types/task'

const baseUrl = 'http://localhost:3001'

export const getTasks = async (): Promise<ITask[]> => {
  const response = await fetch(`${baseUrl}/tasks`, { cache: 'no-store' })
  const tasks = await response.json()

  return tasks
}

export const addTask = async (task: ITask): Promise<ITask> => {
  const response = await fetch(`${baseUrl}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const newTask = await response.json()

  return newTask
}

export const updateTask = async (task: ITask): Promise<ITask> => {
  const response = await fetch(`${baseUrl}/tasks/${task.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(task)
  })

  const updatedTask = await response.json()

  return updatedTask
}

export const deleteTask = async (id: string): Promise<void> => {
  await fetch(`${baseUrl}/tasks/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
}
