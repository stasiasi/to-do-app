<template>
  <TodoAddItem :id="userId" @AddTask="addTodo"></TodoAddItem>
  <p class="todo-app__title">Todo</p>
  <TodoItem :taskList="actualTasks" @DeleteTask="deleteTodo" @EditTask="editTodo"></TodoItem>
  <p class="todo-app__title">Completed</p>
  <TodoItem :taskList="completedTasks" @DeleteTask="deleteTodo"></TodoItem>
</template>

<script setup>
import { getTodos } from './API/APITodos';
import { ref, onMounted, computed } from 'vue';
import TodoItem from './components/TodoItem.vue';
import TodoAddItem from './components/TodoAddItem.vue';

const taskList = ref([]);
const userId = ref(1);

const actualTasks = computed(() => taskList.value.filter((task) => !task.completed));
const completedTasks = computed(() => taskList.value.filter((task) => task.completed));

const addTodo = (task) => taskList.value.push(task);

const deleteTodo = (taskId) => {
  for (let i = 0; i < taskList.value.length; i++) {
    if (taskList.value[i].id === taskId) {
      taskList.value.splice(i, 1);
      break;
    }
  }
};

const editTodo = (task) => {
  for (let i = 0; i < taskList.value.length; i++) {
    if (taskList.value[i].id === task.id) {
      taskList.value[i] = task;
      break;
    }
  }
};

onMounted(async () => {
  try {
    const response = await getTodos(userId.value);
    taskList.value = response.data.todos;
  } catch (error) {
    console.error(error);
  }
});
</script>

<style lang="scss">
@import './sass/variables';
@import './sass/mixins';

.todo-app {
  &__title {
    margin: 50px 0 15px;
    border-bottom: 3px solid $primary-color-dark;

    @include font($size: $title-font-size, $transform: uppercase);
  }
}
</style>
