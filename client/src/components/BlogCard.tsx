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
		tags,
		_id,
		image,
		author,
		createdAt,
	} = post;

	// const tagList: string[] = tags.split(",");

	return (
		<Link to={`/post/${_id}`}>
			<Card className="w-full relative p-0 shadow-2xl pb-4 border border-black dark:border-white dark:bg-gray-900  overflow-hidden text-black dark:text-white ">
				<CardHeader className="p-0 ">
					<div className="h-50 w-full overflow-hidden rounded-t-md">
						<img
							src={image}
							alt=""
							className="object-cover h-full w-full"
						/>
					</div>
					<div className="flex gap-1 flex-wrap h-8 overflow-hidden capitalize p-2">
						{tags? (
							tags.map((tag, index: number) => {
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
					<CardDescription className="capitalize bg-white rounded-2xl absolute top-0 text-custom-400 px-4 py-2 text-xs m-2 left-0">
						<p>{category}</p>
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
							<span className="text-sm">
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
