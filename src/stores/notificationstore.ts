import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import type { Notification } from "@/types/notificationType";

export const useNotificationStore = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([]);
    const _notifications = readonly(notifications);

    const addSuccessNotification = (message: string) => {
        const id = uuidv4();
        const type = 'success';
        const notification = {id, type, message} as Notification;
        notifications.value.push(notification)
        setTimeout(() => {
            notifications.value = notifications.value.filter((item) => item.id !== id);
        }, 3000)
    }

    const addErrorNotification = (message: string) => {
        const id = uuidv4();
        const type = 'error';
        const notification = {id, type, message} as Notification;
        notifications.value.push(notification);
        setTimeout(() => {
            notifications.value = notifications.value.filter((item) => item.id !== id);
        }, 3000)
    }

    const removeNotification = (id: string) => {
        notifications.value = notifications.value.filter((item) => item.id !== id);
    }
    
    return { _notifications, addSuccessNotification, addErrorNotification, removeNotification }
})