<template>
    <div class="bg-white mt-10 px-20 mb-10">
    <form class="flex flex-col gap-10 p-10" @submit.prevent="onSubmit">
        <div class="flex flex-col p-10">
        <h1 class="text-5xl font-small">Admin Prisijungimas:</h1>
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
            <label for="password">Slaptažodis:</label>
            <div class="relative"> <input class="bg-gray-200 p-3 input-icon-email w-full pr-10" :type="hidePassword ? 'password' : 'text'" id="password"
                 placeholder="&#xf023; Įveskite slaptažodį..." required
                 v-model="password"/>
                <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600">
                    <i :class="hidePassword ? 'fa fa-eye' : 'fa fa-eye-slash'" @click="showPassword"></i>
                </button>
            </div>
             <div v-if="errors.password" class="error-message">{{ errors.password }}</div>
        </div>
        <router-link :to="{name: 'password-reset'}" class="text-sky-700 font-small">
            Slaptažodžio atkūrimas
        </router-link>
        <div class="flex flex-col">
            <button class="bg-[#0054A6] text-white font-medium p-2.5 rounded-sm">Prisijungti</button>
        </div>
        <div class="py-10"></div>
    </form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useForm } from 'vee-validate';
import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';
import { login } from '@/services/authenticationService';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { useNotificationStore } from '@/stores/notificationstore';
import { useRouter } from 'vue-router';

const hidePassword = ref(true);
const showPassword = () => {
    hidePassword.value = hidePassword.value ? false : true;
}
const auth = useAuthenticationStore();
const store = useNotificationStore();
const router = useRouter();

const loginSchema = z.object({
    email: z.string()
        .trim()
        .email('El.paštad privalo būti validus')
        .min(12, 'El.paštas privalomas (12 simbolių)')
        .max(30, 'El.paštas negali viršyti 30 simbolių'),
    password: z.string()
        .trim()
        .min(4, 'Slaptažodis privalomas (4 simboliai)')
        .max(30, 'Slaptažodis privalo neviršyti 30 simbolių')
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(loginSchema)
});

const [email] = defineField('email');
const [password] = defineField('password');

const onSubmit = handleSubmit(async (values) => {
    try {
        const response = await login(values.email, values.password);
        const token = response.token
        const data = response.data;
        auth.Login(token, data);
        store.addSuccessNotification('Prisijungimas sėkmingas!');
        resetForm();
        router.replace({name: 'contacts'});
    }
    catch(error: any){
        store.addErrorNotification(error);
    }
})

</script>