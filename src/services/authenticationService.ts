import { axiosInstance } from "./axiosService";
import { useAuthenticationStore } from "@/stores/authenticationStore";

export const login = async (email: string, password: string) => {
    const user = { identity: email, password };
    try {
        const response = await axiosInstance.post('/users/auth-with-password', user);
        const data = response.data.record;
        const token = response.data.token
        return { userInfo: data, token };
    }
    catch (error: any) {
        throw error;
    }
}

export const passwordResset = async (email: string) => {
    try {
        await axiosInstance.post('/users/request-password-reset', {email});
    }
    catch (error: any){
        throw error;
    }
}

export const refreshToken = async () => {
    const token = localStorage.getItem('token');
    const store = useAuthenticationStore();
    try {
        const response = await axiosInstance.post('/users/auth-refresh', {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const data = response.data.record;
        const newToken = response.data.token
        store.Login(newToken, data);
    }
    catch (error: any) {
        throw error;
    }
}

export const getAvatarUrl = (recordId: string, filename: string) => {
    const baseUrl = import.meta.env.VITE_FILE_URL
    let url = `${baseUrl}/_pb_users_auth_/${recordId}/${filename}`;
    return url;
}