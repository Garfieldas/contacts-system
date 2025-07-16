<template>
    <div class="fixed top-25 right-5 flex flex-col gap-4 m-auto w-80">
        <Notification v-for="notification in store.notifications" :key="notification.id"
        :notification="notification"
        @remove-message="selectId"/>
    </div>
</template>
<script setup lang="ts">
import Notification from './Notification.vue';
import { useNotificationStore } from '@/stores/notificationstore';
const store = useNotificationStore();
const selectId = (id: string) => store.removeNotification(id);
</script>