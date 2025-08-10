import { axiosInstance } from "./axiosService";

export const getUsers = async(params?: string) => {
    const url = params? `/users/records${params}` : '/users/records'
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    }
    catch(error: any) {
        throw error;
    }
}