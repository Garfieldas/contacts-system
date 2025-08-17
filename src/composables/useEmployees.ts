import { getEmployees } from "@/services/employeesService";
import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";

export const useEmployees = () => {
    const employees = ref([]);
    const page = ref(1);
    const perPage = ref<Number | String | null>(25);
    const totalItems = ref();
    const totalPages = ref();
    const store = useNotificationStore();
    const isLoading = ref(true);
    
    const fetchRequest = async (params? : string) => {
        let url = params? `?page=${page.value}&perPage=${perPage.value}${params}` :`?page=${page.value}&perPage=${perPage.value}`;
        isLoading.value = true;
        try {
            const response = await getEmployees(url);
            employees.value = response.items;
            totalItems.value = response.totalItems;
            totalPages.value = response.totalPages;
            return true;
        }
        catch (error: any) {
            store.addErrorNotification(error);
            return false;
        }
        finally {
            isLoading.value = false;
        }
    }
    return {
        employees, page, perPage,
        totalItems, totalPages, fetchRequest,
        isLoading
    }
}