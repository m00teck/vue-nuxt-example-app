// app/stores/tasks.ts
import { defineStore } from "pinia";
import type { Task, UpdateTaskInput } from "~~/shared/types/tasks";

export const useTaskStore = defineStore("tasks", () => {
  const tasks = ref<Task[]>([]);
  const loading = ref(false);
  const totalTasks = computed(() => tasks.value.length);
  const errorMessage = ref<string | null>(null);
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
    const userStore = useUserStore();

    // We check if a user is logged in before even trying
    if (!userStore.user?.id) {
      errorMessage.value = "You must be logged in to add tasks.";
      return;
    }

    const newTask = await $fetch<Task>("/api/tasks", {
      method: "POST",
      body: {
        title,
        userId: userStore.user.id, // Pass the logged-in user's UUID 🆔
      },
    });

    tasks.value.push(newTask);
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
