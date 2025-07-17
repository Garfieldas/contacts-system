import { axiosInstance } from "./axiosService";

export const getDepartments = async(params?: string) => {
    const url = params ? `/departmens/records/${params}` : '/departments/records'
    try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    return data;
    }
    catch(error: any){
        throw error;
    }
}