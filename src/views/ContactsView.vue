<template>
  <BaseLayout>
    <SearchBar
      v-model:search-term="searchTerm"
      v-model:total-items="totalItems"
    >
      <PaginatioButton v-model:per-page="perPage" />
      <DisplayButton @toggle="toggleComponent" :currentDisplay />
    </SearchBar>
    <Filters
      :companies="companies"
      v-model:company="selectedCompany"
      :officess="fetchedOffices"
      v-model:selected-office="selectedOffice"
      :divisions="fetchedDivisions"
      v-model:selected-division="selectedDivision"
      :departments="fetchedDepartments"
      v-model:selected-department="selectedDepartment"
      :groups="fetchedGroups"
      v-model:selected-group="selectedGroup"
    />
    <div v-if="employees.length === 0" class="flex flex-col items-center justify-center w-full py-16 px-4 bg-gray-50 rounded-xl shadow-inner text-center">
      <img src="../assets/icons/zero-results.svg" alt="No Results" class="w-24 h-24 mb-6 opacity-60"/>
      <h1 class="text-2xl font-semibold text-gray-700 mb-2">Nerasta jokių kontaktų</h1>
      <p class="text-gray-500">Pabandykite pakeisti paieškos kriterijus arba išvalyti filtrus.</p>
    </div>
    <component :is="currentDisplay" :employees="employees" v-else />
    <Pagination v-model:page="page" v-model:total-pages="totalPages" />
  </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import Pagination from "@/components/Layout/Pagination.vue";
import Filters from "@/components/UI/Filters.vue";
import SearchBar from "@/components/UI/SearchBar.vue";
import DisplayButton from "@/components/UI/Contacts/DisplayButton.vue";
import PaginatioButton from "@/components/UI/Contacts/PaginatioButton.vue";
import { useEmployees } from "@/composables/useEmployees";
import { useFilters } from "@/composables/useFilters";
import { useDisplay } from "@/composables/useDisplay";
const { employees, totalItems, page, totalPages, perPage, fetchRequest } =
  useEmployees();
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
  fetchedGroups,
  searchTerm,
} = useFilters(fetchRequest, perPage, page);
const { currentDisplay, toggleComponent } = useDisplay();
</script>
