<template>
    <div class="bg-white mt-10 px-20 mb-10">
    <form class="flex flex-col gap-10 p-10" @submit.prevent="onSubmit">
        <div class="flex flex-col p-10">
        <h1 class="text-5xl font-small">Slaptažodio pakeitimas</h1>
        </div>
        <div class="flex flex-col">
            <label for="password">Naujas slaptažodis:</label>
            <div class="relative"> <input class="bg-gray-200 p-3 w-full pr-10" :type="hidePassword ? 'password' : 'text'" id="password"
                 placeholder="&#xf023; Įveskite slaptažodį..." required
                 v-model="password"/>
                <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600">
                    <i :class="hidePassword ? 'fa fa-eye' : 'fa fa-eye-slash'" @click="showPassword"></i>
                </button>
            </div>
             <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>
        <div class="flex flex-col">
            <label for="password2">Pakartokite slaptažodį:</label>
            <div class="relative"> <input class="bg-gray-200 p-3 w-full pr-10" :type="hidePassword2 ? 'password' : 'text'" id="password2"
                 placeholder="&#xf023; Pakartokite slaptažodį..." required
                 v-model="password2"/>
                <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600">
                    <i :class="hidePassword2 ? 'fa fa-eye' : 'fa fa-eye-slash'" @click="showPassword2"></i>
                </button>
            </div>
             <div v-if="errors.password2" class="error-message">{{ errors.password2 }}</div>
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
import { ref } from 'vue';
import { updatePassword } from '@/services/authenticationService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import { useRouter } from 'vue-router';

const hidePassword = ref(true);
const hidePassword2 = ref(true);
const auth = useAuthenticationStore();
const store = useNotificationStore();
const router = useRouter();

const showPassword = () => {
    hidePassword.value = !hidePassword.value
}
const showPassword2 = () => {
    hidePassword2.value = !hidePassword2.value
}

const loginSchema = z.object({
    password: z.string()
        .trim()
        .min(8, 'Slaptažodis yra privalomas (8 simboliai)')
        .max(30, 'Slaptažodis negali viršyti 30 simbolių'),
    password2: z.string()
        .trim()
        .min(8, 'Slaptažodžio patvirtinimas privalomas')
        .max(30, 'Patvirtintas slaptažodis negali viršyti 30 simbolių')
}).refine((data) => data.password === data.password2, {
    message: 'Slaptažodžiai privalo sutapti!',
    path: ['password2']
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(loginSchema)
});

const [password] = defineField('password');
const [password2] = defineField('password2');

const onSubmit = handleSubmit(async (values) => {
    try {
        const response = await updatePassword(auth.user.id, values.password, values.password2);
        resetForm();
        store.addSuccessNotification('Slaptažodis sėkmingai pakeistas! Prašome prisijungti iš naujo');
        auth.Logout();
        router.replace({name: 'contacts'})
    }
    catch(error: any){
        store.addErrorNotification('Įvyko klaida');
    }
})

</script>