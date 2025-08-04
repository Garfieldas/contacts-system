<template>
    <form class="flex flex-col justify-start" @submit.prevent="onSubmit">
    <h2 class="p-2 mb-2">Ar tikrai norite ištrinti kontaktą?</h2>
    <div class="flex flex-col p-2 text-gray-500">
        <div class="flex gap-2">
            <span>Vardas ir Pavardė:</span>
            <span>{{ employee.name }} {{ employee.surname }}</span>
        </div>
        <div class="flex gap-2">
            <span>Pozicija:</span>
            <span>{{ employee.position }}</span>
        </div>
    </div>
    <div class="flex flex-row justify-end gap-5 mt-10 text-[#0054A6]">
        <a class="cursor-pointer uppercase hover:text-red-600" @click="emits('cancel-delete')">Ne</a>
        <button type="submit" class="cursor-pointer uppercase hover:text-sky-400">Taip</button>
    </div>
    </form>
</template>
<script setup lang="ts">
import { deleteEmployee } from '@/services/employeesService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
const props = defineProps(['employee']);
const emits = defineEmits(['employee-deleted', 'cancel-delete'])
const store = useNotificationStore();
const auth = useAuthenticationStore();
const onSubmit = async () => {
  if (!auth.isLoggedIn && !auth.user_permissions.delete_employees) {
    store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
    return;
  }
    try {
        await deleteEmployee(props.employee.id);
        store.addSuccessNotification('Kontaktas sėkmingai pašalintas!');
        emits('employee-deleted');
    }
    catch (error: any) {
        store.addErrorNotification(error);
    }
}
</script>