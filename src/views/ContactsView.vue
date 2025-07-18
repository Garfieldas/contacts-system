<template>
    <BaseLayout>
        <SearchBar />
        <Filters :companies="companies" v-model:company="selectedCompany" 
        :officess="fetchedOffices"
        v-model:selected-office="selectedOffice"
         :divisions="fetchedDivisions"
        v-model:selected-division="selectedDivision"
        :departments="fetchedDepartments" v-model:selected-department="selectedDepartment"
        :groups="fetchedGroups" v-model:selected-group="selectedGroup"/>
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
import { useFilters } from '@/composables/useFilters';
const { employees, fetchRequest } = useEmployees();
const {
  companies,
  selectedCompany,
  selectedOffice,
  selectedDivision,
  selectedDepartment,
  selectedGroup,
  fetchedOffices,
  fetchedDivisions,
  fetchedDepartments,
  fetchedGroups
} = useFilters(fetchRequest);
</script>