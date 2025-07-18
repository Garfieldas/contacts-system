import { axiosInstance } from "./axiosService";

export const getDepartmentsGroups = async (params?: string) => {
    const url = params ? `/departments_groups/records${params}` : '/departments_groups/records'
    try {
        const response = await axiosInstance.get(url);
        const data = response.data
        return data;
    }
    catch(error: any){
        throw error;
    }
}