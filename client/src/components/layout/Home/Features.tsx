import React from "react";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { formatImage } from "@/util/imageFormat";
import { useFetchPosts } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import { BlogCard } from "@/components/BlogCard";
import { Loader } from "@/components/Loader";

export const Features = () => {
    const { data, isLoading, error } = useFetchPosts();

    if(isLoading) {
        return <Loader loading={isLoading} />;
    }
    
    return (
        <div className="p-4">
            <div className="flex justify-between items-center p-5">
                <h1 className="text-3xl font-bold mb-4">Latest Post</h1>
                <Link to="posts" className="flex gap-2">View more <ArrowRight /></Link>
            </div>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 p-10">
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
