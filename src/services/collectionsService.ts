import { axiosInstance } from "./axiosService";

export const getCollections = async(params: string) => {
    try {
    const response = await axiosInstance.get(`/${params}`);
    const data = response.data;
    return data;
    }
    catch(error: any){
        throw error;
    }
}