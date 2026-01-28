export default defineNuxtPlugin(async (nuxtApp) => {
  const userStore = useUserStore();

  try {
    const session = await $fetch<{ user: any }>("/api/auth/me");
    if (session.user) {
      userStore.setUser(session.user);
    }
  } catch {
    // No session found or server error; user remains logged out
    userStore.setUser(null);
  }
});
