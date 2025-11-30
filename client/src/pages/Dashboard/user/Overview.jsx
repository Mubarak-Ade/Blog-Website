import { BookCopyIcon, MessageCircleMore } from "lucide-react";
import { PostCard } from "../../../components/Dashboard/PostCard";
import { RecentPostTable } from "../../../components/Dashboard/RecentPostTable";
import { useUserPost } from '../../../services/dashboard';

export const Overview = () => {

    // const {userPosts, loading, error} = useDashboardStore()    
    const {data, isLoading } = useUserPost()

    if (isLoading) {
        return <p>loading .....</p>
    }    

    return (
        <div className="bg-gray-100 p-6 min-h-screen">
            <div className="flex gap-4">
                <PostCard title="Post" amount={data?.length} icon={BookCopyIcon} cls="bg-custom-400 text-custom-100" />
                <PostCard title="comment" amount={10000} icon={MessageCircleMore} cls="bg-custom-500 text-custom-100" />
            </div>
            <div className="mt-5">
                <RecentPostTable posts={data} />
            </div>
        </div>
    );
};
