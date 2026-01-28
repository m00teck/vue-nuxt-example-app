export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.isLoggedIn) {
    console.warn("Access denied. Redirecting to home...");
    return navigateTo("/");
  }
});
