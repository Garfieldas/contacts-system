import { getUserPermissions } from "@/services/authenticationService";
import { ref } from "vue";
import { useAuthenticationStore } from "@/stores/authenticationStore";

export const useUserPermissions = () => {
    const user_permissions = ref();
    const auth = useAuthenticationStore();
    const fetchPermissions = async () => {
        const response = await getUserPermissions(auth.user.permissions_id);
        user_permissions.value = {
            delete_companies: response.data.delete_companies,
            delete_employees: response.data.delete_employees,
            delete_offices: response.data.delete_offices,
            delete_permissions: response.data.delete_permissions,
            delete_structure: response.data.delete_structure,
            edit_companies: response.data.edit_companies,
            edit_employees: response.data.edit_employees,
            edit_offices: response.data.edit_offices,
            edit_permissions: response.data.edit_permissions,
            edit_structure: response.data.edit_structure,
        }
    }
    return { fetchPermissions, user_permissions };
}