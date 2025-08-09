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
const props = defineProps(['division']);
const auth = useAuthenticationStore();
const store = useNotificationStore();
const emits = defineEmits(['cancel-delete', 'office-submit']);

const onSubmit = async () => {
    if (!auth.isLoggedIn && !auth.user_permissions.delete_structure) {
        store.addErrorNotification('Nepakanka teisių šiai operacijai atlikti.');
        return;
    }
}
</script>