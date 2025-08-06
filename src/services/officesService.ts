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