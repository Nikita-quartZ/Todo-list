<script setup lang="ts">
import { computed } from 'vue'
import { useTasksStore } from '@/stores/Tasks'
import TodoCard from '@/components/TodoCard.vue'
import CreateModal from '@/components/CreateModal.vue'

// Composable
const store = useTasksStore()

// Computed Properties
const filteredTasks = computed(() => store.list.map((item) => ({
  ...item,
  tasks: item.tasks.slice(0, 3)
})))

// Created
store.getTasks()
</script>

<template>
  <main>
    <div class="btns__block">
      <p>
        Total: {{ store.list.length }}
      </p>
      <CreateModal/>
    </div>

    <TodoCard
      v-for="card in filteredTasks"
      v-model:tasks="card.tasks"
      :id="card.id"
      :key="card.title"
      v-model:title="card.title"
      disabled
    />
  </main>
</template>

<style lang="scss" scoped>
main {
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding-top: 30px;
}

.btns__block {
  display: flex;
  align-items: end;
  justify-content: space-between;
  margin-bottom: 10px;
}
</style>