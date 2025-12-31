import { useFetchPosts } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import React from "react";

interface Props {
  posts: Post[],
}
export const Trending = ({posts} : Props) => {
	return (
		<div className="p-10">
			<h1 className="text-3xl font-bold">Trending Posts</h1>
			<ol className="mt-10">
                {posts?.slice(0, 3).map((post) => (
                    <li className="px-4 py-6 m-2">{post.title}</li>
                ))}
            </ol>
		</div>
	);
};
