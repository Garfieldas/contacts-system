<template>
    <form class="flex flex-col justify-start p-2" @submit.prevent="onSubmit">
        <h2 class="p-2 mb-2 text-xl">Ar tikrai norite ištrinti padalinį?</h2>
        <div class="flex flex-col p-2 text-gray-500">
            <div class="flex gap-2">
                <span>Padalinio pavadinimas:</span>
                <span>{{ division.name }} </span>
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
import { useEmployees } from '@/composables/useEmployees';
import { getOfficessDivisions } from '@/services/officesDivisionsService';
import { ref } from 'vue';
import { deleteDivision } from '@/services/divisionsService';
const props = defineProps(['division']);
const auth = useAuthenticationStore();
const store = useNotificationStore();
const emits = defineEmits(['cancel-delete', 'division-submit']);
const { employees, fetchRequest } = useEmployees();
const officesDivisions = ref();

const fetchOfficesDivision = async (params?: string) => {
    const url = params ? `${params}` : '';
    try {
        const response = await getOfficessDivisions(url);
        if (response.items.length > 0) {
            officesDivisions.value = response.items[0].expand.office_id;
        }
        else {
            officesDivisions.value = [];
        }
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}

const onSubmit = async () => {
    if (!auth.isLoggedIn && !auth.user_permissions.delete_structure) {
        store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
        return;
    }
    await fetchRequest(`&filter=division_id="${props.division.id}"`);
    if (employees.value.length > 0) {
        store.addErrorNotification('Šis padalinys turi priskirtus kontaktus');
        emits('cancel-delete');
        return;
    }
    await fetchOfficesDivision(`?filter=division_id="${props.division.id}"&expand=office_id&fields=id,expand.office_id`);
    if (officesDivisions.value && officesDivisions.value.length > 0) {
        store.addErrorNotification('Šis padalinys turi priskirtus ofisus');
        emits('cancel-delete');
        return;
    }
    try {
        await deleteDivision(props.division.id);
        store.addSuccessNotification('Padalinys pašalintas sėkmingai!');
        emits('division-submit');
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}
</script>