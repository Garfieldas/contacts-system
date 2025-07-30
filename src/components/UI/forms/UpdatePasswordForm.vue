<template>
    <div class="bg-white mt-10 px-20 mb-10">
    <form class="flex flex-col gap-10 p-10">
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

const hidePassword = ref(true);
const showPassword = () => {
    hidePassword.value = !hidePassword.value
}

const loginSchema = z.object({
    password: z.string()
        .trim()
        .min(8, 'Slaptažodis yra privalomas (8 simboliai)')
        .max(30, 'Slaptažodis negali viršyti 30 simbolių')
});

const { handleSubmit, defineField, errors, resetForm } = useForm({
    validationSchema: toTypedSchema(loginSchema)
});

const [password] = defineField('password');

</script>