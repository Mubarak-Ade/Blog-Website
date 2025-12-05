import { Post } from "@/model/post";
import { formatImage } from "@/util/imageFormat";
import React from "react";

export const MostViewPost = ({ posts }: { posts: Post[] }) => {
	return (
		<div className="px-4 py-2 rounded-md">
			<h1 className="font-medium text-lg">Most Viewed Posts</h1>
			<ul className="block space-y-2 mt-4">
				{posts.slice(0,5).map((post) => (
					<li
						key={post._id}
						className="flex p-2 gap-2 items-center"
					>
						<img
							src={formatImage(post.image)}
							alt=""
							className="size-15"
						/>
						<h6 className="text-sm text-ellipsis line-clamp-2">
							{post.title}
						</h6>
					</li>
				))}
			</ul>
		</div>
	);
};
