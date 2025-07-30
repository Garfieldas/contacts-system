import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";
import { getDivisionsDepartments } from "@/services/divisionsDepartmentsService";

export const useDepartments = () => {
    const departments = ref([]);
    const store = useNotificationStore();

    const fetchDepartments = async (params? : string) => {
        const url = params? `${params}` : '';
        try {
            const response = await getDivisionsDepartments(url);
            departments.value = response.items;
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }

    return {
        departments, fetchDepartments
    }
}