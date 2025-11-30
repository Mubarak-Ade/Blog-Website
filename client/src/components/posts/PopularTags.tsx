import { Post } from "@/model/post";
import { Button } from "../ui/button";

export const PopularTags = ({ tags }: { tags: string[] }) => {
        
	return (
		<div className="px-4 py-2 bg-slate-100 rounded-md">
			<h1 className="text-lg font-medium">Popular Tags</h1>
			<ul className="mt-4 flex flex-wrap gap-4">
				{tags.slice(0,10).map((tag) => (
					<li className="bg-custom-200/20 rounded-md px-2 py-1 text-xs"># {tag}</li>
				))}
			</ul>
			<Button variant={"link"} className="mt-4 m-auto block cursor-pointer">View More Tags</Button>
		</div>
	);
};
