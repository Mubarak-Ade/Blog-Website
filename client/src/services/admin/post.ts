import API from "@/api/api";

export const adminDeletePost = async (id: string) => {
    const res = await API.delete(`/admin/post/${id}`);
    return res.data
}