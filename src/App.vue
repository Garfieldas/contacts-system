<template>
<NavBar v-if="!showNavBar"/>
<NotificationList />
<router-view>
</router-view>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import NavBar from './components/Layout/NavBar.vue';
import NotificationList from './components/Layout/Nofitications/NotificationList.vue';
import { useRoute } from 'vue-router';
import { useAuthenticationStore } from './stores/authenticationStore';
const route = useRoute();
const showNavBar = computed(() => {
    return route.meta.hideNavBar;
})
const auth = useAuthenticationStore();
onMounted(() => {
    auth.initializeAuth();
})
</script>