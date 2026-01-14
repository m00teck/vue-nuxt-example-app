<script setup lang="ts">
// Define our types
interface ProfileResponse {
    displayName: string
    displayAge: number
    themeColor: string
    rank: 'Newcomer' | 'Veteran' | 'Legend'
}

const name = ref<string>('')
const age = ref<number | null>(null)
const favColor = ref<string>('#3498db')

const { data: profile, pending, refresh } = await useFetch<ProfileResponse>('/api/profile', {
    query: { name, age, color: favColor },
    immediate: false
})

// Validation logic
const generateCard = () => {
    if (name.value.trim().length > 0) {
        refresh()
    } else {
        alert("Please enter a name first!")
    }
}
</script>

<template>
    <div class="container">
        <NuxtLink to="/">Back Home</NuxtLink>
        <h1>Profile Generator</h1>

        <div class="form">
            <input v-model="name" type="text" placeholder="Enter name">
            <input v-model="age" type="number" placeholder="Enter age">
            <input v-model="favColor" type="color">

            <button @click="generateCard" :disabled="pending">
                {{ pending ? 'Loading...' : 'Generate Card' }}
            </button>
        </div>

        <div v-if="profile" :style="{ borderLeft: `10px solid ${profile.themeColor}` }" class="card">
            <h2>{{ profile.displayName }}</h2>
            <p>Rank: {{ profile.rank }}</p>
            <p>Age: {{ profile.displayAge }}</p>
        </div>
    </div>
</template>