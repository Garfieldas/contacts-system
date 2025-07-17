import { axiosInstance } from "./axiosService";

export const getCompaniesOffices = async(params?: string) => {
    const url = params ? `/companies_offices/records/${params}` : '/companies_offices/records'
    try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    return data;
    }
    catch(error: any){
        throw error;
    }
}