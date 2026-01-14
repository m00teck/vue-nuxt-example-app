<script setup>
const nameInput = ref('');
const { data, refresh } = await useFetch('/api/hello', { query: { name: nameInput } });
</script>

<template>
    <div>
        <input v-model="nameInput" placeholder="Enter your name" />
        <button @click="refresh">Greet Me</button>
        <p v-if="data">{{ data.message }}</p>
    </div>
</template>