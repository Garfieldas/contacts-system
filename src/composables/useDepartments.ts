import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";
import { getDivisionsDepartments } from "@/services/divisionsDepartmentsService";

export const useDepartments = () => {
    const departments = ref([]);
    const page = ref();
    const perPage = ref();
    const totalItems = ref();
    const totalPages = ref();
    const store = useNotificationStore();

    const fetchDepartments = async (params? : string) => {
        const url = params? `${params}` : '';
        try {
            const response = await getDivisionsDepartments(url);
            departments.value = response.items;
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
        departments, page, perPage,
        totalItems, totalPages, fetchDepartments
    }
}