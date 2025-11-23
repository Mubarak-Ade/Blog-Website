import API from "@/api/api";
import { Post } from "@/model/post";

export const getPosts = async () => {
    const res = await API.get("/posts");
    return res.data;
}

export const getPost = async (id: string) => {
    const res = await API.get(`/posts/${id}`)
    return res.data;
}

export const createPost = async (data: Post) => {
    const formData = new FormData();

    if (data.image && data.image.length > 0) {
        formData.append("post", data.image[0]);
    }

    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "" && key !== "image") {
            formData.append(key, value);
        }
    });

    const res = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data
}

interface editPostState {
    id: string,
    data: Post
}

export const editPost = async ({ id, data }: editPostState) => {
    const formData = new FormData();

    // Handle file upload separately
    if (data.image && data.image.length > 0) {
        formData.append("post", data.image[0]);
    }


    // Dynamically append all other fields that have values
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "" && key !== "image") {
            formData.append(key, value);
        }
    });

    const res = await API.put(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data
}

export const deletePost = async (id: string) => {
    const res = await API.delete(`/posts/${id}`);
    return res.data
}