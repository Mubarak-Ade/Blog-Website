import API from "@/api/api";
import { Comment, Post } from "@/model/post";

interface postState {
    id: string,
    data: Comment,
}

export const postComment = async ({id, data} : postState) => {
    const res = await API.post(`/comments/${id}`, data);
    return res.data
}

export const getPostComments = async (id: string) => {
    const res = await API.get(`/comments/${id}`)
    return res.data
}

export const getUserComments = async () => {
    const res = await API.get("/comments")
    return res.data
}