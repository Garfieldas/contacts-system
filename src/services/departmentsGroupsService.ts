import { axiosInstance } from "./axiosService";

export const getDepartmentsGroups = async (params?: string) => {
    const url = params ? `/departments_groups/records${params}` : '/departments_groups/records'
    try {
        const response = await axiosInstance.get(url);
        const data = response.data
        return data;
    }
    catch(error: any){
        throw error;
    }
}

export const createDepartmentsGroup = async (departments_ids: string[], group_id: string) => {
    const newDepartmentGroup = {
        "department_id": departments_ids,
        "group_id": group_id
    }
    try {
        await axiosInstance.post('/departments_groups/records', newDepartmentGroup);
    }
    catch(error: any){
        throw error;
    }
}

export const updateDepartmentsGroup = async (id: string, departments_ids: string[], group_id: string) => {
    const newDepartmentGroup = {
        "department_id": departments_ids,
        "group_id": group_id
    }
    try {
        await axiosInstance.patch(`/departments_groups/records/${id}`, newDepartmentGroup);
    }
    catch(error: any){
        throw error;
    }
}

export const deleteDepartmentsGroup = async (id: string) => {
    try {
        await axiosInstance.delete(`/departments_groups/records/${id}`);
    }
    catch(error: any){
        throw error;
    }
}
