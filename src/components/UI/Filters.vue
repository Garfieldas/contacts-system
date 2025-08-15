<template>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Įmonė:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedCompany" @change="handleCompanyChange"> <option value="" selected>Filtruoti įmones...</option>
                <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ofisas:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedOffice" @change="handleOfficeChange"> <option value="" selected>Filtruoti adresus...</option>
                <option v-for="office in displayOffice" :value="office.id">{{ office.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Padalinys:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedDivision" @change="handleDivisionChange"> <option value="" selected>Filtruoti padalinius...</option>
               <option v-for="division in displayDivision" :value="division.id">{{ division.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Skyrius:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedDepartment" @change="handleDepartmentChange"> <option value="" selected>Filtruoti skyrius...</option>
                <option v-for="department in displayDepartment" :value="department.id">{{ department.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Grupė:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedGroup" @change="emitFilters"> <option value="" selected>Filtruoti grupes...</option>
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
import { onMounted, ref } from 'vue';
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

const emitFilters = () => {
    emits('filterChanged', {
        company: selectedCompany.value,
        office: selectedOffice.value,
        division: selectedDivision.value,
        department: selectedDepartment.value,
        group: selectedGroup.value
    })
}

const handleCompanyChange = async () => {
    selectedOffice.value = '';
    selectedDivision.value = '';
    selectedDepartment.value = '';
    selectedGroup.value = '';
    offices.value = [];
    divisions.value = [];
    departments.value = [];
    groups.value = [];
    emitFilters();

    if (selectedCompany.value) {
        await fetchOffices(`?filter=company_id~"${selectedCompany.value}"&expand=office_id&fields=id,expand.office_id`);
        displayOffice.value = (offices.value as expandOffice[]).map((item) => item.expand.office_id) || [];
    } else {
        displayOffice.value = [];
        displayDivision.value = [];
        displayDepartment.value = [];
        displayGroup.value = [];
    }
};

const handleOfficeChange = async () => {
    selectedDivision.value = '';
    selectedDepartment.value = '';
    selectedGroup.value = '';
    divisions.value = [];
    departments.value = [];
    groups.value = [];
    emitFilters();
    emitFilters();

    if (selectedOffice.value) {
        await fetchDivisions(`?filter=office_id~"${selectedOffice.value}"&expand=division_id&fields=expand.division_id`);
        displayDivision.value = (divisions.value as expandDivision[]).map(item => item.expand.division_id) || [];
    } else {
        displayDivision.value = [];
        displayDepartment.value = [];
        displayGroup.value = [];
    }
};

const handleDivisionChange = async () => {
    selectedDepartment.value = '';
    selectedGroup.value = '';
    departments.value = [];
    groups.value = [];
    emitFilters();
    emitFilters();

    if (selectedDivision.value) {
        await fetchDepartments(`?filter=division_id~"${selectedDivision.value}"&expand=department_id&fields=expand.department_id`);
        displayDepartment.value = (departments.value as expandDepartment[]).map(item => item.expand.department_id) || [];
    } else {
        displayDepartment.value = [];
        displayGroup.value = [];
    }
};

const handleDepartmentChange = async () => {
    selectedGroup.value = '';
    groups.value = [];
    emitFilters();
    emitFilters();

    if (selectedDepartment.value) {
        await fetchGroups(`?filter=department_id~"${selectedDepartment.value}"&expand=group_id&fields=expand.group_id`);
        displayGroup.value = (groups.value as expandGroup[]).map(item => item.expand.group_id) || [];
    } else {
        displayGroup.value = [];
    }
};

onMounted(() => {
    fetchCompanies();
})
</script>