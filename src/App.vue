<template>
<NavBar v-if="!showNavBar"/>
<NotificationList />
<router-view>
</router-view>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import NavBar from './components/Layout/NavBar.vue';
import NotificationList from './components/Layout/Nofitications/NotificationList.vue';
import { useRoute } from 'vue-router';
const route = useRoute();
const showNavBar = computed(() => {
    return route.meta.hideNavBar;
})
</script>