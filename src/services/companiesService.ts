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
    try {
        await axiosInstance.post('/companies/records', { name })
    }
    catch (error: any) {
        throw error;
    }
}

export const updatedCompany = async (id: string, name: string) => {
    try {
        await axiosInstance.patch(`/companies/records/${id}`, { name })
    }
    catch (error: any) {
        throw error;
    }
}

export const deleteCompany = async (id: string) => {
    try {
        await axiosInstance.delete(`/companies/records/${id}`)
    }
    catch (error: any) {
        throw error;
    }
}