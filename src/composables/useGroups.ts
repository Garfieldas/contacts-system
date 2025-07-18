import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";
import { getDepartmentsGroups } from "@/services/departmentsGroupsService";

export const useGroups = () => {
    const groups = ref([]);
    const page = ref();
    const perPage = ref();
    const totalItems = ref();
    const totalPages = ref();
    const store = useNotificationStore();

    const fetchGroups = async (params? : string) => {
        const url = params? `${params}` : '';
        try {
            const response = await getDepartmentsGroups(url);
            groups.value = response.items;
            page.value = response.page;
            perPage.value = response.perPage;
            totalItems.value = response.totalItems;
            totalPages.value = response.totalPages;
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }

    return {
        groups, page, perPage,
        totalItems, totalPages, fetchGroups
    }
}