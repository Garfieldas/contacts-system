<template>
    <form class="flex flex-col justify-start p-2" @submit.prevent="onSubmit">
        <h2 class="p-2 mb-2 text-xl">Ar tikrai norite ištrinti skyrių?</h2>
        <div class="flex flex-col p-2 text-gray-500">
            <div class="flex gap-2">
                <span>Skyriaus pavadinimas:</span>
                <span>{{ department.name }} </span>
            </div>
        </div>
        <div class="flex flex-row justify-end gap-5 mt-10 text-[#0054A6]">
            <a class="cursor-pointer uppercase hover:text-red-600" @click="emits('cancel-action')">Ne</a>
            <button type="submit" class="cursor-pointer uppercase hover:text-sky-400">Taip</button>
        </div>
    </form>
</template>
<script setup lang="ts">
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import { useEmployees } from '@/composables/useEmployees';
import { ref } from 'vue';
import { getDivisionsDepartments } from '@/services/divisionsDepartmentsService';
import { deleteDepartment } from '@/services/departmentsService';
const props = defineProps(['department']);
const auth = useAuthenticationStore();
const store = useNotificationStore();
const emits = defineEmits(['cancel-action', 'department-submit']);
const { employees, fetchRequest } = useEmployees();
const divisionsDepartment = ref();

const fetchDivisionsDepartment = async (params?: string) => {
    const url = params ? `${params}` : '';
    try {
        const response = await getDivisionsDepartments(url);
        if (response.items.length > 0) {
            divisionsDepartment.value = response.items[0].expand.division_id;
        }
        else {
            divisionsDepartment.value = [];
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
    await fetchRequest(`&filter=department_id="${props.department.id}"`);
    if (employees.value.length > 0) {
        store.addErrorNotification('Šis skyrius turi priskirtus kontaktus');
        emits('cancel-action');
        return;
    }
    await fetchDivisionsDepartment(`?filter=department_id="${props.department.id}"&expand=division_id&fields=id,expand.division_id`);
    if (divisionsDepartment.value && divisionsDepartment.value.length > 0) {
        store.addErrorNotification('Šis skyrius turi priskirtus padalinius');
        emits('cancel-action');
        return;
    }
    try {
        await deleteDepartment(props.department.id);
        store.addSuccessNotification('Padalinys sėkmingai ištrintas!');
        emits('department-submit');
    }
    catch(error: any) {
        store.addErrorNotification(error);
    }
}
</script>