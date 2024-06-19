<template>
  <div class="todo-app__task task" v-for="task in props.taskList" :key="task.id">
    <div>
      <input
        type="checkbox"
        class="task__checkbox"
        v-model="task.completed"
        @change="completeTask(task)"
      />
      <span v-if="!task.editing" :class="{ task_completed: task.completed }">{{ task.todo }}</span>
      <input
        type="text"
        class="task__input input"
        v-if="!task.completed && task.editing"
        v-model="task.tempTodo"
      />
    </div>
    <div>
      <button class="task__button" v-if="!task.completed && !task.editing" @click="startEdit(task)">
        Edit
      </button>
      <button class="task__button" v-if="task.editing" @click="saveEditedTask(task)">Save</button>
      <button class="task__button" @click="deleteTask(task.id)">Delete</button>
    </div>
  </div>
</template>

<script setup>
const emits = defineEmits(['DeleteTask', 'EditTask']);
const props = defineProps({
  taskList: {
    type: Array
  }
});

const deleteTask = (taskId) => {
  emits('DeleteTask', taskId);
};

const completeTask = (task) => {
  if (task.editing) {
    delete task.tempTodo;
    delete task.editing;
  }
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

<style lang="scss">
@import '../sass/variables';
@import '../sass/mixins';

.todo-app__task {
  display: flex;
}

.task {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  height: 45px;
  border-bottom: 1px solid $primary-color-dark;

  &_completed {
    text-decoration: line-through;
  }

  &__checkbox {
    margin-right: 10px;
    transform: scale(1.4);
    cursor: pointer;
  }

  &__button {
    cursor: pointer;

    padding: 8px 10px;
    margin-left: 10px;
    border-radius: 5px;
    border: none;
    color: $primary-color-light;
    background-color: $primary-color-dark;

    @include font(
      $size: 16px,
      $weight: 500,
      $font-color: $primary-color-light,
      $transform: uppercase
    );

    &:hover {
      background-color: #b35465;
    }
  }
}
span {
  line-height: 36px;
}
</style>
