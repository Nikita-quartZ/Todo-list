export interface Task {
  title: string,
  status: boolean,
}

export interface TaskCard {
  title: string,
  tasks: Task[],
}

export interface TaskLocalStorage {
  title: string,
  tasks: Task[],
  id: string,
}