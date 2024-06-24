<template>
  <div class="todo-app__menu">
    <span>{{ actualTasks.length }} items left</span>
    <button @click="clearCompletedTask()">Clear Completed</button>
  </div>
</template>

<script setup>
const emits = defineEmits(['ClearCompletedTask']);
defineProps({
  actualTasks: {
    type: Array
  }
});

const clearCompletedTask = () => {
  emits('ClearCompletedTask');
};
</script>

<style lang="scss" scoped>
@import '../sass/variables';
@import '../sass/mixins';

.todo-app__menu {
  height: 45px;
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  & span {
    color: $primary-color-grey;
  }

  & button {
    background-color: $primary-color-light;
    border: none;
    cursor: pointer;
    @include font($font-color: $primary-color-grey);

    &:hover {
      color: $primary-accent-color;
    }
  }
}
</style>
