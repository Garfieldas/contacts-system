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
        await axiosInstance.post('/offices/records', newOffice, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch(error: any){
        throw error;
    }
}