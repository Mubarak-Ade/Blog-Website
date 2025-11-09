import React, { useEffect } from "react";
import { BlogCard } from "./BlogCard";
import { usePostStore } from "../state/blogStore";

export const Hero = () => {
    const { posts, loading, error, fetchPost } = usePostStore();

    useEffect(() => {
        fetchPost();
    }, []);

    const post = posts.at(0) || {}
    

    return (
        <div className="bg-linear-120 from-custom-200 to-custom-400 overflow-hidden p-20 w-full flex items-center justify-center px-4">
            <div className="text-center max-w-3xl">
                <h1 className="text-6xl font-bold text-wrap text-custom-100">
                    Discover Stories That{" "}
                    <span className="text-custom-400">Inspire & Educate</span>
                </h1>
                <p className="text-xl mt-5 text-custom-100">
                    Explore insightful articles on technology, design, and
                    development from industry experts
                </p>
            </div>
            <div className="max-w-sm w-full p-4">
                    <BlogCard
                        id={post._id}
                        key={post._id}
                        title={post.title}
                        content={post.content}
                        category={post.category}
                        tags={post.tags}
                        author={post.author}
                        image={`http://localhost:4000/${post?.image}`}
                    />
            </div>
        </div>
    );
};
