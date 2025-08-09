<template>
    <form class="flex flex-col justify-start p-2" @submit.prevent="onSubmit">
        <h2 class="p-2 mb-2 text-xl">Ar tikrai norite ištrinti ofisą?</h2>
        <div class="flex flex-col p-2 text-gray-500">
            <div class="flex gap-2">
                <span>Ofiso pavadinimas:</span>
                <span>{{ office.name }} </span>
            </div>
        </div>
        <div class="flex flex-row justify-end gap-5 mt-10 text-[#0054A6]">
            <a class="cursor-pointer uppercase hover:text-red-600" @click="emits('cancel-delete')">Ne</a>
            <button type="submit" class="cursor-pointer uppercase hover:text-sky-400">Taip</button>
        </div>
    </form>
</template>
<script setup lang="ts">
import { useEmployees } from '@/composables/useEmployees';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import { getCompaniesOffices } from '@/services/companiesOfficesService';
import { onMounted, ref } from 'vue';
const props = defineProps(['office']);
const auth = useAuthenticationStore();
const store = useNotificationStore();
const { employees, fetchRequest } = useEmployees();
const emits = defineEmits(['cancel-delete']);
const companiesOffices = ref();

const fetchCompaniesOffices = async (params?: string) => {
    const url = params ? `${params}` : '';
    try {
        const response = await getCompaniesOffices(url);

        if (response.items.length > 0) {
            const associatedCompanies = response.items[0].expand.company_id;
            companiesOffices.value = associatedCompanies;
        } else {
            companiesOffices.value = [];
        }
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}
const onSubmit = async () => {
    if (!auth.isLoggedIn && !auth.user_permissions.delete_offices) {
        store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
        return;
    }
    await fetchRequest(`&filter=office_id="${props.office.id}"`);
    if (employees.value.length > 0) {
        store.addErrorNotification('Šis ofisas turi priskirtus kontaktus');
        emits('cancel-delete');
        return;
    }
    await fetchCompaniesOffices(`?filter=office_id="${props.office.id}"&expand=company_id&fields=id,expand.company_id`);
    if (companiesOffices.value.length > 0) {
        store.addErrorNotification('Šis ofisas turi priskirtas įmonės');
        emits('cancel-delete');
        return;
    }
}
</script>