<template>
    <form class="flex flex-col justify-start p-2">
    <h2 class="p-2 mb-2 text-xl">Ar tikrai norite ištrinti įmonę?</h2>
    <div class="flex flex-col p-2 text-gray-500">
        <div class="flex gap-2">
            <span>Įmonės pavadinimas</span>
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
const props = defineProps(['company']);
const emits = defineEmits(['company-deleted', 'cancel-delete'])
const store = useNotificationStore();
const auth = useAuthenticationStore();
</script>