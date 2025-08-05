import { axiosInstance } from "./axiosService";

export const getCompanies = async(params?: string) => {
    const url = params ? `/companies/records/${params}` : '/companies/records'
    try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    return data;
    }
    catch(error: any){
        throw error;
    }
}

export const createCompany = async (name: string) => {
    const token = localStorage.getItem('token');
    try {
        await axiosInstance.post('/companies/records', { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch (error: any) {
        throw error;
    }
}

export const updatedCompany = async (id: string, name: string) => {
    const token = localStorage.getItem('token');
    try {
        await axiosInstance.patch(`/companies/records/${id}`, { name }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch (error: any) {
        throw error;
    }
}

export const deleteCompany = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
        await axiosInstance.delete(`/companies/records/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch (error: any) {
        throw error;
    }
}