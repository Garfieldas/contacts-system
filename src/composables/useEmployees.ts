import { getEmployees } from "@/services/employeesService";
import { onMounted, ref, watch } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";

export const useEmployees = () => {
    const employees = ref([]);
    const page = ref(1);
    const perPage = ref(5);
    const totalItems = ref();
    const totalPages = ref();
    const store = useNotificationStore();
    const isFirstLoad = ref(false);
    
    const fetchRequest = async (params? : string) => {
        const url = params? `?page=${page.value}&perPage=${perPage.value}${params}` :`?page=${page.value}&perPage=${perPage.value}`;
        try {
            const response = await getEmployees(url);
            employees.value = response.items;
            page.value = response.page;
            perPage.value = response.perPage;
            totalItems.value = response.totalItems;
            totalPages.value = response.totalPages;
            if (isFirstLoad.value === false){
                store.addSuccessNotification('Employees fetched successfully!');
                isFirstLoad.value = true;
            }
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }
    onMounted(() => {
        fetchRequest('&expand=office_id');
    })

    watch(page, () => {
        fetchRequest('&expand=office_id');
    })

    return {
        employees, page, perPage,
        totalItems, totalPages, fetchRequest
    }
}