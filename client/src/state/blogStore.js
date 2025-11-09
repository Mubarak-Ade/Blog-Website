import { create } from "zustand";
import API from "../api/api.js";

export const usePostStore = create((set, get) => ({
    posts: [],
    currentPost: {},
    loading: false,
    error: null,
    fetchPost: async () => {
        set({ loading: true, error: null });
        try {
            const res = await API.get("/posts");
            set({ posts: res.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
    fetchSinglePost: async (id) => {
        set({ loading: true, error: null });
        try {
            const res = await API.get(`/posts/${id}`);
            set({ currentPost: res.data, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
    createPost: async (data) => {
        set({ loading: true, error: null });

        try {
            const formData = new FormData();

            if (data.image && data.image.length > 0) {
                formData.append("post", data.image[0]);
            }

            Object.entries(data).forEach(([key, value]) => {
                if (value !== undefined && value !== null && value !== "") {
                    formData.append(key, value);
                }
            });

            const res = await API.post("/posts", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const currentPost = get().posts;
            set({ posts: [res.data, ...currentPost], loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
    postComment: async (postId, commentData) => {
        set({ loading: true, error: null });
        try {
            await API.post(`/posts/comment/${postId}`, { text: commentData });
            const updatedPost = await API.get(`posts/${postId}`);
            set({ currentPost: updatedPost, loading: false });
        } catch (err) {
            set({ error: err.message, loading: false });
        }
    },
}));
