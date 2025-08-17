<template>
        <div class="bg-white rounded-lg shadow-md p-8 max-w-4xl mx-auto" v-if="employee">
            <div class="flex items-center mb-6">
                <div class="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center mr-6">
                    <svg class="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-if="!employeePhotoUrl">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                <img v-else="employee.photo" :src="employeePhotoUrl" :alt="`Employee photo of ${employee.name} ${employee.surname}`" class="w-full h-full object-cover rounded-full">
                </div>
                <div>
                    <h3 class="font-semibold text-gray-900 text-2xl">{{ employee.name.slice(0, 20) }} {{ employee.surname.slice(0, 20) }}</h3>
                    <p class="text-lg text-gray-600">Pozicija: {{ employee.position }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 text-base">
                <div>
                    <h4 class="font-bold text-gray-800 mb-3">Kontaktaktinės detalės:</h4>
                    <div class="space-y-2">
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Elektroninis paštas:</span>
                            <a class="text-[#1F3F77] hover:underline cursor-pointer no-select" :class="{'break-all': !hideEmail}"
                            v-if="employee.email.length > 30" @click="toggleEmail">
                            {{ hideEmail ? employee.email.slice(0, 30) : employee.email}} {{ arrow }}</a>
                            <a class="text-[#1F3F77] hover:underline cursor-pointer no-select" v-else>
                                {{ employee.email }}
                            </a>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Telefono numeris:</span>
                            <span v-if="employee.phone_number">{{ employee.phone_number.slice(0, 20) }}</span>
                            <span v-else>Nėra informacijos</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 class="font-bold text-gray-800 mb-3">Kompanijos detalės:</h4>
                    <div class="space-y-2">
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Kompanija:</span>
                            <span>{{ employee.expand.company_id.name }}</span>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Būstinė:</span>
                            <span>{{ employee.expand.office_id.name }}</span>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Padalinys:</span>
                            <span>{{ employee.expand.division_id.name }}</span>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Skyrius:</span>
                            <span v-if="employee.expand.department_id">{{ employee.expand.department_id.name }}</span>
                            <span v-else>Nėra informacijos</span>
                        </div>
                        <div class="flex">
                            <span class="font-medium text-gray-500 w-28 flex-shrink-0">Grupė:</span>
                            <span v-if="employee.expand.group_id">{{ employee.expand.group_id.name }}</span>
                            <span v-else>Nėra informacijos</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
const props = defineProps(['employee']);
import { getPhotoUrl } from '@/services/employeesService';
const employeePhotoUrl = computed(() => {
    if (props.employee && props.employee.id && props.employee.photo) {
        return getPhotoUrl(props.employee.id, props.employee.photo);
    }
    return '';
});
const hideEmail = ref(true);
const arrow = ref('▼');
const toggleEmail = () => {
    hideEmail.value = !hideEmail.value;
    arrow.value = hideEmail.value ? '▼' : '▲'
}
</script>