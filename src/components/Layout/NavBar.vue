<template>
    <nav class="bg-[#1F3F77] flex flex-row justify-between items-center p-6 text-white font-bold">
        <router-link class="contents" :to="{name: 'contacts'}">
        <img class="w-1/6" src="../../assets/icons/logotipas.png" alt="logotipas"/>
        </router-link>
        <router-link :to="{name: 'login'}" v-if="!isAuth">
        <a href="#">Prisijungti</a>
        </router-link>
        <div class="flex flex-row justify-between w-full ml-20" v-if="isAuth">
        <router-link :to="{name: 'contacts'}">
        <a href="#">Kontaktai</a>
        </router-link>
        <router-link :to="{name: 'companies-management'}">
        <a href="#">Įmonės</a>
        </router-link>
        <router-link :to="{name: 'company-structure'}">
        <a href="#">Struktūra</a>
        </router-link>
        <router-link :to="{name: 'admin'}">
        <a href="#">Paskyros</a>
        </router-link>
        </div>
        <div class="icon w-1/2 flex flex-row justify-end" v-if="isAuth">
            <img src="../../assets/icons/male-icon.png" alt="icon">
        </div>
    </nav>
</template>
<script setup lang="ts">
import { ref } from 'vue';
const isAuth = ref(false);
</script>