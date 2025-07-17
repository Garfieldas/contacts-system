<template>
    <BaseLayout>
        <SearchBar />
        <Filters/>
        <ContactList :employees="employees"/>
        <Pagination />
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import ContactList from '@/components/UI/Contacts/ContactList.vue';
import Filters from '@/components/UI/Filters.vue';
import SearchBar from '@/components/UI/SearchBar.vue';
import { useEmployees } from '@/composables/useEmployees';
const { employees } = useEmployees();
</script>