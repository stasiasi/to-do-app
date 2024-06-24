<!-- eslint-disable vue/no-mutating-props -->
<template>
  <div class="todo-app__task task">
    <div class="task__menu">
      <input
        v-model="task.completed"
        @change="completeTask(task)"
        type="checkbox"
        class="task__checkbox"
      />
      <input
        v-if="isEdited"
        v-model="task.todo"
        @keyup.enter="editTask(task)"
        type="text"
        class="task__edit-input"
      />
      <span 
        v-else 
        :class="{ task_completed: task.completed }"
        @click="editTask(task)"
      >
        {{ task.todo }}
     </span>
    </div>
    <button 
      class="task__delete-btn" 
      @click="deleteTask(task)"
    >
      Delete
    </button>
  </div>
</template>

<script setup>
import {ref} from 'vue'

const isEdited = ref(false);
const emits = defineEmits(['deleteTask']);
defineProps({
  task: {
    type: Object
  }
});

const deleteTask = (task) => {
  emits('deleteTask', task);
};

const completeTask = (task) => {
  task.completed = true;
};

const editTask = (task) => {
  isEdited.value = task.completed ? isEdited.value : !isEdited.value;
};
</script>

<style lang="scss" scoped>
@import '../sass/variables';
@import '../sass/mixins';

.todo-app__task {
  display: flex;
  justify-content: space-between;
}

.task {
  display: flex;
  align-items: center;
  height: 45px;
  padding: 10px 40px;
  border-bottom: 1px solid $primary-color-grey;

  &__checkbox {
    margin-right: 15px;
    transform: scale(1.3);
    cursor: pointer;
  }

  &__edit-input {
    padding: 15px;
    padding-left: 0px;
    box-shadow: 0px 2px 0px $primary-accent-color;

    @include font($font-color: $primary-color-dark);
    @include mixin-input($width: 430px);
  }

  &__delete-btn {
  padding: 5px 5px 3px;
  height: 25px;
  border: none;
  background-color: $primary-accent-color;
  cursor: pointer;
  @include font($font-color: $primary-color-light, $transform: uppercase);

    &:hover {
      background: $primary-color-light;
      color: $primary-accent-color;
      box-shadow: 2px 2px 15px $primary-accent-color;
    }
  }

  & span {
    width: 444px;
  }

  &_completed {
    text-decoration: line-through;
  }
}
</style>
