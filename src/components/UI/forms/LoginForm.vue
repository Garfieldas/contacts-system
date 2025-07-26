<template>
    <div class="bg-white mt-10 px-20 mb-10">
    <form class="flex flex-col gap-10 p-10">
        <div class="flex flex-col p-10">
        <h1 class="text-5xl font-small">Admin Prisijungimas:</h1>
        </div>
        <div class="flex flex-col">
            <label for="email">Elekotrinis paštas:</label>
            <input class="bg-gray-200 p-3 input-icon-email" type="email" id="email"
             placeholder="&#xf0e0; Įveskite el.pašto adresą..." required/>
        </div>
        <div class="flex flex-col">
            <label for="password">Slaptažodis:</label>
            <div class="relative"> <input class="bg-gray-200 p-3 input-icon-email w-full pr-10" :type="hidePassword ? 'password' : 'text'" id="password"
                 placeholder="&#xf023; Įveskite slaptažodį..." required/>
                <button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-600">
                    <i :class="hidePassword ? 'fa fa-eye' : 'fa fa-eye-slash'" @click="showPassword"></i>
                </button>
            </div>
        </div>
        <router-link :to="{name: 'password-reset'}" class="text-sky-700 font-small">
            Slaptažodžio atkūrimas
        </router-link>
        <div class="flex flex-col">
            <button class="bg-[#0054A6] text-white font-medium p-2.5 rounded-sm">Prisijungti</button>
        </div>
        <div class="py-40"></div>
    </form>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const hidePassword = ref(true);
const showPassword = () => {
    hidePassword.value = hidePassword.value ? false : true;
}
</script>