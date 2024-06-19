<template>
  <div class="todo-app__task task" v-for="task in props.taskList" :key="task.id">
    <div>
      <input
        type="checkbox"
        class="task__checkbox"
        v-if="!task.completed"
        @change="completeTask(task)"
      />
      <span>{{ task.todo }}</span>
      <input type="text" class="task__input" v-if="!task.completed" />
    </div>
    <div>
      <button class="task__button" v-if="!task.completed">Edit</button>
      <button class="task__button" @click="deleteTask(task.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  taskList: {
    type: Array
  }
});
const emits = defineEmits(['DeleteTask', 'CompleteTask']);

const deleteTask = (taskId) => {
  emits('DeleteTask', taskId);
};
const completeTask = (task) => {
  task.completed = true;
  emits('CompleteTask', task);
};
</script>

<style>
.todo-app__task {
  display: flex;
}
</style>
