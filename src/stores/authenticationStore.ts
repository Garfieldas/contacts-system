import { defineStore } from "pinia";
import { ref } from "vue";

export const useAuthenticationStore = defineStore('auth', () => {
    const isLoggedIn = ref(!!localStorage.getItem('token'));
    const user = ref(JSON.parse(localStorage.getItem('user') || 'null'));

    const Login = (token: string, user: any) => {
        isLoggedIn.value = true;
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    const Logout = () => {
        isLoggedIn.value = false;
        localStorage.clear();
    }

    return { isLoggedIn, user, Login, Logout }
})