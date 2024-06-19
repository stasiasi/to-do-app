<template>
  <TodoItem :taskList="actualTasks" @DeleteTask="deleteTodo"></TodoItem>
  <hr />
  <TodoItem :taskList="completedTasks" @DeleteTask="deleteTodo"></TodoItem>
</template>

<script setup>
import { getTodos } from './API/APITodos'
import { ref, onMounted, computed } from 'vue'
import TodoItem from './components/TodoItem.vue'

const taskList = ref([])
const userId = ref(1)

const actualTasks = computed(() => taskList.value.filter((task) => !task.completed))
const completedTasks = computed(() => taskList.value.filter((task) => task.completed))

const deleteTodo = (taskId) => {
  let index
  for (let i = 0; i < taskList.value.length; i++) {
    if (taskList.value[i].id === taskId) {
      index = i
      break
    }
  }
  if (index !== undefined) {
    taskList.value.splice(index, 1)
  }
}

onMounted(async () => {
  try {
    const response = await getTodos(userId.value)
    taskList.value = response.data.todos
  } catch (error) {
    console.error(error)
  }
})
</script>

<style scoped></style>
