import { BookCopyIcon, MessageCircleMore } from "lucide-react";
import { PostCard } from "../../../components/Dashboard/PostCard";
import { RecentPostTable } from "../../../components/Dashboard/RecentPostTable";
import { useUserPost } from "../../../services/dashboard";
import { useGetUserComment } from "@/hooks/queries/usePost";
import { Loader } from "@/components/Loader";

export const Overview = () => {
	// const {userPosts, loading, error} = useDashboardStore()
	const post = useUserPost();
	const comment = useGetUserComment();

	if (post.isLoading || comment.isLoading) {
		return <Loader loading={post.isLoading || comment.isLoading} message="getting post and comment count" />
	}
	return (
		<div className="p-6 dark:bg-gray-900 min-h-screen">
			<div className="flex gap-4">
				<PostCard
					title="Post"
					amount={post?.data?.length}
					icon={<BookCopyIcon size={24}/>}
				/>
				<PostCard
					title="comment"
					amount={comment?.data?.length}
					icon={<MessageCircleMore size={24} />}
				/>
			</div>
			<div className="mt-5  p-5">
				<RecentPostTable posts={post?.data} />
			</div>
		</div>
	);
};
