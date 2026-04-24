<script setup lang="ts">
const userStore = useUserStore()

const form = reactive({
  email: '',
  password: ''
})

const isLoading = ref(false)

async function handleLogin() {
  isLoading.value = true
  try {
    const user = await $fetch('/api/auth/login', {
      method: 'POST',
      body: form
    })

    userStore.setUser(user)
    await navigateTo('/tasks')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Login failed. Check your email and password.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="login-container">
    <h2>Sign in</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button :disabled="isLoading">
        {{ isLoading ? 'Signing in...' : 'Login' }}
      </button>
    </form>
    <p>Don't have an account? <NuxtLink to="/register">Register</NuxtLink></p>
  </div>
</template>
