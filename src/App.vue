<template>
  <div class="todo-app">
    <p class="todo-app__title">Todo</p>
    <todo-add-item 
      :id="userId" 
      @addTask="addTodo"
      class="todo-app__add"
    >
    </todo-add-item>
    <div class="todo-app__list">
      <todo-item
        v-for="task in actualTasks" 
        :key="task.id" 
        :task="task" 
        @deleteTask="deleteTodo" 
      >
      </todo-item>
      <todo-item 
        v-for="task in completedTasks" 
        :key="task.id" 
        :task="task" 
        @deleteTask="deleteTodo"
      >
      </todo-item>
      <todo-result 
        :actualTasks="actualTasks" 
        @ClearCompletedTask="clearCompletedTodos"
      >
      </todo-result>
    </div>
  </div> 
</template>

<script setup>
import { getTodos } from './api/apiTodos';
import { ref, onMounted, computed } from 'vue';
import TodoAddItem from './components/TodoAddItem.vue';
import TodoItem from './components/TodoItem.vue';
import TodoResult from './components/TodoResult.vue';

const taskList = ref([]);
const userId = 1;

const actualTasks = computed(() => taskList.value.filter((task) => !task.completed));
const completedTasks = computed(() => taskList.value.filter((task) => task.completed));

const addTodo = (task) => taskList.value.push(task);

const deleteTodo = (task) => {
  taskList.value.splice(taskList.value.indexOf(task), 1);
};

const clearCompletedTodos = () => {
  taskList.value = taskList.value.filter((task) => !task.completed);
};

onMounted(async () => {
  try {
    const response = await getTodos(userId);
    taskList.value = response.data.todos;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss" scoped>
@import './sass/variables';
@import './sass/mixins';

.todo-app {
  background-color: $primary-accent-color;
  box-shadow: 3px 3px 10px $primary-color-grey;

  &__title {
    padding: 50px 0 0 40px;
    letter-spacing: 5px;

    @include font(
      $size: $title-font-size,
      $weight: 700,
      $font-color: $primary-color-light,
      $transform: uppercase
    );
  }

  &__list {
    background-color: $primary-color-light;
  }
}
</style>
