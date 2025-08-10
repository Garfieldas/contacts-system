import { axiosInstance } from "./axiosService";

export const getDepartments = async (params?:string) => {
    const url = params? `/departments/records${params}` : '/departments/records';
    try {
        const response = await axiosInstance.get(url);
        const data = response.data;
        return data;
    }
    catch(error: any){
        throw error;
    }
}

export const createDepartment = async (name: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.post('/departments/records', { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
        return response.data;
    }
    catch(error: any){
        throw error;
    }
}

export const updateDepartment = async (id: string, name: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.patch(`/departments/records/${id}`, { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
        return response.data;
    }
    catch(error: any){
        throw error;
    }
}

export const deleteDepartment = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.delete(`/departments/records/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        );
        return response.data;
    }
    catch(error: any){
        throw error;
    }
}