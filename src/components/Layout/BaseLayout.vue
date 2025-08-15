<template>
    <main class="px-10 py-8 w-full">
        <div class="mb-8">
            <h1 class="text-3xl font-light text-gray-800">{{ title }}</h1>
        </div>
        <slot></slot>
    </main>
</template>
<script setup lang="ts">
const props = defineProps(['title'])
</script>