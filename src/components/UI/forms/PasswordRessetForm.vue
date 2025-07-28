<template>
    <div class="bg-white mt-10 px-20 mb-10">
    <form class="flex flex-col gap-10 p-10" @submit.prevent="onSubmit">
        <div class="flex flex-col p-10">
        <h1 class="text-5xl font-small">Slaptažodio priminimas</h1>
        </div>
        <div class="flex flex-col">
            <label for="email">Elekotrinis paštas:</label>
            <input class="bg-gray-200 p-3 input-icon-email" 
            v-model="email"
             type="email" id="email"
             placeholder="&#xf0e0; Įveskite el.pašto adresą..."/>
            <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
        </div>
        <div class="flex flex-col">
            <button class="bg-[#0054A6] text-white font-medium p-2.5 rounded-sm">Siųsti</button>
        </div>
        <div class="py-10"></div>
    </form>
    </div>
</template>
<script setup lang="ts">
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { useNotificationStore } from '@/stores/notificationstore';
import { useRouter } from 'vue-router';
import { passwordResset } from '@/services/authenticationService';

const store = useNotificationStore();
const router = useRouter();

const loginSchema = z.object({
    email: z.string()
        .trim()
        .email('El.paštad privalo būti validus')
        .min(12, 'El.paštas privalomas (12 simbolių)')
        .max(30, 'El.paštas negali viršyti 30 simbolių')
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(loginSchema)
});

const [email] = defineField('email');

const onSubmit = handleSubmit(async (values) => {
    try {
        await passwordResset(values.email);
        store.addSuccessNotification('Laiškas išsiųstas!');
        resetForm();
        router.replace({name: 'login'});
    }
    catch(error: any){
        store.addErrorNotification(error);
    }
})

</script>