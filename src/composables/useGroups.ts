import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";
import { getDepartmentsGroups } from "@/services/departmentsGroupsService";

export const useGroups = () => {
    const groups = ref([]);
    const store = useNotificationStore();

    const fetchGroups = async (params? : string) => {
        const url = params? `${params}` : '';
        try {
            const response = await getDepartmentsGroups(url);
            groups.value = response.items;
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }

    return {
        groups, fetchGroups
    }
}