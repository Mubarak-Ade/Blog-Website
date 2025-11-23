import API from "@/api/api";
import { Post } from "@/model/post";

interface postState {
    id: string,
    data: Post
}

export const postComment = async ({id, data} : postState) => {
    const res = await API.post(`/posts/comment/${id}`, { text: data });
    return res.data()
}