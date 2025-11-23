import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Post } from "@/model/post";
import { formatImage } from "@/util/imageFormat";
import { Link } from "react-router";
import { format } from "date-fns";

export const BlogCard = (post: Post) => {
	const {
		title,
		content,
		category,
		tags = "",
		_id,
		image,
		author,
		createdAt,
	} = post;

	const tagList: string[] = tags.split(",");

	console.log(author);

	return (
		<Link to={`/post/${_id}`}>
			<Card className="w-full p-0 shadow-2xl pb-4 border border-custom-400 h-full max-h-125 overflow-hidden text-custom-400">
				<CardHeader className="p-0 ">
					<div className="h-50 w-full overflow-hidden rounded-t-md">
						<img
							src={formatImage(image)}
							alt=""
							className=""
						/>
					</div>
					<div className="flex gap-1 flex-wrap h-8 overflow-hidden capitalize p-2">
						{tagList ? (
							tagList.map((tag, index: number) => {
								return (
									<p
										key={index}
										className="h-5 overflow-hidden text-wrap py-2 px-2 flex items-center justify-center bg-custom-200 text-xs border rounded-full text-custom-100"
									>
										{tag}
									</p>
								);
							})
						) : (
							<p>No tags</p>
						)}
					</div>
				</CardHeader>
				<CardContent className="px-4">
					<CardTitle className="text-xl capitalize flex line-clamp-2">
						<h2>{title}</h2>
					</CardTitle>
					<CardDescription className="capitalize text-base">
						<p>{category}</p>
						<span></span>
					</CardDescription>
				</CardContent>
				<CardFooter className="block space-y-4 px-4">
					<div className="flex items-center gap-4">
						<img
							src={formatImage(author?.profilePic)}
							alt="profile pic"
							className="size-15 border rounded-full"
						/>
						<div className="flex flex-col gap-1 ">
							<span className="font-bold">
								{author?.firstname} {author?.lastname}
							</span>
							<span className="text-custom-400/60 text-sm">
								{format(createdAt, "PP")}
							</span>
						</div>
					</div>
					<div className=""></div>
				</CardFooter>
			</Card>
		</Link>
	);
};
