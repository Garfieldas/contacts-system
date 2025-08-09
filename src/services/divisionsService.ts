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
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.post('/divisions/records', { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        return data;
    }
    catch (error: any) {
        throw error;
    }
}

export const updateDivision = async (id: string, name: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.patch(`/divisions/records/${id}`, { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        const data = response.data;
        return data;
    }
    catch (error: any) {
        throw error;
    }
}

export const deleteDivision = async (id: string, name: string) => {
    const token = localStorage.getItem('token');
    try {
        await axiosInstance.delete(`/divisions/records/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    catch (error: any) {
        throw error;
    }
}