<template>
    <nav class="bg-[#1F3F77] flex flex-row justify-between items-center p-6 text-white font-bold">
        <router-link class="contents" :to="{name: 'contacts'}">
        <img class="w-1/6" src="../../assets/icons/logotipas.png" alt="logotipas"/>
        </router-link>
        <router-link :to="{name: 'login'}" v-if="!hideLinks">
        <a href="#">Prisijungti</a>
        </router-link>
        <div class="flex flex-row justify-between w-full ml-20" v-if="hideLinks">
        <router-link :to="{name: 'contacts'}">
        <a href="#">Kontaktai</a>
        </router-link>
        <router-link :to="{name: 'companies-management'}">
        <a href="#">Įmonės</a>
        </router-link>
        <router-link :to="{name: 'company-structure'}">
        <a href="#">Struktūra</a>
        </router-link>
        <router-link :to="{name: 'admin'}" v-if="hideAdminPage">
        <a href="#">Paskyros</a>
        </router-link>
        </div>
        <div class="icon w-1/2 flex flex-row justify-end relative" v-if="store.isLoggedIn">
            <img :src="UserPhotoUrl" alt="icon" v-if="UserPhotoUrl" class="w-10 bg-gray-100 rounded-full object-cover" @click="toggleDropDown">
            <img src="../../assets/icons/male-icon.png" alt="icon" v-else @click="toggleDropDown">
    <div class="absolute top-18 left-83 mt-3 bg-white rounded-md shadow-lg min-w-[180px] py-2 z-10 font-normal text-black" :class="{'hidden': hideDropDown}">
        <router-link :to="{name: 'change-user-password'}">
        <a class="relative block px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap group" href="#">
            Pakeisti slaptažodį
            <span class="absolute right-4 top-1/2 -translate-y-1/2 text-xs">▼</span>
        </a>
        </router-link>
        <a class="block px-4 py-2 text-sm hover:bg-gray-100 whitespace-nowrap" @click="Logout">
            Atsijungti
        </a>
    </div>
        </div>
    </nav>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue';
import { useAuthenticationStore } from '@/stores/authenticationStore';
import { getAvatarUrl } from '@/services/authenticationService';
import { useNotificationStore } from '@/stores/notificationstore';
const store = useAuthenticationStore();
const notify = useNotificationStore();
const UserPhotoUrl = computed(() => {
    if (store.user && store.user.id && store.user.avatar) {
        return getAvatarUrl(store.user.id, store.user.avatar);
    }
    return '';
});
const hideDropDown = ref(true);
const toggleDropDown = () => {
    hideDropDown.value = hideDropDown.value ? false : true
}

const hideLinks = computed(() => {
    if (store.isLoggedIn) {
        return true;
    }
    return false;
});

const hideAdminPage = computed(() => {
    if (store.isLoggedIn && store.user_permissions && store.user_permissions.edit_permissions && store.user_permissions.delete_permissions) {
        return true;
    }
    return false;
});
const Logout = () => {
    store.Logout();
    notify.addSuccessNotification('Jūs sėkmingai atsijungėte nuo savo paskyros.')
}
</script>