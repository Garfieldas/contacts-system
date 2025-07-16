import { defineStore } from "pinia";
import { ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import type { Notification } from "@/types/notificationType";

export const useNotificationStore = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([]);

    const addNotification = (notification:Notification) => {
        const id = uuidv4();
        notification = {...notification, id};
        notifications.value.push(notification)
        setTimeout(() => {
            notifications.value = notifications.value.filter((item) => item.id !== id);
        }, 3000)
    }
    const removeNotification = (id: string) => {
        notifications.value = notifications.value.filter((item) => item.id !== id);
    }
    return { notifications, addNotification, removeNotification }
})