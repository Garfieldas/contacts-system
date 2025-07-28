<template>
    <nav class="bg-[#1F3F77] flex flex-row justify-between items-center p-6 text-white font-bold">
        <router-link class="contents" :to="{name: 'contacts'}">
        <img class="w-1/6" src="../../assets/icons/logotipas.png" alt="logotipas"/>
        </router-link>
        <router-link :to="{name: 'login'}" v-if="!store.isLoggedIn">
        <a href="#">Prisijungti</a>
        </router-link>
        <div class="flex flex-row justify-between w-full ml-20" v-if="store.isLoggedIn">
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
        <div class="icon w-1/2 flex flex-row justify-end" v-if="store.isLoggedIn">
            <img :src="UserPhotoUrl" alt="icon" v-if="UserPhotoUrl" class="w-10 bg-gray-100 rounded-full object-cover">
            <img src="../../assets/icons/male-icon.png" alt="icon" v-else>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { getAvatarUrl } from '@/services/authenticationService';
const store = useAuthenticationStore();
const UserPhotoUrl = computed(() => {
    if (store.user && store.user.id && store.user.avatar) {
        return getAvatarUrl(store.user.id, store.user.avatar);
    }
    return '';
});
</script>