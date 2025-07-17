<template>
<NavBar />
<NotificationList />
<router-view>
</router-view>
</template>

<script setup lang="ts">
import NavBar from './components/Layout/NavBar.vue';
import NotificationList from './components/Layout/Nofitications/NotificationList.vue';
</script>