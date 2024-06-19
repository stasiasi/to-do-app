<template>
  <p class="todo-app__title">Add item</p>
  <input type="text" class="todo-app__input input" v-model="newTask" @keyup.enter="addTask" />
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const newTask = ref('');
const emits = defineEmits(['AddTask']);
const props = defineProps({
  id: {
    type: Number
  }
});

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

<style lang="scss">
@import '../sass/variables';
@import '../sass/mixins';
.input {
  width: 350px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid $primary-color-dark;
  background-color: $primary-color-light;
  outline: none;

  @include font($weight: 400);

  &:focus {
    border-width: 2px;
  }
}
.todo-app__input {
  width: 550px;
}
</style>
