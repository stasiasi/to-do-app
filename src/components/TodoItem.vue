<template>
  <div class="todo-app__task task" v-for="task in props.taskList" :key="task.id">
    <div>
      <input
        type="checkbox"
        class="task__checkbox"
        v-model="task.completed"
        @change="completeTask(task)"
      />
      <span v-if="!task.editing">{{ task.todo }}</span>
      <input type="text" class="task__input" v-if="!task.completed && task.editing" v-model="task.tempTodo"/>
    </div>
    <div>
      <button class="task__button" v-if="!task.completed && !task.editing" @click="startEdit(task)">Edit</button>
      <button class="task__button" v-if="task.editing" @click="saveEditedTask(task)">Save</button>
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
const emits = defineEmits(['DeleteTask', 'EditTask']);

const deleteTask = (taskId) => {
  emits('DeleteTask', taskId);
};
const completeTask = (task) => {
  task.completed = true;
  emits('EditTask', task);
};

const startEdit = (task) => {
  task.editing = true;
  task.tempTodo = task.todo;
};

const saveEditedTask = (task) => {
  task.todo = task.tempTodo;
  delete task.tempTodo;
  delete task.editing;
  emits('EditTask', task);
};

</script>

<style>
.todo-app__task {
  display: flex;
}
</style>
