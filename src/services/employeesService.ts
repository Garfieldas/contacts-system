import { axiosInstance } from "./axiosService";

export const getEmployees = async (params?: string) => {
  const url = params ? `/employees/records${params}` : "/employees/records";
  try {
    const response = await axiosInstance.get(url);
    const data = response.data;
    return data;
  } catch (error: any) {
    throw error;
  }
};

export const getPhotoUrl = (recordId: string, filename: string) => {
  const baseUrl = import.meta.env.VITE_FILE_URL;
  let url = `${baseUrl}/employees/${recordId}/${filename}`;
  return url;
};

export const createEmployee = async (
  name: string,
  surname: string,
  email: string,
  position: string,
  company_id: string,
  office_id: string,
  division_id: string,
  phone_number?: string,
  department_id?: string,
  group_id?: string,
  photo?: string
) => {
  const employee = {
    name,
    surname,
    email,
    phone_number,
    position,
    company_id,
    office_id,
    division_id,
    department_id,
    group_id,
    photo,
  };
  const token = localStorage.getItem("token");
  try {
    await axiosInstance.post("/employees/records", employee, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error: any) {
    throw error;
  }
};
