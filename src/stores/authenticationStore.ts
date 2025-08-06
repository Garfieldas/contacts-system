import { getUserPermissions, refreshToken } from "@/services/authenticationService";
import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";

export const useAuthenticationStore = defineStore('auth', () => {
    const isLoggedIn = ref(!!localStorage.getItem('token'));
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));
    const user_permissions = ref();
    const router = useRouter();

    const fetchPermissions = async () => {
        if(!user.value) return;
        try {
            const response = await getUserPermissions(user.value.permissions_id);
            user_permissions.value = response;
        }
        catch(eror: any) {
            user_permissions.value = null;
        }
    }

    if (isLoggedIn && user) {
        refreshToken();
        fetchPermissions()
    }

    const Login = (token: string, userData: any) => {
        isLoggedIn.value = true;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userData));
        user.value = userData;
        fetchPermissions();
    }

    const Logout = () => {
        isLoggedIn.value = false;
        localStorage.clear();
        user_permissions.value = null;
        router.replace({name: 'contacts'})
    }

    return { isLoggedIn, user, Login, Logout, user_permissions }
})