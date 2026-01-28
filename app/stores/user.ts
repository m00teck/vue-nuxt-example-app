export const useUserStore = defineStore("user", () => {
  const user = ref<UserPublic | null>(null);
  const isLoggedIn = computed(() => !!user.value);

  function setUser(userData: UserPublic | null) {
    user.value = userData;
  }

  async function logout() {
    await $fetch("/api/auth/logout", { method: "POST" });
    user.value = null;
    await navigateTo("/");
  }

  return { user, isLoggedIn, setUser };
});
