<template>
  <div class="todo-app__section">
    <p class="todo-app__title">Add item</p>
    <input type="text" class="todo-app__input" v-model="newTask" />
    <button class="todo-app__button" @click="addTask">Add</button>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const emits = defineEmits(['AddTask']);
const props = defineProps({
  id: {
    type: Number
  }
});
const newTask = ref('');

const addTask = () => {
  if (newTask.value !== '') {
    const task = {
      id: uuidv4(),
      todo: newTask.value,
      completed: false,
      userId: props.id
    };
    emits('AddTask', task);
    newTask.value = '';
  }
};
</script>

<style></style>
