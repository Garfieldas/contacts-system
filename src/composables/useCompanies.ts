import { getCompanies } from "@/services/companiesService";
import { useNotificationStore } from "@/stores/notificationstore";
import { ref } from "vue";
import type { Company } from "@/types/companyType";

export const useCompanies = () => {
    const companies = ref<Company[]>([]);
    const store = useNotificationStore();
    const page = ref(1);
    const perPage = ref(25);
    const totalItems = ref();
    const totalPages = ref();

    const fetchCompanies = async (params?: string) => {
        let url = params? `?page=${page.value}&perPage=${perPage.value}${params}` : '';
        try {
            const response = await getCompanies(url);
            companies.value = response.items;
            totalItems.value = response.totalItems;
            totalPages.value = response.totalPages;
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }
    return {
        companies, fetchCompanies, page, perPage,
        totalItems, totalPages
    }
}