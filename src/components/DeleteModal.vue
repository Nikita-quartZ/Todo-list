<script setup lang="ts">
import ModalWindow from '@/components/ModalWindow.vue'

// Declare Options
const modal = defineModel()
const emit = defineEmits(['delete'])

</script>

<template>
  <!-- Modal button -->
  <button
    @click="modal = true"
    class="btn delete-btn"
  >
    Delete
  </button>
  <!--  -->

  <ModalWindow
    v-model="modal"
    :width="300"
  >
  <!-- Delete form -->
    <div>
      <div class="modal__header">
        Delete Task
      </div>
      <div class="modal__actions">
        <button @click="modal = false" class="btn cancel-btn">
          Cancel
        </button>
        <button @click="emit('delete')" class="btn delete-btn">
          Delete
        </button>
      </div>
    </div>
    <!--  -->
  </ModalWindow>
</template>

<style scoped lang="scss">
.modal__header {
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
}

.modal__actions {
  display: flex;
  justify-content: center;
}

.btn:not(:last-child) {
  margin-right: 10px;
}
</style>