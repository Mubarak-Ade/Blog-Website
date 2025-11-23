import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { formatImage } from "@/util/imageFormat";
import { useFetchPosts } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import { BlogCard } from "@/components/BlogCard";

export const Features = () => {
    const { data, isLoading, error } = useFetchPosts();

    
    return (
        <div className="p-4">
            <div className="flex justify-between items-center p-5">
                <h1 className="text-3xl font-bold mb-4">Latest Post</h1>
                <Link className="flex gap-2">View more <ArrowRight /></Link>
            </div>
            <div className="grid grid-cols-3 gap-10 p-10">
                {data?.slice(0, 6)?.map((post : Post) => {
                    return (
                        <BlogCard
                            key={post._id}
                            {...post}
                        />
                    );
                })}
            </div>
        </div>
    );
};
