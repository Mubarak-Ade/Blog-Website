import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import API from "../../api/api"
import { createPost, deletePost, editPost, getFilterPosts, getPost, getPosts } from "@/services/post"
import { postComment } from "@/services/comment"
import { Post } from "@/model/post"
import { useAuthProvider } from "@/store/store"
import { adminDeletePost } from "@/services/admin/post"
import { useFilterStore } from "@/store/useFilterStore"
import { useDashboardStore } from "@/store/dashboardStore"


export const useFetchPosts = () => useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
})

export const useFilterPosts = () => {
    const { limit, page, search, category, author } = useFilterStore()
    const params = { limit, page, search, category, author }
    return useQuery({
        queryKey: ["filter-post", page, search, category, author],
        queryFn: () => getFilterPosts(params),
    })
}

export const useFetchSinglePost = (id: string) => useQuery({
    queryKey: ["post", id],
    queryFn: () => getPost(id),
    enabled: !!id
})

export const useCreatePost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["posts"],
        mutationFn: createPost,
        onSuccess: (data) => {
            console.log("Post created successfully", data);

            queryClient.invalidateQueries({ queryKey: ["posts"] })
        },
        onError: (err) => {
            console.log("errore creating", err);

        }
    })
}

export const useEditPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: editPost,
        onSuccess: (data, variable) => {
            console.log("Post edited successfully", data);
            queryClient.invalidateQueries({ queryKey: ["posts"] }),
            queryClient.invalidateQueries({ queryKey: ["post", variable.id] })
        },
        onError: (err) => {
            console.log("errore creating", err);

        }
    })
}

export const useDeletePost = () => {
    const queryClient = useQueryClient()
    const user = useAuthProvider(state => state.user)

    return useMutation({
        mutationFn: (id: string) => user?.role !== "admin" ? deletePost(id) : adminDeletePost(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user-post"], refetchType: "active" })
        },
        onError: (err) => {
            console.log("errore creating", err);
        }
    })
}

export const usePostComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: postComment,
        onSuccess: (data, variable) => {
            console.log("Post created successfully", data);
            queryClient.invalidateQueries({ queryKey: ["post", variable.id] })
        },
        onError: (err) => {
            console.log("errore creating", err);

        }
    })
}
