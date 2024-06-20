<template>
  <div 
    class="todo-app__task task" 
    v-for="task in props.taskList" 
    :key="task.id"
  >
    <div class="task__menu">
      <input
        type="checkbox"
        class="task__checkbox"
        v-model="task.completed"
        @change="completeTask(task)"
      />
      <span 
        v-if="!task.editing" 
        :class="{ task_completed: task.completed }"
      >
        {{ task.todo }}
      </span>
      <input
        type="text"
        class="task__edit-input input"
        v-if="!task.completed && task.editing"
        v-model="task.tempTodo"
      />
    </div>
    <div class="task__menu">
      <button
        class="task__edit button"
        v-if="!task.completed && !task.editing"
        @click="startEdit(task)"
      >
        Edit
      </button>
      <button 
        class="task__save button" 
        v-if="task.editing" 
        @click="saveEditedTask(task)"
      >
        Save
      </button>
      <button 
        class="task__delete button" 
        @click="deleteTask(task.id)"
      >
        Delete
      </button>
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
  justify-content: space-between;
}

.task {
  height: 45px;
  padding: 10px 40px;
  border-bottom: 1px solid $primary-color-grey;

  &__menu {
    display: flex;
    align-items: center;
  }

  &__checkbox {
    margin-right: 15px;
    transform: scale(1.3);
    cursor: pointer;
  }

  &__edit-input {
    padding: 15px;
    padding-left: 0px;
    width: 430px;
    box-shadow: 0px 2px 0px $primary-accent-color;
  }

  & span {
    width: 444px;
  }

  &_completed {
    text-decoration: line-through;
  }
}

.button {
  margin-left: 7px;
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
</style>
