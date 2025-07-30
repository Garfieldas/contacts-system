<template>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
        <router-link :to="{name: 'contact-details', params: {id: employee.id}}">
        <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center mr-4">
                <svg class="w-7 h-7 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" v-if="!employee.photo">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <img v-else="employee.photo" :src="employeePhotoUrl" :alt="`Employee photo of ${employee.name} ${employee.surname}`" class="w-full h-full object-cover rounded-full">
            </div>
            <div>
                <h3 class="font-semibold text-gray-900 text-base">{{ employee.name.slice(0, 20) }} {{ employee.surname.slice(0, 20) }}</h3>
                <p class="text-sm text-gray-600">{{ employee.position }}</p>
            </div>
        </div>
        </router-link>
        <div class="space-y-2 text-sm">
            <div class="flex items-center text-gray-700">
                <span class="font-medium w-24 text-gray-500">Telefonas nr:</span>
                <span v-if="employee.phone_number">{{ employee.phone_number.slice(0, 20) }}</span>
                <span v-else>Nėra informacijos</span>
            </div>
            <div class="flex items-center text-gray-700">
                <span class="font-medium w-24 text-gray-500">El. paštas:</span>
                <span class="text-[#1F3F77] cursor-pointer" v-if="employee.email.length > 30"
                    @click="toggleEmail" :class="{'break-all': !hideEmail}"
                    >{{ hideEmail ? employee.email.slice(0, 30) : employee.email}} {{ arrow }}</span>
                <span class="text-[#1F3F77]" v-else>{{ employee.email }}</span>
            </div>
            <div class="flex items-start text-gray-700">
                <span class="font-medium w-24 text-gray-500">Adresas:</span>
                <span>{{ employee.expand.office_id.name }}</span>
            </div>
            <div class="flex flex-row justify-start" v-if="hideButtons">
                <button><img src="../../../assets/icons/Edit button.png" alt="edit"></button>
                <button><img src="../../../assets/icons/Delete button.png" alt="edit"></button>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
const props = defineProps(['employee']);
import { getPhotoUrl } from '@/services/employeesService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
const employeePhotoUrl = computed(() => {
    if (props.employee && props.employee.id && props.employee.photo) {
        return getPhotoUrl(props.employee.id, props.employee.photo);
    }
    return '';
});
const hideEmail = ref(true);
const arrow = ref('▼');
const auth = useAuthenticationStore();
const toggleEmail = () => {
    hideEmail.value = !hideEmail.value
    arrow.value = hideEmail.value ? '▼' : '▲'
}
const hideButtons = computed(() => {
    if (auth.isLoggedIn && auth.user_permissions.edit_employees && auth.user_permissions.delete_employees) {
        return true
    }
    return false;
})
</script>