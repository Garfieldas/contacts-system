import { getCompanies } from "@/services/companiesService";
import { useNotificationStore } from "@/stores/notificationstore";
import { ref } from "vue";

export const useCompanies = () => {
    const companies = ref([]);
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