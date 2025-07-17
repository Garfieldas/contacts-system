import { axiosInstance } from "./axiosService";

export const getGroups = async(params?: string) => {
    const url = params ? `/groups/records/${params}` : '/groups/records'
    try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    return data;
    }
    catch(error: any){
        throw error;
    }
}