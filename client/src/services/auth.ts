import API from "@/api/api";
import { Login } from "@/model/auth";

export const login = async (data: Login) => {
    const res = await API.post("/auth/login", data);
    return res.data
}

export const register = async (data: Login) => {
    const res = await API.post("/auth/register", data);
    return res.data
}