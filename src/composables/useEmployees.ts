import { getEmployees } from "@/services/employeesService";
import { onMounted, ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";

export const useEmployees = () => {
    const employees = ref([]);
    const page = ref();
    const perPage = ref();
    const totalItems = ref();
    const totalPages = ref();
    const store = useNotificationStore();
    
    const fetchRequest = async () => {
        try {
            const response = await getEmployees();
            employees.value = response.items;
            page.value = response.page;
            perPage.value = response.perPage;
            totalItems.value = response.totalItems;
            totalPages.value = response.totalPages;
            store.addSuccessNotification('Items fetched successfully!');
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }
    onMounted(() => {
        fetchRequest();
    })

    return {
        employees, page, perPage,
        totalItems, totalPages
    }
}