<script setup>
// Nuxt auto-imports useFetch for us!
const { data, pending } = await useFetch('/api/hello')
</script>

<template>
    <div>
        <h1>Frontend Meets Backend</h1>

        <p v-if="pending">Fetching from server...</p>
        <p v-else>{{ data.message }}</p>

        <NuxtLink to="/about">Go to About Page</NuxtLink>
    </div>
</template>