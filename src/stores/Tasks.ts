import { defineStore } from 'pinia'
import type { TaskLocalStorage } from '@/Types/TaskTypes'

interface State {
  list: TaskLocalStorage[],
}

export const useTasksStore = defineStore({
  id: 'Tasks',
  state: (): State => ({
    list: [],
  }),
  actions: {
    async getTasks() {
      const request = localStorage.getItem('todo')
      if (request) this.list = JSON.parse(request)
      return this.list;
    },
    async createTask(params: TaskLocalStorage) {
      const data = localStorage.getItem('todo')
      if (data) {
        const newData: TaskLocalStorage[] = JSON.parse(data)
        newData.push(params)
        localStorage.setItem('todo', JSON.stringify(newData))
      } else {
        localStorage.setItem('todo', JSON.stringify([params]))
      }
      this.getTasks()
    },
    async updateTask(params: TaskLocalStorage) {
      const data = localStorage.getItem('todo')
      if (data) {
        let newData: TaskLocalStorage[] = JSON.parse(data)
        newData = newData.map((item) => {
          if (item.id === params.id) {
            return params
          } else {
            return item
          }
        })
        localStorage.setItem('todo', JSON.stringify(newData))
      }
      this.getTasks()
    },
    async deleteTask(id: string) {
      const data = localStorage.getItem('todo')
      if (data) {
        let newData: TaskLocalStorage[] = JSON.parse(data)
        newData = newData.filter((item) => item.id !== id)
        localStorage.setItem('todo', JSON.stringify(newData))
      }
      this.getTasks()
    }
  },
});
