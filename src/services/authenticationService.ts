import { axiosInstance } from "./axiosService";

export const login = async(email: string, password: string) => {
    const user = {identity: email, password};
    try {
        const response = await axiosInstance.post('/users/auth-with-password', user);
        const data = response.data.token;
        return data;
    }
    catch(error: any){
        throw error;
    }
}