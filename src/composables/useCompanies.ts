import { getCompanies } from "@/services/companiesService";
import { useNotificationStore } from "@/stores/notificationstore";
import { ref } from "vue";
import type { Company } from "@/types/companyType";

export const useCompanies = () => {
    const companies = ref<Company[]>([]);
    const store = useNotificationStore();

    const fetchCompanies = async () => {
        try {
            const response = await getCompanies();
            companies.value = response.items;
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }
    return {
        companies, fetchCompanies
    }
}