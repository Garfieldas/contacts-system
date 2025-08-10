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
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.post('/groups/records', { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch(error: any) {
        throw error;
    }
}

export const updateGroup = async (id: string, name: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.patch(`/groups/records/${id}`, { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    }
    catch(error: any) {
        throw error;
    }
}

export const deleteGroup = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
        await axiosInstance.patch(`/groups/records/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    catch(error: any) {
        throw error;
    }
}