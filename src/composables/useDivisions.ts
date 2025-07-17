import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";
import { getOfficessDivisions } from "@/services/officesDivisionsService";

export const useDivisions = () => {
    const divisions = ref([]);
    const page = ref();
    const perPage = ref();
    const totalItems = ref();
    const totalPages = ref();
    const store = useNotificationStore();

    const fetchDivisions = async (params? : string) => {
        const url = params? `${params}` : '';
        try {
            const response = await getOfficessDivisions(url);
            divisions.value = response.items;
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
        divisions, page, perPage,
        totalItems, totalPages, fetchDivisions
    }
}