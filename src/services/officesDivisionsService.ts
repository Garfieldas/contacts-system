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

export const createOfficesDivision = async (offices_ids: string[], division_id: string) => {
    const token = localStorage.getItem('token');
    const newOfficeDivision = {
        "office_id": offices_ids,
        "division_id": division_id
    }
    try {
        await axiosInstance.post('/offices_divisions/records', newOfficeDivision, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch(error: any) {
        throw error;
    }
}