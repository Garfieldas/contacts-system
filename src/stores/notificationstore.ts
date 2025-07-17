import { defineStore } from "pinia";
import { readonly, ref } from "vue";
import { v4 as uuidv4 } from 'uuid';
import type { Notification } from "@/types/notificationType";

export const useNotificationStore = defineStore('notifications', () => {
  const notifications = ref<Notification[]>([]);
  const _notifications = readonly(notifications);
  let removalInterval: ReturnType<typeof setInterval> | null = null;
  const delay = 5000;

  const startRemoval = () => {
    if(removalInterval) return;

    removalInterval = setInterval(() => {
      if(notifications.value.length > 0) {
        const oldestNotification = notifications.value[0];
        removeNotification(oldestNotification.id!);
      }
      else {
        stopRemoveInterval();
      }
    }, delay)
  };

  const stopRemoveInterval = () => {
    if(removalInterval){
      clearInterval(removalInterval);
      removalInterval = null;
    }
  }

  const addNotification = (message: string, type: string) => {
    const id = uuidv4();
    const notification = { id, message, type } as Notification;
    notifications.value.push(notification);
    if(notifications.value.length === 1){
      startRemoval();
    }
  };

  const addSuccessNotification = (message: string) => {
    addNotification(message, "success");
  };

  const addErrorNotification = (message: string) => {
    addNotification(message, "error");
  };

  const removeNotification = (id: string) => {
    notifications.value = notifications.value.filter((item) => item.id !== id);
    if(notifications.value.length === 0){
      stopRemoveInterval();
    }
  };

  return {
    _notifications,
    addSuccessNotification,
    addErrorNotification,
    removeNotification,
  };
});
