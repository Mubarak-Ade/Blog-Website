import React, { useEffect } from "react";
import { SideBar } from "../../../components/Dashboard/SideBar";
import { PostCard } from "../../../components/Dashboard/PostCard";
import { BookCopyIcon, Eye, Heart, MessageCircleMore, PenBox } from "lucide-react";
import { RecentPostTable } from "../../../components/Dashboard/RecentPostTable";
import { useDashboardStore } from "../../../state/dashboardStore";
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
