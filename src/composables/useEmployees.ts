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
    const isFirstLoad = ref(false);
    
    const fetchRequest = async (params? : string) => {
        let url = params? `?page=${page.value}&perPage=${perPage.value}${params}` :`?page=${page.value}&perPage=${perPage.value}`;
        try {
            const response = await getEmployees(url);
            employees.value = response.items;
            totalItems.value = response.totalItems;
            totalPages.value = response.totalPages;
            if (isFirstLoad.value === false){
                store.addSuccessNotification('Kontaktai gauti sėkmingai!');
                isFirstLoad.value = true;
            }
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }
    return {
        employees, page, perPage,
        totalItems, totalPages, fetchRequest
    }
}