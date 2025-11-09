import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:4000/api",
});

export const setupInterceptors = (getState) => {
    API.interceptors.request.use((config) => {
        const token = getState().token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    });
};

export default API;
