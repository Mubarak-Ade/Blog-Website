
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";
import { Post } from "@/model/post";
import { formatImage } from "@/util/imageFormat";
import { format } from "date-fns";
import { Edit2, Eye, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
// import { useDashboardStore } from "../../state/dashboardStore";
import { Loader } from "@/components/Loader";
import { useDeletePost } from "@/hooks/queries/usePost";
import { useUserPost } from "@/services/dashboard";
import { useDashboardStore } from "@/store/dashboardStore";
import { useAuthProvider } from "@/store/store";
import { toast } from "sonner";

interface PostProp {
	posts: Post[];
}

export const RecentPostTable = ({ posts }: PostProp) => {
	const setEdit = useDashboardStore((s) => s.setEdit);

	const user = useAuthProvider((s) => s.user);

	const deletePost = useDeletePost();

	if (deletePost.isPending) {
		return toast.success("post deleted successfully");
	}

	return (
		<Table className="bg-white dark:bg-gray-900 rounded-md">
			<TableHeader>
				<TableRow>
					<TableHead>Image</TableHead>
					<TableHead>Title</TableHead>
					<TableHead>Date</TableHead>
					{/* <TableHead>Status</TableHead> */}
					<TableHead>Action</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{posts.map((post: Post) => (
					<TableRow key={post._id}>
						<TableCell>
							<img
								src={formatImage(post.image)}
								className="size-15 rounded-full"
								alt="post image"
							/>
						</TableCell>
						<TableCell className="overflow-hidden line-clamp-1 w-100 text-ellipsis">
							{post.title}
						</TableCell>
						<TableCell className="">
							{format(post.createdAt, "PPpp")}
						</TableCell>
						<TableCell className="flex gap-2">
							<Button
								onClick={() => deletePost.mutate(post._id)}
								variant="outline"
								className="cursor-pointer text-custom-300"
							>
								<Trash2Icon />
							</Button>
							<Link
								to={
									user?.role === "admin"
										? "/admin/dashboard/create"
										: "/user/dashboard/create"
								}
							>
								<Button
									onClick={() => setEdit(post)}
									variant="outline"
									className="cursor-pointer text-blue-500"
								>
									<Edit2 />
								</Button>
							</Link>
							<Link to={`/post/${post._id}`}>
								<Button
									variant="outline"
									className="cursor-pointer text-green-500"
								>
									<Eye />
								</Button>
							</Link>
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>
	);
};
