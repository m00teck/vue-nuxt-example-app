export default defineNuxtRouteMiddleware((to, from) => {
  const userStore = useUserStore();

  if (!userStore.isLoggedIn) {
    return navigateTo("/login");
  }
});
