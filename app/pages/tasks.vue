<script setup lang="ts">

import { useTaskStore } from '~/stores/tasks';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();

const { tasks, loading } = storeToRefs(taskStore);

const newTaskTitle = ref('');

onMounted(async () => {
  await taskStore.fetchTasks();
});

// Create a new task (POST)
async function handleAdd() {
  if (!newTaskTitle.value.trim()) return

  await taskStore.addTask(newTaskTitle.value.trim());
  newTaskTitle.value = '';
}
</script>

<template>
  <div class="tasks-container">
    <NuxtLink to="/">← Back Home</NuxtLink>
    <h1>Project 2: Task Manager</h1>
    <h2>Tasks: {{ taskStore.totalTasks }}</h2>

    <div class="add-task">
      <input v-model="newTaskTitle" @keyup.enter="handleAdd" placeholder="What needs to be done?" />
      <button @click="handleAdd" :disabled="!newTaskTitle.trim()">Add</button>
    </div>

    <hr />

    <div v-if="loading" class="loading">Fetching tasks...</div>

    <ul v-else-if="tasks && tasks.length">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <label class="status-label">
          <input 
            type="checkbox"
            class="status-checkbox" 
            :checked="task.completed" 
            @change="taskStore.toggleTask(task.id, !task.completed)"
          >
          <span class="status-icon">{{ task.completed ? '✅' : '⭕' }}</span>
        </label>

        <span :class="{ 'completed-text': task.completed }">
          {{ task.title }}
        </span>

        <button class="btn-delete" @click="taskStore.removeTask(task.id)">🗑️</button>
      </li>
    </ul>

    <p v-else>No tasks found. Add one above!</p>
  </div>
</template>

<style scoped>
.tasks-container {
  max-width: 500px;
  margin: 2rem auto;
  font-family: sans-serif;
}

.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-task input {
  flex: 1;
  padding: 8px;
}

.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.status-icon {
  cursor: pointer;
  margin-right: 10px;
  font-size: 1.2rem;
}

.completed-text {
  text-decoration: line-through;
  color: #888;
}

.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  filter: grayscale(1);
}

.btn-delete:hover {
  filter: grayscale(0);
}
</style>