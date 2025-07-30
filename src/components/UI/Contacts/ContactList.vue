<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card v-for="employee in employees"
        :employee="employee"
        :key="employee"/>
    </div>
</template>
<script setup lang="ts">
import Card from './Card.vue';
const props = defineProps(['employees'])
</script>