<template>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card v-for="employee in employees"
        :employee="employee"
        :key="employee"
        @edit-contact="onEdit"
        @delete-contact="onDelete"/>
    </div>
</template>
<script setup lang="ts">
import type { Employee } from '@/types/employeeType';
import Card from './Card.vue';
const props = defineProps(['employees']);
const emit = defineEmits(['edit-contact', 'delete-contact']);
const onEdit = (employee: Employee) => emit('edit-contact', employee);
const onDelete = (employee: Employee) => emit('delete-contact', employee);
</script>