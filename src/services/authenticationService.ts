import { axiosInstance } from "./axiosService";

export const login = async(email: string, password: string) => {
    const user = {identity: email, password};
    try {
        const response = await axiosInstance.post('/users/auth-with-password', user);
        const data = response.data.record;
        const userInfo = { user: data.name, email: data.email,
             name: data.name, avatar: data.avatar,
             permissions: data.permissions_id};
        const token = response.data.token
        return { userInfo, token };
    }
    catch(error: any){
        throw error;
    }
}