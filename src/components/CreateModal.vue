<script setup lang="ts">
import { ref } from 'vue'
import { v4 as uuidv4 } from 'uuid';
import ModalWindow from '@/components/ModalWindow.vue'
import { useTasksStore } from '@/stores/Tasks'
import type { TaskCard } from '@/Types/TaskTypes'

// Composable
const store = useTasksStore()

// Variables
const task = ref('')
const modal = ref(false)

const form = ref<TaskCard>({
  title: '',
  tasks: []
})

// Methods
const addTask = () => {
  form.value.tasks.push({
    title: task.value,
    status: false,
  })
  task.value = ''
}

const deleteTask = (id: number) => {
  form.value.tasks = form.value.tasks.filter((_item, index) => index !== id)
}

const create = () => {
  store.createTask({
    ...form.value,
    id: uuidv4(),
  })
  task.value = ''
  form.value.title = ''
  form.value.tasks = []
  modal.value = false
}
</script>

<template>
  <!-- Modal button -->
  <button
    @click="modal = true"
    class="btn success-btn"
  >
    New Task
  </button>
  <!--  -->

  <ModalWindow
    v-model="modal"
  >
  <!-- Create form -->
    <div>
      <div class="modal__header">
        Create Task
      </div>
      <div class="modal__content">
        <p class="modal__title">
          Title
        </p>
        <input
          v-model="form.title"
          type="text"
          class="modal__input modal__input-title"
        >
        <p class="modal__title">
          Tasks
        </p>
        <div
          v-for="(task, index) in form.tasks"
          :key="task.title" class="modal__task-block"
        >
          <input
            v-model="task.title"
            type="text"
            class="modal__input modal__input-task"
            disabled
          >
          <button
            @click="deleteTask(index)"
            class="modal__task-btn modal__delete-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-trash"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
          </button>
        </div>

        <div class="modal__task-block">
          <input
            v-model="task"
            type="text"
            class="modal__input modal__input-task"
          >
          <button @click="addTask" class="modal__task-btn">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-plus"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
          </button>
        </div>
      </div>
      <div class="modal__actions">
        <button
          @click="modal = false"
          class="btn delete-btn cancel-btn"
        >
          Cancel
        </button>
        <button
          @click="create"
          :disabled="!(form.title && form.tasks.length)"
          class="btn success-btn"
        >
          Create
        </button>
      </div>
    </div>
    <!--  -->
  </ModalWindow>
</template>

<style scoped lang="scss">
.cancel-btn {
  margin-right: 7px;
}

.modal__actions {
  padding-top: 10px;
  display: flex;
  justify-content: end;
}

.modal__title {
  margin-bottom: 5px;
}

.modal__input-title {
  margin-bottom: 10px;
}

.modal__task-btn {
  border: none;
  background: none;
  border-radius: 9999px;
  color: #fff;
  background-color: #006E2A;
  aspect-ratio: 1 / 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal__delete-btn {
  background-color: #d41414;
}

.modal__task-block {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.modal__input-task {
  margin-right: 8px;
}

.modal__header {
  text-align: center;
  font-size: 20px;
}

.modal__input {
  padding-left: 4px;
  height: 40px;
  width: 100%;
  border-radius: 7px;
}
</style>