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

export const createUserPermissions = async (permissions: string[]) => {
    console.log(permissions)
    try {
        const response = await axiosInstance.post('/user_permissions/records', permissions);
        return response.data;
    }
    catch (error: any) {
        throw error;
    }
}