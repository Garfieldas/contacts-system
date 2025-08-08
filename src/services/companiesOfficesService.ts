import { axiosInstance } from "./axiosService";

export const getCompaniesOffices = async(params?: string) => {
    const url = params ? `/companies_offices/records/${params}` : '/companies_offices/records'
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
    const token = localStorage.getItem('token');
    const newCompanyOffice = {
        "company_id": companies_ids,
        "office_id": office_id
    }
    try {
        await axiosInstance.post('/companies_offices/records', newCompanyOffice, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch(error: any) {
        throw error;
    }
}

export const updateCompaniesOffices = async (id: string, companies_ids: string[], office_id: string) => {
    const token = localStorage.getItem('token');
    const newCompanyOffice = {
        "company_id": companies_ids,
        "office_id": office_id
    }
    try {
        await axiosInstance.patch(`/companies_offices/records/${id}`, newCompanyOffice, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch(error: any) {
        throw error;
    }
}

export const deleteCompaniesOffices = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
        await axiosInstance.delete(`/companies_offices/records/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    }
    catch(error: any) {
        throw error;
    }
}