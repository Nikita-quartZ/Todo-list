<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useTasksStore } from '@/stores/Tasks';
import DeleteModal from '@/components/DeleteModal.vue'
import TaskItem from '@/components/TaskItem.vue'
import type { Task } from '@/Types/TaskTypes'

// Composable
const router = useRouter()
const store = useTasksStore()

// Declare Options
const tasks = defineModel<Task[]>('tasks', {
  default: []
})
const title = defineModel<string>('title', {
  default: ''
})

const props = defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: '',
  },
})

// Variables
const modalDelete = ref(false)
const newTask = ref('')

// Methods
const showDetails = () => {
  router.push({
    name: 'details', 
    query: {
      id: props.id,
    }
  })
}

const addItem = () => {
  tasks.value?.push({
    title: newTask.value,
    status: false,
  })
  newTask.value = ''
}

const deleteItem = (id: number) => {
  tasks.value = tasks.value.filter((_item, index) => index !== id)
}

const deleteTask = () => {
  store.deleteTask(props.id)
  modalDelete.value = false
  router.push({name: 'list'})
}
</script>

<template>
  <div class="card">
    <div class="card__header">
      <!-- Card title -->
      <p v-if="!edit" class="card__title">
        {{ title }}
      </p>
      <input
        v-else
        v-model="title"
        class="card__title-input"
        :key="id"
      />
      <!--  -->

      <!-- Card actions -->
      <div>
        <button
          v-if="!edit"
          @click="showDetails()"
          class="btn edit-btn"
        >
          Edit
        </button>
        
        
        <DeleteModal
          @delete="deleteTask"
          v-model="modalDelete"
        />
      </div>
      <!--  -->
    </div>

    <div class="divider"></div>

    <ul class="card__content" :class="{disabled: !edit}">
      <TaskItem
        v-for="(task, index) in tasks"
        @delete="deleteItem(index)"
        v-model:title="task.title"
        v-model:status="task.status"
        :key="index"
        :id="index"
        :edit="edit"
      />
      
      <!-- Add new item list -->
      <li v-if="edit" class="card__content-item">
        <div
          class="card__content-btn"
        >
          <input class="card__title-input" type="text" v-model="newTask">
        </div>
        <button :disabled="!newTask" v-if="edit" @click="addItem" class="btn success-btn">
          Add
        </button>
      </li>
      <!--  -->
    </ul>
  </div>
</template>

<style scoped lang="scss">

.card {
  border: 1px solid rgb(182, 182, 182);
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 10px;
}

.card__content-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.card__title {
  font-size: 20px;
  padding-left: 2px;
}

.card__title-input {
  height: 35px;
  border-radius: 5px;
  padding: 3px;
}

.card__header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn:not(:last-child) {
  margin-right: 10px;
}

.divider {
  border-top: 1px solid rgb(182, 182, 182);
  margin-top: 15px;
  margin-bottom: 15px;
}

.disabled {
  opacity: 0.6;
}

.card__content {
  padding: 0;
  margin: 0;
}
</style>