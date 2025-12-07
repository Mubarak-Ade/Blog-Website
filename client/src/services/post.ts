import API from "@/api/api";
import { Post } from "@/model/post";
import { useFilterStore } from "@/store/useFilterStore";
import { uploadToCloudinary } from "@/util/uploadToCloudinary";

export const getPosts = async () => {
    const res = await API.get("/posts");
    return res.data;
}

export const getFilterPosts = async (params) => {

    const res = await API.get("/posts/all", {params})
    return res.data
}

export const getPost = async (id: string) => {
    const res = await API.get(`/posts/${id}`)
    return res.data;
}

export const createPost = async (data: Post) => {
    console.log("data", data);
    const res = await API.post("/posts", data);
    return res.data
}

interface editPostState {
    id: string,
    data: Post;
}

export const updatePost = async ({ id, data }: editPostState) => {
    console.log("=== EDIT POST DEBUG ===");
    console.log("ID:", id);
    console.log("Data being sent:", data);
    console.log("Data type:", typeof data);
    console.log("======================");
    console.log("data", data);
    const res = await API.put(`/posts/${id}`, data);
    return res.data
}

export const deletePost = async (id: string) => {
    const res = await API.delete(`/posts/${id}`);
    return res.data
}