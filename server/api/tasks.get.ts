import { Task } from '~~/shared/tasks';

export default defineEventHandler(async (event): Promise<Task[]> => {
  // For now, we'll return a hardcoded array
  return [
    { id: "1", title: "Install Nuxt 4", completed: true },
    { id: "2", title: "Learn Pinia", completed: false },
    { id: "3", title: "Build Task API", completed: false },
  ];
});
