<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router';
import { useTasksStore } from '@/stores/Tasks'
import TodoCard from '@/components/TodoCard.vue' 

// Composable
const store = useTasksStore()
const route = useRoute()
const router = useRouter()

// Variables
const card = ref()

// Methods
const saveTask = () => {
  store.updateTask(card.value)
  router.push({name: 'list'})
}

// Created
store.getTasks().then(() => {
  card.value = store.list.find((item) => item.id === route.query.id)
})
</script>

<template>
  <main v-if="card">
    <RouterLink to="/">
      <button class="btn edit-btn back-btn">
        Go Back
      </button>
    </RouterLink>

    <TodoCard
      v-model:tasks="card.tasks"
      v-model:title="card.title"
      :id="card.id"
      edit
    />

    <!-- Actions -->
    <div class="details__actions">
      <RouterLink to="/" class="details__btn">
        <button class="btn delete-btn cancel-btn">
          Cancel
        </button>
      </RouterLink>
      
      <button @click="saveTask" :disabled="!(card.title && card.tasks.length)" class="btn success-btn">
        Save
      </button>
    </div>
    <!--  -->
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 30px;
}

.back-btn {
  margin-bottom: 10px;
}

.details__actions {
  display: flex;
  justify-content: end;
}

.details__btn {
  margin-right: 8px;
}
</style>