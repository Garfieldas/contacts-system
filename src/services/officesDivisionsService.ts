import { axiosInstance } from "./axiosService";

export const getOfficessDivisions = async(params?: string) => {
    const url = params ? `/offices_divisions/records/${params}` : '/offices_divisions/records'
    try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    return data;
    }
    catch(error: any){
        throw error;
    }
}