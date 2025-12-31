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

interface Props {
  posts: Post[],
}

export const Category = ({posts} : Props) => {


	const tags = Array.from(
		new Set(
			posts?.flatMap((post: Partial<Post>) =>
				post.tags
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


	return (
		<div className="flex lg:flex-row flex-col gap-10 items-center justify-center">
			<div className="w-full p-4">
				<h1 className="text-3xl font-bold text-center">Category</h1>
				<ul className="flex flex-wrap justify-center mt-10">
					{categoryList.map((category) => (
						<li
							key={category.name}
							className="flex items-center size-30 p-4 border border-gray-900 dark:border-gray-100 shadow-2xl rounded-md m-2 justify-center text-center flex-col"
						>
							<span>{category.icon}</span>
							{category.name}
						</li>
					))}
				</ul>
			</div>
            <div className="lg:border-l p-6">
				<h1 className="text-3xl text-center font-bold">Popular Tags</h1>
                <ul className="flex flex-wrap gap-2 mt-10">
                    {tags.slice(0,10).map((tag) => (
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
