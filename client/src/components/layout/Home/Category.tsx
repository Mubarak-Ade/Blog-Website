import { useFetchPosts } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import { log } from "console";
import {
	Bot,
	CircleQuestionMarkIcon,
	CodeIcon,
	ComputerIcon,
	Hash,
	Laptop,
} from "lucide-react";

export const Category = () => {
	const { data, isLoading, error } = useFetchPosts();

	if (isLoading) {
		return <p>Loading ....</p>;
	}

	// const tagList: string[] = data.t(",").map((t, i) => t.);

	const tags = Array.from(
		new Set(
			data?.flatMap((post: Partial<Post>) =>
				post.tags?.split(",").map((str) => str.trim())
			)
		)
	);

	const categoryList = [
		{
			name: "Tech & development",
			icon: <Laptop />,
		},
		{
			name: "AI",
			icon: <Bot />,
		},
		{
			name: "Coding",
			icon: <CodeIcon />,
		},
		{
			name: "Trendy",
			icon: <Hash />,
		},
	];

	// categories.flatMap(c => console.log(c.split(",")))

	console.log(tags);

	return (
		<div className="p-10 flex gap-10 items-center justify-center">
			<div className="p-4">
				<h1 className="text-3xl font-bold">Category</h1>
				<ul className="flex mt-10">
					{categoryList.map((category) => (
						<li
							key={category}
							className="flex items-center size-30 p-4 bg-slate-300 m-2 justify-center text-center flex-col"
						>
							<span>{category.icon}</span>
							{category.name}
						</li>
					))}
				</ul>
			</div>
            <div className="border-l p-4">
				<h1 className="text-3xl font-bold">Tags</h1>
                <ul className="flex flex-wrap gap-2 mt-10">
                    {tags.map((tag) => (
                        <li
                            key={tag}
                            className="px-4 overflow-hidden text-white cursor-pointer py-2 text-[10px] rounded-full text-center bg-custom-200"
                        >
                            {tag}
                        </li>
                    ))}
                </ul>
            </div>
		</div>
	);
};
