import API from "@/api/api";
import { Post } from "@/model/post";
import { useFilterStore } from "@/store/useFilterStore";

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
    const formData = new FormData();

    const {image, ...otherFields} = data

    if (image instanceof File) {
        formData.append("image", image);
    } else if (image instanceof File && image.length > 0) {
        formData.append("image", image[0]);
    }

    Object.entries(otherFields).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            formData.append(key, String(value));
        }
    });

    console.log("Image:", data.image);
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }

    const res = await API.post("/posts", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data
}

interface editPostState {
    id: string,
    data: Omit<Post, "image"> & { image: File | null };
}

export const editPost = async ({ id, data }: editPostState) => {
    const formData = new FormData();

    const {image, ...otherFields} = data

    if (image instanceof File) {
        formData.append("image", image);
    }

    Object.entries(otherFields).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            formData.append(key, String(value));
        }
    });

    console.log("Image:", data.image);
    console.log("FormData entries:");
    for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
    }


    // Dynamically append all other fields that have values

    const res = await API.put(`/posts/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data
}

export const deletePost = async (id: string) => {
    const res = await API.delete(`/posts/${id}`);
    return res.data
}