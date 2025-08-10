import { axiosInstance } from "./axiosService";

export const getGroups = async (params?: string) => {
    const url = params? `/groups/records${params}`: '/groups/records';
    try {
        const response = await axiosInstance.get(url);
        return response.data;
    }
    catch(error: any) {
        throw error;
    }
}

export const createGroup = async (name: string) => {
    try {
        const response = await axiosInstance.post('/groups/records', { name });
        return response.data;
    }
    catch(error: any) {
        throw error;
    }
}

export const updateGroup = async (id: string, name: string) => {
    try {
        await axiosInstance.patch(`/groups/records/${id}`, { name });
    }
    catch(error: any) {
        throw error;
    }
}

export const deleteGroup = async (id: string) => {
    try {
        await axiosInstance.delete(`/groups/records/${id}`);
    }
    catch(error: any) {
        throw error;
    }
}