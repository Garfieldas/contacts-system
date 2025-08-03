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
  photo?: File
) => {
  const formData = new FormData();

  formData.append("name", name);
  formData.append("surname", surname);
  formData.append("email", email);
  formData.append("position", position);
  formData.append("company_id", company_id);
  formData.append("office_id", office_id);
  formData.append("division_id", division_id);

  if (phone_number) formData.append("phone_number", phone_number);
  if (department_id) formData.append("department_id", department_id);
  if (group_id) formData.append("group_id", group_id);
  if (photo) formData.append("photo", photo);

  const token = localStorage.getItem("token");

  try {
    await axiosInstance.post("/employees/records", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
  } catch (error: any) {
    throw error;
  }
};
