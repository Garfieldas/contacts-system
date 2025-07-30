import { axiosInstance } from "./axiosService";

export const getEmployees = async (params?: string) => {
    const url = params ? `/employees/records${params}` : '/employees/records'
    try {
        const response = await axiosInstance.get(url);
        const data = response.data
        return data;
    }
    catch(error: any){
        throw error;
    }
}

export const getPhotoUrl = (recordId: string, filename: string) => {
    const baseUrl = import.meta.env.VITE_FILE_URL
    let url = `${baseUrl}/employees/${recordId}/${filename}`;
    return url;
}