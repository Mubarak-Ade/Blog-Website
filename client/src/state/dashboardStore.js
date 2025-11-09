import { create } from "zustand";
import API from "../api/api.js";
import { usePostStore } from "./blogStore.js";

export const useDashboardStore = create((set) => ({
    user: null,
    loading: false,
    edit: null,
    error: null,
    userPosts: [],
    fetchUserInfo: async () => {
        set({ loading: true, error: null });
        try {
            const res = await API.get(`/user/me`);
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    editUserInfo: async (data) => {
        set({ loading: true, error: null });
        try {
            const formData = new FormData();

            // Handle file upload separately
            if (data.profile && data.profile.length > 0) {
                formData.append("profilePic", data.profile[0]);
            }

            delete data.profile; // Remove profile from data to avoid processing it twice

            // Dynamically append all other fields that have values
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    formData.append(key, value);
                }
            });

            const res = await API.put("user/me/edit", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            set({ user: res.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
            throw error;
        }
    },
    fetchUserPost: async () => {
        set({ loading: true, error: null });
        try {
            const res = await API.get("/posts/me");
            set({ userPosts: res.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
    setEdit: (data) => set({ edit: data }),
    editPost: async (id, data) => {
        set({ loading: true, error: null });
        try {
            const formData = new FormData();

            // Handle file upload separately
            if (data.image && data.image.length > 0) {
                formData.append("post", data.image[0]);
            }

            delete data.image; // Remove profile from data to avoid processing it twice

            // Dynamically append all other fields that have values
            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    formData.append(key, value);
                }
            });

            await API.put(`/posts/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            set({ loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    deletePost: async (id) => {
        set({ loaidng: true, error: null });
        try {
            await API.delete(`/posts/${id}`);

            set({ loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
}));
