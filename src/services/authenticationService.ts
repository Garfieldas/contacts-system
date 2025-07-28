import { axiosInstance } from "./axiosService";
import { useAuthenticationStore } from "@/stores/authenticationStore";

export const login = async (email: string, password: string) => {
    const user = { identity: email, password };
    try {
        const response = await axiosInstance.post('/users/auth-with-password', user);
        const data = response.data.record;
        const userInfo = {
            user: data.name, email: data.email,
            name: data.name, avatar: data.avatar,
            permissions: data.permissions_id
        };
        const token = response.data.token
        return { userInfo, token };
    }
    catch (error: any) {
        throw error;
    }
}

export const passwordResset = async (email: string) => {
    try {
        const response = await axiosInstance.post('/users/request-password-reset', {email});
        console.log(response);
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
        const userInfo = {
            user: data.name, email: data.email,
            name: data.name, avatar: data.avatar,
            permissions: data.permissions_id
        };
        const newToken = response.data.token
        store.Login(newToken, userInfo);
    }
    catch (error: any) {
        throw error;
    }
}