import { axiosInstance } from "./axiosService";

export const getDepartments = async (params?: string) => {
  const url = params ? `/departments/records${params}` : "/departments/records";
  try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const createDepartment = async (name: string) => {
  try {
    const response = await axiosInstance.post("/departments/records", { name });
    return response.data;
  } catch (error: any) {
    throw error;
  }
};

export const updateDepartment = async (id: string, name: string) => {
  try {
    await axiosInstance.patch(`/departments/records/${id}`, { name });
  } catch (error: any) {
    throw error;
  }
};

export const deleteDepartment = async (id: string) => {
  try {
    await axiosInstance.delete(`/departments/records/${id}`);
  } catch (error: any) {
    throw error;
  }
};
