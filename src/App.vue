<template>
  <TodoItem
    :taskList="actualTasks"
    @DeleteTask="deleteTodo"
    @CompleteTask="completeTodo"
  ></TodoItem>
  <hr />
  <TodoItem :taskList="completedTasks" @DeleteTask="deleteTodo"></TodoItem>
</template>

<script setup>
import { getTodos } from './API/APITodos';
import { ref, onMounted, computed } from 'vue';
import TodoItem from './components/TodoItem.vue';

const taskList = ref([]);
const userId = ref(1);

const actualTasks = computed(() => taskList.value.filter((task) => !task.completed));
const completedTasks = computed(() => taskList.value.filter((task) => task.completed));

const deleteTodo = (taskId) => {
  for (let i = 0; i < taskList.value.length; i++) {
    if (taskList.value[i].id === taskId) {
      taskList.value.splice(i, 1);
      break;
    }
  }
};

const completeTodo = (task) => {
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

<style scoped></style>
