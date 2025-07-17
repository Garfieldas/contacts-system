import { axiosInstance } from "./axiosService";

export const getEmployees = async () => {
    try {
        const response = await axiosInstance.get('/employees/records');
        const data = response.data
        return data;
    }
    catch(error: any){
        throw error;
    }
}