import { ref } from "vue";
import { useNotificationStore } from "@/stores/notificationstore";
import { getOfficessDivisions } from "@/services/officesDivisionsService";

export const useDivisions = () => {
    const divisions = ref([]);
    const store = useNotificationStore();

    const fetchDivisions = async (params? : string) => {
        const url = params? `${params}` : '';
        try {
            const response = await getOfficessDivisions(url);
            divisions.value = response.items;
        }
        catch (error: any) {
            store.addErrorNotification(error);
        }
    }

    return {
        divisions, fetchDivisions
    }
}