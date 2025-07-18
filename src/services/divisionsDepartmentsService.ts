import { axiosInstance } from "./axiosService";

export const getDivisionsDepartments = async (params?: string) => {
    const url = params ? `/divisions_departments/records${params}` : '/divisions_departments/records'
    try {
        const response = await axiosInstance.get(url);
        const data = response.data
        return data;
    }
    catch(error: any){
        throw error;
    }
}