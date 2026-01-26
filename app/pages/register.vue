<script setup lang="ts">
const userStore = useUserStore()
const form = reactive({
  username: '',
  email: '',
  password: ''
})

async function handleRegister() {
  try {
    // 1. Send data to our secure API
    const newUser = await $fetch('/api/auth/register', {
      method: 'POST',
      body: form
    })

    // 2. Log them in locally
    userStore.setUser({
      ...newUser,
      createdAt: new Date().toISOString()
    })

    // 3. Move to the tasks page
    await navigateTo('/tasks')
  } catch (err: any) {
    alert(err.statusMessage || 'Registration failed')
  }
}
</script>

<template>
  <div class="register-container">
    <h1>Register</h1>
    <form @submit.prevent="handleRegister">
      <div class="form-group">
        <label for="username">Username</label>
        <input id="username" v-model="form.username" type="text" required placeholder="Enter username" />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required placeholder="Enter email" />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input id="password" v-model="form.password" type="password" required placeholder="Enter password" />
      </div>

      <button type="submit">Register</button>
    </form>
    <p>
      Already have an account? <NuxtLink to="/login">Login here</NuxtLink>
    </p>
  </div>
</template>

<style scoped>
.register-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 1rem;
  font-family: sans-serif;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}

button {
  padding: 0.5rem 1rem;
  cursor: pointer;
}
</style>
