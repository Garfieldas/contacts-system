<template>
    <div class="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Įmonė:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white"
                v-model="selectedCompany" @change="emits('selectCompany', selectedCompany)">
                <option value="" selected>Filtruoti įmones...</option>
                <option v-for="company in companies" :value="company.id">{{ company.name }}</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Ofisas:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white">
                <option value="" selected disabled >Filtruoti adresus...</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Padalinys:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white">
                <option value="" selected disabled >Filtruoti padalinius...</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Skyrius:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white">
                <option value="" selected disabled >Filtruoti skyrius...</option>
            </select>
        </div>
        <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Grupė:</label>
            <select
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#1F3F77] focus:border-[#1F3F77] outline-none text-sm bg-white">
                <option value="" selected disabled >Filtruoti grupes...</option>
            </select>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useCompanies } from '@/composables/useCompanies';
import { onMounted, ref } from 'vue';
const { companies, fetchCompanies } = useCompanies();
const emits = defineEmits(['selectCompany'])
const selectedCompany = ref();

onMounted(() => {
    fetchCompanies();
})
</script>