import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import API from "../../api/api"
import { createPost, deletePost, editPost, getPost, getPosts } from "@/services/post"
import { postComment } from "@/services/comment"
import { Post } from "@/model/post"
import { useAuthProvider } from "@/state/store"
import { adminDeletePost } from "@/services/admin/post"


export const useFetchPosts = () => useQuery({
    queryKey: ["posts"],
    queryFn: getPosts
})

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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }
    })
}

export const useEditPost = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["posts"],
        mutationFn: editPost,
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["posts"] }),
                queryClient.invalidateQueries({ queryKey: ["post", id] })
        }
    })
}

export const useDeletePost = () => {
    const user = useAuthProvider(state => state.user)
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["posts"],
        mutationFn: user?.role !== "admin" ? deletePost : adminDeletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] })
        }
    })
}

export const usePostComment = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ["post"],
        mutationFn: postComment,
        onSuccess: (_, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["post", id] })
        }
    })
}
