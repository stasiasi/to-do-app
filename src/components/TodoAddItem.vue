<template>
  <input
    type="text"
    class="todo-app__add input"
    v-model="newTask"
    @keyup.enter="addTask"
    placeholder="Create a new todo..."
  />
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

.todo-app__add {
  margin: 25px 40px;
  padding: 15px;
  width: 600px;
}

.input {
  height: 15px;
  border: none;
  outline: none;

  @include font($font-color: $primary-color-dark);
}
</style>
