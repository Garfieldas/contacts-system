<template>
    <form class="flex flex-col justify-start p-2" @submit.prevent="onSubmit">
        <h2 class="p-2 mb-2 text-xl">Ar tikrai norite ištrinti paskyrą?</h2>
        <div class="flex flex-col p-2 text-gray-500">
            <div class="flex gap-2">
                <span>Paskyros vardas:</span>
                <span>{{ user.name }} </span>
            </div>
        </div>
        <div class="flex flex-row justify-end gap-5 mt-10 text-[#0054A6]">
            <a class="cursor-pointer uppercase hover:text-red-600" @click="emits('cancel-action')">Ne</a>
            <button type="submit" class="cursor-pointer uppercase hover:text-sky-400">Taip</button>
        </div>
    </form>
</template>
<script setup lang="ts">
import { deleteUser, deleteUserPermissions } from '@/services/usersService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
const props = defineProps(['user']);
const store = useNotificationStore();
const auth = useAuthenticationStore();
const emits = defineEmits(['user-submit', 'cancel-action']);

const onSubmit = async () => {
  if (!auth.isLoggedIn && !auth.user_permissions.delete_permissions) {
    store.addErrorNotification("Nepakanka teisių šiai operacijai atlikti.");
    return;
  }
    try {
        await deleteUser(props.user.id);
        await deleteUserPermissions(props.user.permissions_id);
        store.addSuccessNotification('Paskyra sėkmingai pašalinta!');
        emits('user-submit');
    }
    catch(error: any) {
        store.addErrorNotification(error);
    }
}
</script>