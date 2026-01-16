<script setup lang="ts">
interface TaskResponse {
    id: string;
    title: string;
    completed: boolean;
}

const completed = ref(false);

const { data: tasks, pending, refresh } = await useFetch<TaskResponse[]>('/api/tasks');
</script>

<template>
    <div class="container">
        <NuxtLink to="/">Back Home</NuxtLink>
        <h1>Tasks list</h1>
        <!-- TODO: Tasks to list here -->
        <div v-if="pending">Loading tasks...</div>
        <ul v-else>
            <li v-for="task in tasks" :key="task.id">
                <h2>{{ task.title }}</h2>
                <p>Status: {{ task.completed ? '✅' : '⭕' }}</p>
            </li>
        </ul>
    </div>
</template>