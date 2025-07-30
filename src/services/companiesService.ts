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