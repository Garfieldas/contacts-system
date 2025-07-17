import { axiosInstance } from "./axiosService";

export const getDivisions = async(params?: string) => {
    const url = params ? `/divisions/records/${params}` : '/divisions/records'
    try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    return data;
    }
    catch(error: any){
        throw error;
    }
}