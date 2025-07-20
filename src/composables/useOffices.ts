import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";
import { getCompaniesOffices } from "@/services/companiesOfficesService";

export const useOffices = () => {
    const offices = ref([]);
    const store = useNotificationStore();

    const fetchOffices = async (params? : string) => {
        const url = params? `${params}` : '';
        try {
            const response = await getCompaniesOffices(url);
            offices.value = response.items;
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }

    return {
        offices, fetchOffices
    }
}