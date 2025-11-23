import API from "@/api/api";
import { User, UserProfile } from "@/model/user";

export const getUserInfo = async () => {
    const res = await API.get(`/user/me`);
    return res.data
}

export const editUserInfo = async (data: UserProfile) => {
    const formData = new FormData();

    // Handle file upload separately
    if (data.profile && data.profile.length > 0) {
        formData.append("profilePic", data.profile[0]);
    }

    // delete data.profile; // Remove profile from data to avoid processing it twice

    // Dynamically append all other fields that have values
    Object.entries(data).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            formData.append(key, value);
        }
    });

    const res = await API.put("user/me/edit", formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data
}

export const fetchUserPost = async () => {
    const res = await API.get("/posts/me");
    return res.data
}