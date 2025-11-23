import { useFetchPosts } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import React from "react";

export const Trending = () => {
    const {data, isLoading} = useFetchPosts()
	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold">Trending Posts</h1>
			<ol className="mt-10">
                {data?.slice(0, 3).map((post: Partial<Post>) => (
                    <li className="px-4 py-6 bg-slate-100 m-2">{post.title}</li>
                ))}
            </ol>
		</div>
	);
};
