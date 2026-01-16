<script setup lang="ts">
// 1. Import our shared types from the root
import type { Task, UpdateTaskInput } from '~~/shared/types'

// 2. Fetch the initial list (GET /api/tasks)
// We get 'refresh' to help us sync the UI later
const { data: tasks, pending, refresh } = await useFetch<Task[]>('/api/tasks')

// 3. Local state for the "New Task" input
const newTaskTitle = ref<string>('')

// --- ACTIONS ---

// Create a new task (POST)
async function addTask() {
  if (!newTaskTitle.value.trim()) return

  await $fetch('/api/tasks', {
    method: 'POST',
    body: { title: newTaskTitle.value }
  })

  newTaskTitle.value = '' // Reset input
  await refresh()         // Sync with server
}

// Toggle status (PATCH)
async function toggleTask(task: Task) {
  const update: UpdateTaskInput = {
    completed: !task.completed
  }

  await $fetch(`/api/tasks/${task.id}`, {
    method: 'PATCH',
    body: update
  })

  await refresh() // Sync with server
}

// Delete task (DELETE)
async function deleteTask(id: string) {
  await $fetch(`/api/tasks/${id}`, {
    method: 'DELETE'
  })

  await refresh() // Sync with server
}
</script>

<template>
  <div class="tasks-container">
    <NuxtLink to="/">← Back Home</NuxtLink>
    <h1>Project 2: Task Manager</h1>

    <div class="add-task">
      <input 
        v-model="newTaskTitle" 
        @keyup.enter="addTask"
        placeholder="What needs to be done?" 
      />
      <button @click="addTask" :disabled="!newTaskTitle.trim()">Add</button>
    </div>

    <hr />

    <div v-if="pending" class="loading">Loading tasks...</div>
    
    <ul v-else-if="tasks && tasks.length">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <span 
          class="status-icon" 
          @click="toggleTask(task)"
        >
          {{ task.completed ? '✅' : '⭕' }}
        </span>

        <span :class="{ 'completed-text': task.completed }">
          {{ task.title }}
        </span>

        <button class="btn-delete" @click="deleteTask(task.id)">🗑️</button>
      </li>
    </ul>

    <p v-else>No tasks found. Add one above!</p>
  </div>
</template>

<style scoped>
.tasks-container { max-width: 500px; margin: 2rem auto; font-family: sans-serif; }
.add-task { display: flex; gap: 10px; margin-bottom: 20px; }
.add-task input { flex: 1; padding: 8px; }

.task-item { 
  display: flex; 
  align-items: center; 
  justify-content: space-between;
  padding: 10px; 
  border-bottom: 1px solid #eee; 
}

.status-icon { cursor: pointer; margin-right: 10px; font-size: 1.2rem; }
.completed-text { text-decoration: line-through; color: #888; }
.btn-delete { background: none; border: none; cursor: pointer; filter: grayscale(1); }
.btn-delete:hover { filter: grayscale(0); }
</style>