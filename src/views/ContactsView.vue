<template>
    <BaseLayout>
        <SearchBar>
          <PaginatioButton v-model:per-page="perPage" />
          <DisplayButton @toggle="toggleComponent" :currentDisplay/>
        </SearchBar>
        <Filters :companies="companies" v-model:company="selectedCompany" 
        :officess="fetchedOffices"
        v-model:selected-office="selectedOffice"
         :divisions="fetchedDivisions"
        v-model:selected-division="selectedDivision"
        :departments="fetchedDepartments" v-model:selected-department="selectedDepartment"
        :groups="fetchedGroups" v-model:selected-group="selectedGroup"/>
        <component :is="currentDisplay" :employees="employees"/>
        <Pagination v-model:page="page" v-model:total-pages="totalPages"/>
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import Filters from '@/components/UI/Filters.vue';
import SearchBar from '@/components/UI/SearchBar.vue';
import DisplayButton from '@/components/UI/Contacts/DisplayButton.vue';
import PaginatioButton from '@/components/UI/Contacts/PaginatioButton.vue';
import { useEmployees } from '@/composables/useEmployees';
import { useFilters } from '@/composables/useFilters';
import { useDisplay } from '@/composables/useDisplay';
const { employees, page, totalPages, perPage, fetchRequest } = useEmployees();
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
} = useFilters(fetchRequest, perPage, page);
const { currentDisplay, toggleComponent } = useDisplay();
</script>