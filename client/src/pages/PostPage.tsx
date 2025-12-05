import { BlogCard } from "@/components/BlogCard";
import { Loader } from "@/components/Loader";
import { PostCard } from "@/components/PostCard";
import { MostViewPost } from "@/components/posts/MostViewPost";
import { PopularTags } from "@/components/posts/PopularTags";
import { PostGrids } from "@/components/posts/PostGrids";
import { PostsHeader } from "@/components/posts/PostsHeader";
import { Trendy } from "@/components/posts/Trendy";
import { Button } from "@/components/ui/button";
import { useFilterPosts } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import { useFilterStore } from "@/store/useFilterStore";
import { FastForward, Rewind } from "lucide-react";

export const PostPage = () => {
	const { data, isLoading, error, isError } = useFilterPosts();
	const next = useFilterStore(s => s.next)
	const prev = useFilterStore(s => s.prev)
	const page = useFilterStore(s => s.page)
	const setPage = useFilterStore(s => s.setPage)


	if (isLoading) {
		return <Loader loading={isLoading} />;
	}

	if (isError) {
		console.log(error);
		
	}

	const {data: posts, pages} = data



	const tags:string[] = Array.from(
		new Set(
			posts.flatMap((post: Partial<Post>) =>
				post.tags
			)
		)
	);

	const pageNumber = [...Array(pages)].map((_, i) => i + 1)

	// console.log(p);
	
	
	return (
		<main className="p-5">
			<div className="">
				<h1 className="font-bold text-3xl">Explore Posts</h1>
				<h4 className="mt-2">
					Browse articles by categories, tags, or popularity
				</h4>
			</div>
			<PostsHeader />
		<div className="flex lg:flex-row flex-col">
				<div className="gap-5 lg:p-5 max-w-4xl w-full">
					{posts.map((post: Post) => (
						<PostCard {...post} key={post._id} />
					))}
				</div>
				<aside className="w-full md:max-w-3xl lg:max-w-xl space-y-4">
					<Trendy posts={posts} />
					<MostViewPost posts={posts} />
					<PopularTags tags={tags} />
				</aside>
			</div>
			<div className="border px-4 py-4 mt-4 max-w-5xl m-auto flex gap-4 items-center justify-center">
				<Button onClick={prev} disabled={page === 1} variant={"outline"} size="icon-lg" className="cursor-pointer">
					<Rewind />
				</Button>
				{/* <span>{page} / {pages}</span> */}
				{[...Array(pages)].map((_, i) => (
					<Button disabled={page === i + 1} onClick={() => setPage(i + 1)} variant={"outline"} className="cursor-pointer">{i + 1}</Button>
				))}
				<Button onClick={next} disabled={page >= pages} variant={"outline"} size="icon-lg" className="cursor-pointer">
					<FastForward />
				</Button>
			</div>
		</main>
	);
};
