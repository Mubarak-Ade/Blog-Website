import { editUserInfo, fetchUserPost, getUserInfo } from "@/hooks/queries/useDashboard"
import { useAuthProvider } from "@/state/store"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getPosts } from "./post"

export const useFetchUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: getUserInfo
    })
}

export const useEditUser = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationKey: ["user"],
        mutationFn: editUserInfo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["user"]})
        }
    })
}

export const useUserPost = () => {
    const user = useAuthProvider(state => state.user)
    return useQuery({
        queryKey: ["user-post"],
        queryFn: user?.role !== "admin" ? fetchUserPost : getPosts
    })
}