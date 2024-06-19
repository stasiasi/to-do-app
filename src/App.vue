<template>
  <div></div>
</template>

<script setup>
import { getTodos } from './API/APITodos'
import { ref, onMounted } from 'vue'

const taskList = ref([])
const userId = ref(1)

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
