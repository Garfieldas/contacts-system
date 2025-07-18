<template>
    <BaseLayout>
        <SearchBar />
        <Filters :companies="companies" v-model:company="selectedCompany" 
        :officess="fetchedOffices"
        v-model:selected-office="selectedOffice"
         :divisions="fetchedDivisions"
        v-model:selected-division="selectedDivision"
        :departments="fetchedDepartments" v-model:selected-department="selectedDepartment"/>
        <ContactList :employees="employees"/>
        <Pagination />
    </BaseLayout>
</template>
<script setup lang="ts">
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import Pagination from '@/components/Layout/Pagination.vue';
import ContactList from '@/components/UI/Contacts/ContactList.vue';
import Filters from '@/components/UI/Filters.vue';
import { ref, watch } from 'vue';
import SearchBar from '@/components/UI/SearchBar.vue';
import { useEmployees } from '@/composables/useEmployees';
import { useCompanies } from '@/composables/useCompanies';
import { useOffices } from '@/composables/useOffices';
import { useDivisions } from '@/composables/useDivisions';
import { useDepartments } from '@/composables/useDepartments';
const { employees, fetchRequest } = useEmployees();
const { companies } = useCompanies();
const { offices, fetchOffices } = useOffices();
const { divisions, fetchDivisions } = useDivisions();
const { departments, fetchDepartments } = useDepartments();

const selectedCompany = ref();
const fetchedOffices: any = ref([]);
const selectedOffice = ref();
const fetchedDivisions: any = ref([]);
const selectedDivision = ref();
const fetchedDepartments: any = ref([]);
const selectedDepartment = ref();

watch(selectedCompany, async() => {
    fetchRequest(`?filter=company_id="${selectedCompany.value}"&expand=office_id`);
    await fetchOffices(`?filter=company_id="${selectedCompany.value}"&expand=office_id&fields=expand.office_id`);
    fetchedOffices.value = (offices.value as any[]).map(item => item.expand.office_id);
});
watch(selectedOffice, async() => {
    const filter = `company_id="${selectedCompany.value}" && office_id="${selectedOffice.value}"`;
    fetchRequest(`?filter=${encodeURIComponent(filter)}&expand=office_id`);

    await fetchDivisions(`?filter=office_id="${selectedOffice.value}"&expand=division_id&fields=expand.division_id`);
    fetchedDivisions.value = (divisions.value as any[]).map(item => item.expand.division_id)
});
watch(selectedDivision, async() => {
    const filter = `company_id="${selectedCompany.value}" && office_id="${selectedOffice.value}" && division_id="${selectedDivision.value}"`;
    fetchRequest(`?filter=${encodeURIComponent(filter)}&expand=office_id`);

    await fetchDepartments(`?filter=division_id="${selectedDivision.value}"&expand=department_id&fields=expand.department_id`);
    fetchedDepartments.value = (departments.value as any[]).map(item => item.expand.department_id);
});
watch(selectedDepartment, () => {
    const filter = `company_id="${selectedCompany.value}" && office_id="${selectedOffice.value}" && division_id="${selectedDivision.value}" && department_id="${selectedDepartment.value}"`;
    fetchRequest(`?filter=${encodeURIComponent(filter)}&expand=office_id`);

})
</script>