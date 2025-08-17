<template>
    <div class="flex flex-col items-center justify-center w-full py-16 px-4 bg-gray-50 rounded-xl shadow-inner text-center">
      <img src="../../assets/icons/zero-results.svg" alt="No Results" class="w-24 h-24 mb-6 opacity-60"/>
      <h1 class="text-2xl font-semibold text-gray-700 mb-2">{{ title }}</h1>
      <p class="text-gray-500" v-if="details">Pabandykite pakeisti paieškos kriterijus arba išvalyti filtrus.</p>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['title', 'details'])
</script>