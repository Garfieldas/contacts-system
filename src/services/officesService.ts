import { axiosInstance } from "./axiosService";

export const getOffices = async(params?:string) => {
    const url = params? `/offices/records${params}` : '/offices/records';
    try {
        const response = await axiosInstance.get(url);
        const data = response.data;
        return data;
    }
    catch(error: any) {
        throw error;
    }
}

export const createOffice = async (
    name: string,
    street: string,
    street_number: string,
    city: string,
    country: string
) => {
    const token = localStorage.getItem('token');
    const newOffice = { name, street, street_number, city, country }
    try {
        const response = await axiosInstance.post('/offices/records', newOffice, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
    catch(error: any){
        throw error;
    }
}

export const updateOffice = async (
    id: string,
    name: string,
    street: string,
    street_number: string,
    city: string,
    country: string
) => {
    const token = localStorage.getItem('token');
    const newOffice = { name, street, street_number, city, country }
    try {
        const response = await axiosInstance.patch(`/offices/records/${id}`, newOffice, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
    catch(error: any){
        throw error;
    }
}

export const deleteOffice = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
        const response = await axiosInstance.delete(`/offices/records/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    }
    catch(error: any){
        throw error;
    }
}