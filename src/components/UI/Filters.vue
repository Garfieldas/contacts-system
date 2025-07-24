<template>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Įmonė:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedCompany" @change="emitFilters">
                <option value="" selected>Filtruoti įmones...</option>
                <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ofisas:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedOffice" @change="emitFilters">
                <option value="" selected>Filtruoti adresus...</option>
                <option v-for="office in displayOffice" :value="office.id">{{ office.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Padalinys:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedDivision" @change="emitFilters">
                <option value="" selected>Filtruoti padalinius...</option>
               <option v-for="division in displayDivision" :value="division.id">{{ division.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Skyrius:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedDepartment" @change="emitFilters">
                <option value="" selected>Filtruoti skyrius...</option>
                <option v-for="department in displayDepartment" :value="department.id">{{ department.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Grupė:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedGroup" @change="emitFilters">
                <option value="" selected>Filtruoti grupes...</option>
                <option v-for="group in displayGroup" :value="group.id">{{ group.name }}</option>
            </select>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useCompanies } from '@/composables/useCompanies';
import { useOffices } from '@/composables/useOffices';
import { useDivisions } from '@/composables/useDivisions';
import { useDepartments } from '@/composables/useDepartments';
import { useGroups } from '@/composables/useGroups';
import { onMounted, ref, watch } from 'vue';
import type { expandOffice } from '@/types/officeType';
import type { expandDivision } from '@/types/divisionType';
import type { expandDepartment } from '@/types/departmentType';
import type { expandGroup } from '@/types/groupType';

const { companies, fetchCompanies } = useCompanies();
const { offices, fetchOffices } = useOffices();
const { divisions, fetchDivisions } = useDivisions();
const { departments, fetchDepartments } = useDepartments();
const { groups, fetchGroups } = useGroups();

const emits = defineEmits(['filterChanged']);
const selectedCompany = ref('');
const selectedOffice = ref('');
const selectedDivision = ref('');
const selectedDepartment = ref('');
const selectedGroup = ref('');

const displayOffice = ref();
const displayDivision = ref();
const displayDepartment = ref();
const displayGroup = ref();
const disableWatch = ref(false);

const emitFilters = () => {
    emits('filterChanged', {
        company: selectedCompany.value,
        office: selectedOffice.value,
        division: selectedDivision.value,
        department: selectedDepartment.value,
        group: selectedGroup.value
    })
}

watch(selectedCompany, async () => {
    if(disableWatch.value) return;
    disableWatch.value = true;
    selectedOffice.value = '';
    selectedDivision.value = '';
    selectedDepartment.value = '';
    selectedGroup.value = '';
    disableWatch.value = false;
    await fetchOffices(`?filter=company_id="${selectedCompany.value}"&expand=office_id&fields=expand.office_id`);
    displayOffice.value = (offices.value as expandOffice[]).map((item) => item.expand.office_id)
});

watch(selectedOffice, async () => {
    if(disableWatch.value) return;
    disableWatch.value = true;
    selectedDivision.value = '';
    selectedDepartment.value = '';
    selectedGroup.value = '';
    disableWatch.value = false;
    await fetchDivisions(`?filter=office_id="${selectedOffice.value}"&expand=division_id&fields=expand.division_id`);
    displayDivision.value = (divisions.value as expandDivision[]).map(item => item.expand.division_id)
});

watch(selectedDivision, async () => {
    if(disableWatch.value) return;
    disableWatch.value = true;
    selectedDepartment.value = '';
    selectedGroup.value = '';
    disableWatch.value = false;
    await fetchDepartments(`?filter=division_id="${selectedDivision.value}"&expand=department_id&fields=expand.department_id`);
    displayDepartment.value = (departments.value as expandDepartment[]).map(item => item.expand.department_id);
});

watch(selectedDepartment, async () => {
    if(disableWatch.value) return;
    disableWatch.value = true;
    selectedGroup.value = '';
    disableWatch.value = false;
    await fetchGroups(`?filter=department_id="${selectedDepartment.value}"&expand=group_id&fields=expand.group_id`);
    displayGroup.value = (groups.value as expandGroup[]).map(item => item.expand.group_id);
});

onMounted(() => {
    fetchCompanies();
})
</script>