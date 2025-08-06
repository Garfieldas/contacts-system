<template>
    <form class="flex flex-col justify-start p-2" @submit.prevent="onSubmit">
    <h2 class="p-2 mb-2 text-xl">Ar tikrai norite ištrinti įmonę?</h2>
    <div class="flex flex-col p-2 text-gray-500">
        <div class="flex gap-2">
            <span>Įmonės pavadinimas:</span>
            <span>{{ company.name }} </span>
        </div>
    </div>
    <div class="flex flex-row justify-end gap-5 mt-10 text-[#0054A6]">
        <a class="cursor-pointer uppercase hover:text-red-600" @click="emits('cancel-delete')">Ne</a>
        <button type="submit" class="cursor-pointer uppercase hover:text-sky-400">Taip</button>
    </div>
    </form>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import { deleteCompany } from '@/services/companiesService';
import { useEmployees } from '@/composables/useEmployees';
import { useOffices } from '@/composables/useOffices';
const props = defineProps(['company']);
const emits = defineEmits(['company-deleted', 'cancel-delete'])
const store = useNotificationStore();
const auth = useAuthenticationStore();
const { employees, fetchRequest, perPage } = useEmployees();
const { offices, fetchOffices } = useOffices();
perPage.value = '';

const onSubmit = async () => {
    if(!auth.isLoggedIn && !auth.user_permissions.delete_companies) {
        store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
        return;
    }

    await fetchRequest(`&filter=company_id="${props.company.id}"`);
    if (employees.value.length > 0) {
        store.addErrorNotification('Ši įmonė turi priskirtus kontaktus!');
        emits('cancel-delete')
        return;
    }
    
    await fetchOffices(`?filter=company_id="${props.company.id}"`);
    if (offices.value.length > 0) {
        store.addErrorNotification('Ši įmonė turi priskirtus ofisus!');
        emits('cancel-delete')
        return;
    }
    try {
        await deleteCompany(props.company.id);
        store.addSuccessNotification('Įmonė sėkmingai pašalinta!');
        emits('company-deleted');
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}
</script>