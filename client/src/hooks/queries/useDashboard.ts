import API from "@/api/api";
import { User, UserProfile } from "@/model/user";
import { uploadToCloudinary } from "@/util/uploadToCloudinary";

export const getUserInfo = async () => {
    const res = await API.get(`/user/me`);
    return res.data
}

export const editUserInfo = async (data: UserProfile) => {
    const res = await API.put("user/me/edit", data);

    return res.data
}

export const fetchUserPost = async () => {
    const res = await API.get("/posts/me");
    return res.data
}