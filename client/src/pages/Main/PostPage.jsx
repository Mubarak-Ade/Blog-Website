import React, { useEffect } from "react";
import { usePostStore } from "../../state/blogStore";
import { useParams } from "react-router";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupButton,
} from "@/components/ui/input-group";
import Profile from "../../assets/profile.png"
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ReactMarkdown from "react-markdown"
import API from "../../api/api";
// import TextareaAutosize from "react-textarea-autosize";

export const PostPage = () => {
    const { fetchSinglePost, currentPost, loading, error, postComment } =
        usePostStore();

    const { id } = useParams();

    const tags = currentPost?.post?.tags?.split(",");

    const schema = z.object({
        comment: z.string().min(5, "comment should be atleast 5 character").max(500, "comment is too long")
    })

    const {
            register,
            handleSubmit,
            formState: {errors},
            setError,
            resetField,
        } = useForm({resolver: zodResolver(schema)});

        

    useEffect(() => {
        fetchSinglePost(id);
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log(currentPost);

    const onSubmit = async (data) => {
        try {
            await postComment(id, data.comment)
            resetField("comment")
            fetchSinglePost(id)
        } catch (error) {
            setError("comment", {type: "manual", message: errors || error || "Comment can not be post"})
        }

    }    

    // const profilePic = `http://localhost:4000${user?.profilePic}`

    return (
        <div className="px-8 py-4 block h-full">
            <div className="w-full max-w-3xl m-auto">
                <div className="">
                    <h1 className="text-4xl text-center font-bold font-actor">
                        {currentPost?.post?.title}
                    </h1>
                    <div className="my-5">
                        <img src={`http://localhost:4000/${currentPost?.post?.image}`} alt="" />
                    </div>
                    <h6 className="capitalize ">
                        category:{" "}
                        <span className="font-semibold ml-2">
                            {currentPost?.post?.category}
                        </span>
                    </h6>
                </div>
                <div className="mt-5">
                    <ReactMarkdown>{currentPost?.post?.content}</ReactMarkdown>
                    <div className="flex gap-1 capitalize mt-5">
                        {tags ? (
                            tags.map((tag, index) => {
                                return (
                                    <p
                                        key={index}
                                        className="overflow-hidden flex items-center justify-center bg-custom-500 text-xs text-white px-3 py-1.5 rounded-full"
                                    >
                                        {tag}
                                    </p>
                                );
                            })
                        ) : (
                            <p>No tags</p>
                        )}
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className="text-3xl font-bold">Comments</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="relative">
                        <textarea
                            className="border w-full rounded-2xl p-4 border-custom-400 mt-4"
                            rows={6}
                            {...register("comment")}
                            placeholder="Enter a comment"
                        />
                        <button className="bg-custom-500 px-4 py-2 bottom-0 m-4 left-0 text-custom-100 rounded-xl absolute">
                            Submit
                        </button>
                        {errors.comment && (
                            <p className="text-red-500 text-xl">{errors.comment.text}</p>
                        )}
                    </form>
                </div>
                <div className="mt-10">
                    {/* Comments will go here */}
                    {currentPost?.comment && currentPost?.comment?.length > 0 ? (
                        currentPost?.comment?.map((comment) => (
                            <div
                                key={comment._id}
                                className="border rounded-lg border-custom-500 py-4 m-2 p-2 w-full"
                            >
                                <div className="grid grid-cols-[50px_100px] items-center">
                                    <img src={`http://localhost:4000${comment?.user?.profilePic}`} alt="" className="size-10 border border-custom-500 rounded-full row-span-2 mr-4" />
                                    <h4 className="text-custom-500 font-bold">{comment?.user?.firstname} {comment?.user?.lastname}</h4>
                                    <h6 className="text-custom-300">{comment?.user?.email}</h6>
                                </div>
                                <p className="font-alive mt-5 ml-10">{comment.text}</p>
                            </div>
                        ))
                    ) : (
                        <p className="mt-4">No comments yet.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
