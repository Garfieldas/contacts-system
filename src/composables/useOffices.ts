import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";
import { getCompaniesOffices } from "@/services/companiesOfficesService";

export const useOffices = () => {
    const offices = ref([]);
    const page = ref();
    const perPage = ref();
    const totalItems = ref();
    const totalPages = ref();
    const store = useNotificationStore();

    const fetchOffices = async (params? : string) => {
        const url = params? `${params}` : '';
        try {
            const response = await getCompaniesOffices(url);
            offices.value = response.items;
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
        offices, page, perPage,
        totalItems, totalPages, fetchOffices
    }
}