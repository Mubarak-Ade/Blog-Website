import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL,
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
