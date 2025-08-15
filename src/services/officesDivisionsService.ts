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
    const newOfficeDivision = {
        "office_id": offices_ids,
        "division_id": division_id
    }
    try {
        await axiosInstance.post('/offices_divisions/records', newOfficeDivision)
    }
    catch(error: any) {
        throw error;
    }
}

export const updateOfficesDivision = async (id: string, offices_ids: string[], division_id: string) => {
    const newOfficeDivision = {
        "office_id": offices_ids,
        "division_id": division_id
    }
    try {
        await axiosInstance.patch(`/offices_divisions/records/${id}`, newOfficeDivision)
    }
    catch(error: any) {
        throw error;
    }
}

export const deleteOfficesDivision = async (id: string) => {
    try {
        await axiosInstance.delete(`/offices_divisions/records/${id}`)
    }
    catch(error: any) {
        throw error;
    }
}