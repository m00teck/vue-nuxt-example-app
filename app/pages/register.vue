<script setup lang="ts">
const userStore = useUserStore()

const form = reactive({
  username: '',
  email: '',
  password: ''
})

const isLoading = ref(false)

async function handleRegister() {
  isLoading.value = true
  try {
    const newUser = await $fetch('/api/auth/register', {
      method: 'POST',
      body: form
    })

    userStore.setUser(newUser)
    await navigateTo('/tasks')
  } catch (error) {
    console.error('Registration failed:', error)
    alert('Oops! Registration failed. Check the console for details.')
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="register-container">
    <h2>Create your account 📝</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="form.username" placeholder="Username" required />
      <input v-model="form.email" type="email" placeholder="Email" required />
      <input v-model="form.password" type="password" placeholder="Password" required />
      <button :disabled="isLoading">
        {{ isLoading ? 'Signing up...' : 'Register' }}
      </button>
    </form>
  </div>
</template>