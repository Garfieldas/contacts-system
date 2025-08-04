<template>
  <BaseModal :show-modal="showModal" @toggle-modal="toggleModal" v-if="auth.isLoggedIn">
    <component :is="currentForm" @employee-created="handleSubmit" :employee="selectedEmployee"/>
  </BaseModal>
  <BaseLayout>
    <div class="flex flex-row items-center mb-6">
    <SearchBar v-model:total-items="totalItems" v-model:search-param="searchParam" />
      <PaginatioButton v-model:per-page="perPage" />
      <DisplayButton @toggle="toggleComponent" :currentDisplay />
      <AddContactButton @add-contact="switchComponent(CreateContactForm)" v-if="auth.isLoggedIn"/>
    </div>
    <div class="text-sm text-gray-600">
        Iš viso rasta: <span class="font-semibold text-[#1F3F77]">{{ totalItems }} kontaktų</span>
    </div>
    <Filters @filter-changed="handleFilters"/>
    <div v-if="employees.length === 0" class="flex flex-col items-center justify-center w-full py-16 px-4 bg-gray-50 rounded-xl shadow-inner text-center">
      <img src="../assets/icons/zero-results.svg" alt="No Results" class="w-24 h-24 mb-6 opacity-60"/>
      <h1 class="text-2xl font-semibold text-gray-700 mb-2">Nerasta jokių kontaktų</h1>
      <p class="text-gray-500">Pabandykite pakeisti paieškos kriterijus arba išvalyti filtrus.</p>
    </div>
    <component :is="currentDisplay" :employees="employees" @edit-contact="(employee) => {
      handleEdit(employee); switchComponent(EditContactForm);
    }" v-else/>
    <Pagination v-model:page="page" v-model:total-pages="totalPages" />
  </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import ContactList from "@/components/UI/Contacts/ContactList.vue";
import ContactTable from "@/components/UI/Contacts/ContactTable.vue";
import Pagination from "@/components/Layout/Pagination.vue";
import Filters from "@/components/UI/Filters.vue";
import SearchBar from "@/components/UI/SearchBar.vue";
import DisplayButton from "@/components/UI/Contacts/DisplayButton.vue";
import PaginatioButton from "@/components/UI/Contacts/PaginatioButton.vue";
import { useEmployees } from "@/composables/useEmployees";
import { onMounted, shallowRef, reactive, computed, watch, ref } from "vue";
import BaseModal from "@/components/UI/BaseModal.vue";
import CreateContactForm from "@/components/UI/forms/Contacts/CreateContactForm.vue";
import AddContactButton from "@/components/UI/Contacts/AddContactButton.vue";
import { useAuthenticationStore } from "@/stores/authenticationStore";
import EditContactForm from "@/components/UI/forms/Contacts/EditContactForm.vue";
import type { Employee } from "@/types/employeeType";

const { employees, totalItems, page, totalPages, perPage, fetchRequest } = useEmployees();

const currentDisplay = shallowRef(ContactList);
const currentForm = shallowRef(CreateContactForm);
const auth = useAuthenticationStore();

const toggleComponent = () => {
  currentDisplay.value = currentDisplay.value === ContactList ? ContactTable : ContactList;
}

const searchParam = ref('');
let debounceTimer: ReturnType<typeof setTimeout> | null = null;

const showModal = ref(false);
const toggleModal = () => {
  showModal.value = !showModal.value
}

const switchComponent = (component: any) => {
  showModal.value = true;
  currentForm.value = component;
}

const selectedEmployee = ref();
const handleEdit = (employee: Employee) => selectedEmployee.value = employee;

const handleSubmit = () => {
  showModal.value = false;

  searchParam.value = '';
  page.value = 1;

  Object.keys(filters).forEach((key) => {
    filters[key as keyof typeof filters] = '';
  });

  fetchRequest(fullQuery.value);
};

const filters = reactive<{
  company?: string;
  office?: string;
  division?: string;
  department?: string;
  group?: string;
}>({});

const baseFilterQuery = computed(() => {
  const filterMap = {
    company: 'company_id',
    office: 'office_id',
    division: 'division_id',
    department: 'department_id',
    group: 'group_id',
  };

  const filterConditions = Object.entries(filterMap)
    .filter(([key]) => filters[key as keyof typeof filters])
    .map(([key, field]) => `${field}="${filters[key as keyof typeof filters]}"`);

  return filterConditions.length > 0
    ? `&filter=${encodeURIComponent(filterConditions.join(' && '))}`
    : '';
});

const fullQuery = computed(() => {
  let query = baseFilterQuery.value;

  if (searchParam.value) {
    const searchTerm = `(name?~"${searchParam.value}" || surname?~"${searchParam.value}" || email?~"${searchParam.value}" || phone_number?~"${searchParam.value}" || position?~"${searchParam.value}")`;
    query += (query.includes('&filter=') ? ' && ' : '&filter=') + encodeURIComponent(searchTerm);
  }

  return `${query}&expand=company_id,office_id,division_id,department_id,group_id`;
});

const handleFilters = (newFilters: {
  company?: string,
  office?: string,
  division?: string,
  department?: string,
  group?: string,
}) => {
  Object.assign(filters, newFilters);
  page.value = 1;
  fetchRequest(fullQuery.value);
}

watch(page, () => {
  fetchRequest(fullQuery.value);
});

watch(perPage, () => {
  page.value = 1;
  fetchRequest(fullQuery.value);
});

watch(searchParam, () => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }
    debounceTimer = setTimeout(() => {
    page.value = 1;
    fetchRequest(fullQuery.value);
  }, 800);
});

watch(totalPages, (newTotalPages) => {
  if (page.value > newTotalPages && newTotalPages > 0) {
    page.value = newTotalPages;
  } else if (newTotalPages === 0 && page.value !== 1) {
    page.value = 1;
  }
});

onMounted(() => {
  fetchRequest(fullQuery.value);
})

</script>
