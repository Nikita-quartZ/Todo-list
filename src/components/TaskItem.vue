<script setup lang="ts">

// Declare Options
const status = defineModel<Boolean>('status', {
  default: false,
})

const title = defineModel('title', {
  default: ''
})

const emit = defineEmits(['delete'])

const props = defineProps({
  edit: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    default: 0,
  }
})

// Methods
const changeStatus = () => {
  if (props.edit) status.value = !status.value
}
</script>

<template>
  <li class="card__content-item">
    <div class="card__content-title">
      <button
        @click="changeStatus"
        class="card__content-btn"
        :disabled="!edit"
      >
        <svg v-if="status" xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-check"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l5 5l10 -10" /></svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>
      </button>
      <p v-if="!edit">
        {{ title }}
      </p>
      <input
        v-if="edit"
        v-model="title"
        :key="id"
        class="card__input"
        type="text"
      >
    </div>
    <button
      v-if="edit"
      @click="emit('delete')"
      class="btn delete-btn"
    >
      Delete
    </button>
  </li>
</template>

<style scoped lang="scss">

.card__content-item:not(:last-child) {
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
}

.card__content-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.card__content-title {
  display: flex;
  align-items: center;
}

.card__input {
  height: 35px;
  border-radius: 5px;
  padding: 3px;
}

.card__content-btn {
  cursor: pointer;
  border: none;
  background: none;
  padding-left: 0;
  display: flex;
  align-items: center;
}

.card__content-btn:disabled {
  cursor: default
}

.card__content-btn svg {
  margin-right: 5px; 
}
</style>