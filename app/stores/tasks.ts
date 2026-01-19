// app/stores/tasks.ts
import { defineStore } from "pinia";
import type { Task, UpdateTaskInput } from "~~/shared/tasks";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const totalTasks = computed(() => tasks.value.length);
  const completedTasks = computed(
    () => tasks.value.filter((task: Task) => task.completed).length,
  );

  async function fetchTasks() {
    loading.value = true;
    try {
      const data = await $fetch<Task[]>("/api/tasks");
      tasks.value = data;
    } finally {
      loading.value = false;
    }
  }

  async function addTask(title: string) {
    const newTask = await $fetch<Task>("/api/tasks", {
      method: "POST",
      body: { title },
    });
    tasks.value.push(newTask); // Local update for speed!
  }

  async function toggleTask(id: string, completed: boolean) {
    const updated = await $fetch<Task>(`/api/tasks/${id}`, {
      method: "PATCH",
      body: { completed },
    });

    // Find the task in our local list and update it
    const index = tasks.value.findIndex((t: Task) => t.id === id);
    if (index !== -1) tasks.value[index] = updated;
  }

  async function removeTask(id: string) {
    const updated = await $fetch<Task>(`/api/tasks/${id}`, {
      method: "DELETE",
    });

    const index = tasks.value.findIndex((t: Task) => t.id === id);
    if (index !== -1) {
      tasks.value = tasks.value.filter((task: Task) => task.id !== id);
    }
  }

  return {
    tasks,
    loading,
    fetchTasks,
    addTask,
    toggleTask,
    removeTask,
    totalTasks,
    completedTasks,
  };
});
