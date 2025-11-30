import { Post } from "@/model/post";
import { formatImage } from "@/util/imageFormat";
import { format } from "date-fns";
import React from "react";
import { Link } from "react-router";

export const PostCard = (post: Post) => {
	const { _id, image, title, content, author, createdAt, category } = post;
	const { firstname, lastname } = author || {};
    console.log(firstname);
    
	return (
		<Link to={`/post/${_id}`}>
			<div className="flex m-4 gap-4 max-h-50 h-full border border-slate-500 overflow-hidden shadow-2xl rounded-xl">
				<img
					src={formatImage(image)}
					alt=""
					className="max-w-50 min-w-50 max-h-50 min-h-50 object-cover overflow-hidden p-0 h-full w-full"
				/>
				<div className="flex flex-col p-2 gap-2 justify-center">
					<h4 className="text-xl text-ellipsis line-clamp-1 font-semibold">{title}</h4>
					<p
						dangerouslySetInnerHTML={{ __html: content }}
						className="text-ellipsis line-clamp-2 text-sm text-slate-800"
					/>
					<div className="mt-2">
						<h6 className="capitalize text-custom-500 font-semibold">
							{firstname} {lastname}
						</h6>
						<span className="text-sm text-gray-500/70">{format(createdAt, "PPpp")}</span>
					</div>
					<div className="">
						<span className="font-semibold text-custom-300">{category}</span>
					</div>
				</div>
			</div>
		</Link>
	);
};
