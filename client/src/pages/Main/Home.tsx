import { Hero } from "@/components/Hero";
import { Category } from "@/components/layout/Home/Category";
import { Features } from "@/components/layout/Home/Features";
import { Trending } from "@/components/layout/Home/Trending";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { useFetchPosts } from "@/hooks/queries/usePost";
import { Plus } from "lucide-react";
import { Link } from "react-router";

const Home = () => {
	const { data, isLoading, error } = useFetchPosts();

	if (isLoading) {
		return (
			<Loader
				loading={isLoading}
				message="Waking Server up"
			/>
		);
	}

	// Handle error state
	if (error) {
		return <div>Error: {error.message}</div>;
	}
	return (
		<div className="">
			<Hero posts={data} />
			<Features posts={data} />
			<Trending posts={data} />
			<Category posts={data} />
			<div className="fixed bottom-10 right-0 m-10">
				<Link to="create-post">
					<Button
						variant="default"
						size="icon"
						className="rounded-full shadow-2xl size-12 border cursor-pointer"
					>
						<Plus />
					</Button>
				</Link>
			</div>
		</div>
	);
};

export default Home;
