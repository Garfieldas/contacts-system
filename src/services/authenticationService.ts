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

export const updatePassword = async (id: string, password: string, password2: string) => {
    const token = localStorage.getItem('token');
    try {
        await axiosInstance.patch(`/users/records/${id}`, {password, passwordConfirm: password2}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    catch (error: any){
        throw error;
    }
}

export const getUserPermissions = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.get(`/user_permissions/records/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const user_actions = {
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
        return user_actions;
    }
    catch (error: any){
        throw error;
    }
}