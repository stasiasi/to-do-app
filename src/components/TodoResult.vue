<template>
  <div class="todo-app__menu menu">
    <span>{{ props.actualTasks.length }} items left</span>
    <button 
      class="menu__clear" 
      @click="clearCompletedTask()"
    >
      Clear Completed
    </button>
  </div>
</template>

<script setup>
const emits = defineEmits(['ClearCompletedTask']);
const props = defineProps({
  actualTasks: {
    type: Array
  }
});

const clearCompletedTask = () => {
  emits('ClearCompletedTask');
};
</script>

<style lang="scss">
@import '../sass/variables';
@import '../sass/mixins';

.todo-app__menu {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu {
  height: 45px;
  padding: 10px 40px;
  & span {
    color: $primary-color-grey;
  }

  &__clear {
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
