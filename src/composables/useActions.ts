import { useAuthenticationStore } from "@/stores/authenticationStore";
import { computed } from "vue";

export const useActions = () => {
    const auth = useAuthenticationStore();

    const showEditContacts = computed(() => {
        if(auth.isLoggedIn && auth.user_permissions.edit_employees) {
            return true;
        }
        return false;
    })

    const showDeleteContacts = computed(() => {
        if(auth.isLoggedIn && auth.user_permissions.delete_employees) {
            return true;
        }
        return false;
    })

    const showEditCompanies = computed(() => {
        if(auth.isLoggedIn && auth.user_permissions.edit_companies) {
            return true;
        }
        return false;
    })

    const showDeleteCompanies = computed(() => {
        if(auth.isLoggedIn && auth.user_permissions.delete_companies) {
            return true;
        }
        return false;
    })

    const showEditOffices = computed(() => {
        if (auth.isLoggedIn && auth.user_permissions.edit_offices) {
            return true;
        }
        return false;
    })

    const showDeleteOffices = computed(() => {
        if (auth.isLoggedIn && auth.user_permissions.delete_offices) {
            return true;
        }
        return false;
    })

    const showEditStructures = computed(() => {
        if (auth.isLoggedIn && auth.user_permissions.edit_structure) {
            return true;
        }
        return false;
    })

    const showDeleteStructure = computed(() => {
        if (auth.isLoggedIn && auth.user_permissions.delete_structure) {
            return true;
        }
        return false;
    })

    return {
        showEditContacts, showDeleteContacts,
        showEditCompanies, showDeleteCompanies,
        showEditOffices, showDeleteOffices,
        showEditStructures, showDeleteStructure
    }
}