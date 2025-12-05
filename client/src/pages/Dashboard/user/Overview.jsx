import { BookCopyIcon, MessageCircleMore } from "lucide-react";
import { PostCard } from "../../../components/Dashboard/PostCard";
import { RecentPostTable } from "../../../components/Dashboard/RecentPostTable";
import { useUserPost } from "../../../services/dashboard";
import { useGetUserComment } from "@/hooks/queries/usePost";

export const Overview = () => {
	// const {userPosts, loading, error} = useDashboardStore()
	const post = useUserPost();
	const comment = useGetUserComment();

	if (post.isLoading) {
		return <p>getting post count .....</p>;
	}

	if (comment.isLoading) {
		return <p>getting comment count .....</p>;
	}

	return (
		<div className="p-6 min-h-screen">
			<div className="flex gap-4">
				<PostCard
					title="Post"
					amount={post?.data?.length}
					icon={BookCopyIcon}
				/>
				<PostCard
					title="comment"
					amount={comment?.data?.length}
					icon={MessageCircleMore}
				/>
			</div>
			<div className="mt-5  p-5">
				<RecentPostTable posts={post?.data} />
			</div>
		</div>
	);
};
