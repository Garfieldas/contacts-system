import { axiosInstance } from "./axiosService";

export const getCompaniesOffices = async(params?: string) => {
    const url = params ? `/companies_offices/records${params}` : '/companies_offices/records'
    try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    return data;
    }
    catch(error: any){
        throw error;
    }
}

export const createCompaniesOffices = async (companies_ids: string[], office_id: string) => {
    const newCompanyOffice = {
        "company_id": companies_ids,
        "office_id": office_id
    }
    try {
        await axiosInstance.post('/companies_offices/records', newCompanyOffice)
    }
    catch(error: any) {
        throw error;
    }
}

export const updateCompaniesOffices = async (id: string, companies_ids: string[], office_id: string) => {
    const newCompanyOffice = {
        "company_id": companies_ids,
        "office_id": office_id
    }
    try {
        await axiosInstance.patch(`/companies_offices/records/${id}`, newCompanyOffice)
    }
    catch(error: any) {
        throw error;
    }
}

export const deleteCompaniesOffices = async (id: string) => {
    try {
        await axiosInstance.delete(`/companies_offices/records/${id}`)
    }
    catch(error: any) {
        throw error;
    }
}