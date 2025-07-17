import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import type { Notification } from "@/types/notificationType";

export const useNotificationStore = defineStore('notifications', () => {
    const notifications = ref<Notification[]>([]);
    const _notifications = readonly(notifications);

    const addNotification = (message: string, type: string) => {
        const id = uuidv4();
        const notification = { id, message, type } as Notification;
        notifications.value.push(notification);
        setTimeout(() => {
            notifications.value = notifications.value.filter((item) => item.id !== id)
        }, 5000)
    }


    const addSuccessNotification = (message: string) => {
        addNotification(message, 'success');
    }

    const addErrorNotification = (message: string) => {
        addNotification(message, 'error');
    }

    const removeNotification = (id: string) => {
        notifications.value = notifications.value.filter((item) => item.id !== id);
    }

    return { _notifications, addSuccessNotification, addErrorNotification, removeNotification }
})