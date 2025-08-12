import { axiosInstance } from "./axiosService";

export const getUsers = async (params?: string) => {
    const url = params ? `/users/records${params}` : '/users/records'
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    }
    catch (error: any) {
        throw error;
    }
}

export const createUser = async (name: string, email: string, permissions_id?: string, avatar?: File) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    const chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const passwordLength = 12;
    let password = "";
    let passwordConfirm ="";
    for (let i = 0; i <= passwordLength; i++) {
        let randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber +1);
    }
    passwordConfirm = password;
    formData.append("password", password);
    formData.append("passwordConfirm", passwordConfirm);
    if (permissions_id) formData.append("permissions_id", permissions_id);
    if (avatar) formData.append("avatar", avatar);
    try {
        await axiosInstance.post("/users/records", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error: any) {
        throw error;
    }
};

export const updateUser = async (id: string, name: string, email: string, avatar?: File) => {
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (avatar) formData.append("avatar", avatar);
    try {
        await axiosInstance.patch(`/users/records/${id}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
    } catch (error: any) {
        throw error;
    }
};

export const deleteUser = async (id: string) => {
    try {
        await axiosInstance.delete(`/users/records/${id}`);
    } catch (error: any) {
        throw error;
    }
};

export const createUserPermissions = async (permissions: string[]) => {
    try {
        const response = await axiosInstance.post('/user_permissions/records', permissions);
        return response.data;
    }
    catch (error: any) {
        throw error;
    }
}

export const updateUserPermissions = async (id: string, permissions: string[]) => {
    try {
        await axiosInstance.patch(`/user_permissions/records/${id}`, permissions);
    }
    catch (error: any) {
        throw error;
    }
}

export const deleteUserPermissions = async (id: string) => {
    try {
        await axiosInstance.delete(`/user_permissions/records/${id}`);
    }
    catch (error: any) {
        throw error;
    }
}