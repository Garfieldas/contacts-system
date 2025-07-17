<template>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                <svg class="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </div>
            <div>
                <h3 class="font-semibold text-gray-900 text-base">{{ employee.name }} {{ employee.surname }}</h3>
                <p class="text-sm text-gray-600">{{ employee.position }}</p>
            </div>
        </div>
        <div class="space-y-2 text-sm">
            <div class="flex items-center text-gray-700">
                <span class="font-medium w-24 text-gray-500">Telefonas nr:</span>
                <span>{{ employee.phone_number }}</span>
            </div>
            <div class="flex items-center text-gray-700">
                <span class="font-medium w-24 text-gray-500">El. paštas:</span>
                <span class="text-[#1F3F77]">{{ employee.email }}</span>
            </div>
            <div class="flex items-start text-gray-700">
                <span class="font-medium w-24 text-gray-500">Adresas:</span>
                <span>{{ employee.expand.office_id.name }}</span>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const props = defineProps(['employee'])
</script>