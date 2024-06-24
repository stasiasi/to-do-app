<template>
  <input
    v-model="newTask"
    @keyup.enter="addTask"
    placeholder="Create a new todo..."
    type="text"
    class="todo-app__add-input"
  />
</template>

<script setup>
import { ref } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const newTask = ref('');
const emits = defineEmits(['addTask']);
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
    emits('addTask', task);
    newTask.value = '';
  }
};
</script>

<style lang="scss" scoped>
@import '../sass/variables';
@import '../sass/mixins';

.todo-app__add-input {
  margin: 25px 40px;
  padding: 15px;
  
  @include mixin-input();
  @include font($font-color: $primary-color-dark);
}
</style>
