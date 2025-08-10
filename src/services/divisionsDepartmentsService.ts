import { axiosInstance } from "./axiosService";

export const getDivisionsDepartments = async (params?: string) => {
    const url = params ? `/divisions_departments/records${params}` : '/divisions_departments/records'
    try {
        const response = await axiosInstance.get(url);
        const data = response.data
        return data;
    }
    catch(error: any){
        throw error;
    }
}

export const createDivisionsDepartment = async (divisions_ids: string[], department_id: string) => {
    const token = localStorage.getItem('token');
    const newDivisionDepartment = {
        "division_id": divisions_ids,
        "department_id": department_id
    }
    try {
        await axiosInstance.post('/divisions_departments/records', newDivisionDepartment, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    catch(error: any){
        throw error;
    }
}

export const updateDivisionsDepartment = async (id: string, divisions_ids: string[], department_id: string) => {
    const token = localStorage.getItem('token');
    const newDivisionDepartment = {
        "division_id": divisions_ids,
        "department_id": department_id
    }
    try {
        await axiosInstance.patch(`/divisions_departments/records/${id}`, newDivisionDepartment, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    catch(error: any){
        throw error;
    }
}

export const deleteDivisionsDepartment = async (id: string) => {
    const token = localStorage.getItem('token');
    try {
        await axiosInstance.delete(`/divisions_departments/records/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }
    catch(error: any){
        throw error;
    }
}