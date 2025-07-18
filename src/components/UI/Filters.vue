<template>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Įmonė:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="company">
                <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ofisas:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedOffice">
                <option v-for="office in officess" :value="office.id">{{ office.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Padalinys:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedDivision">
                <option v-for="division in divisions" :value="division.id">{{ division.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Skyrius:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedDepartment">
                <option v-for="department in departments" :value="department.id"> {{ department.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Grupė:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedGroup">
                <option v-for="group in groups" :value="group.id">{{ group.name }}</option>
            </select>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['companies', 'officess', 'divisions', 'departments', 'groups']);
const company = defineModel('company');
const selectedOffice = defineModel('selectedOffice');
const selectedDivision = defineModel('selectedDivision');
const selectedDepartment = defineModel('selectedDepartment');
const selectedGroup = defineModel('selectedGroup')
</script>