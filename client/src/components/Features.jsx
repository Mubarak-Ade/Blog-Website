import React from "react";
import { usePostStore } from "../state/blogStore";
import { BlogCard } from "./BlogCard";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export const Features = () => {
    const { posts, loading, error } = usePostStore();
    return (
        <div className="p-4">
            <div className="flex justify-between items-center p-5">
                <h1 className="text-3xl font-bold mb-4">Latest Post</h1>
                <Link className="flex gap-2">View more <ArrowRight /></Link>
            </div>
            <div className="grid grid-cols-3 gap-10 p-5">
                {posts.slice(0, 3).map((post) => {
                    return (
                        <BlogCard
                            id={post._id}
                            category={post.category}
                            tags={post.tags}
                            author={post.author}
                            content={post.content}
                            title={post.title}
                            key={post._id}
                            image={`http://localhost:4000/${post?.image}`}
                        />
                    );
                })}
            </div>
        </div>
    );
};
