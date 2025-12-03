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
			<div className="flex md:flex-row flex-col m-4 gap-4 border border-slate-500 overflow-hidden shadow-2xl rounded-xl">
				<div className=" bg-blue-600/40 h-50 md:w-50 w-full shrink-0 overflow-hidden">
					<img
						src={formatImage(image)}
						alt=""
						className="object-cover h-full w-full"
					/>
				</div>
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
