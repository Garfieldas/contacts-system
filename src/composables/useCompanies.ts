import { getCompanies } from "@/services/companiesService";
import { useNotificationStore } from "@/stores/notificationstore";
import { ref, onMounted } from "vue";

export const useCompanies = () => {
    const companies = ref([]);
    const page = ref();
    const perPage = ref();
    const totalItems = ref();
    const totalPages = ref();
    const store = useNotificationStore();

    const fetchCompanies = async () => {
        try {
            const response = await getCompanies();
            companies.value = response.items;
            page.value = response.page;
            perPage.value = response.perPage;
            totalItems.value = response.totalItems;
            totalPages.value = response.totalPages;
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }
    onMounted(() => {
        fetchCompanies();
    })
    return {
        companies, page, perPage,
        totalItems, totalPages
    }
}