<template>
    <main class="px-10 py-8 w-full">
        <div class="mb-8">
            <h1 class="text-3xl font-light text-gray-800">Kontaktų sistema</h1>
        </div>
        <ContactList :employees="employees"/>
    </main>
</template>
<script setup lang="ts">
import ContactList from '@/components/UI/Contacts/ContactList.vue';
import { useEmployees } from '@/composables/useEmployees';
const { employees } = useEmployees();
</script>