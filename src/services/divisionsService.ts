import { axiosInstance } from "./axiosService";

export const getDivisions = async (params?: string) => {
    const url = params? `/divisions/records${params}` : '/divisions/records';
    try {
        const response = await axiosInstance.get(url);
        const data = response.data;
        return data;
    }
    catch (error: any) {
        throw error;
    }
}

export const createDivision = async (name: string) => {
    try {
        const response = await axiosInstance.post('/divisions/records', { name });
        const data = response.data;
        return data;
    }
    catch (error: any) {
        throw error;
    }
}

export const updateDivision = async (id: string, name: string) => {
    try {
        await axiosInstance.patch(`/divisions/records/${id}`, { name });
    }
    catch (error: any) {
        throw error;
    }
}

export const deleteDivision = async (id: string) => {
    try {
        await axiosInstance.delete(`/divisions/records/${id}`);
    }
    catch (error: any) {
        throw error;
    }
}