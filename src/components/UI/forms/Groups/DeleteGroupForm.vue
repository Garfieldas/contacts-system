<template>
    <form class="flex flex-col justify-start p-2" @submit.prevent="onSubmit">
        <h2 class="p-2 mb-2 text-xl">Ar tikrai norite ištrinti grupę?</h2>
        <div class="flex flex-col p-2 text-gray-500">
            <div class="flex gap-2">
                <span>Grupės pavadinimas:</span>
                <span>{{ group.name }} </span>
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
import { getDepartmentsGroups } from '@/services/departmentsGroupsService';
import { deleteGroup } from '@/services/groupsService';
const props = defineProps(['group']);
const auth = useAuthenticationStore();
const store = useNotificationStore();
const emits = defineEmits(['cancel-action', 'group-submit']);
const { employees, fetchRequest } = useEmployees();
const departmentsGroup = ref();

const fetchDepartmensGroup = async (params?: string) => {
    const url = params ? `${params}` : '';
    try {
        const response = await getDepartmentsGroups(url);
        if (response.items.length > 0) {
            departmentsGroup.value = response.items[0].expand.department_id;
        }
        else {
            departmentsGroup.value = [];
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
    await fetchRequest(`&filter=group_id="${props.group.id}"`);
    if (employees.value.length > 0) {
        store.addErrorNotification('Šį grupė turi priskirtus kontaktus');
        emits('cancel-action');
        return;
    }
    await fetchDepartmensGroup(`?filter=group_id="${props.group.id}"&expand=department_id&fields=id,expand.department_id`);
    if (departmentsGroup.value && departmentsGroup.value.length > 0) {
        store.addErrorNotification('Ši grupė turi priskirtus skyrius');
        emits('cancel-action');
        return;
    }
    try {
        await deleteGroup(props.group.id);
        store.addSuccessNotification('Grupė pašalinta sėkmingai!');
        emits('group-submit');
    }
    catch(error: any){
        store.addErrorNotification(error);
    }
}
</script>