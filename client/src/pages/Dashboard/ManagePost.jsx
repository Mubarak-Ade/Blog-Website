import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDashboardStore } from "../../state/dashboardStore";
import { format } from "date-fns";
import { Edit2, Eye, Search, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { usePostStore } from "../../state/blogStore";

export const ManagePost = () => {
    const {userPosts, setEdit, deletePost} = useDashboardStore();

    const fetchSinglePost = usePostStore(state => state.fetchSinglePost)

    return (
        <div className="bg-gray-100 min-h-screen space-y-6 p-4">
            <div className="">
                <h1 className="text-2xl text-start font-bold">Manage Post</h1>
            </div>
            <div className="bg-white rounded-2xl border p-4 max-w-4xl w-full">
                <div className="mb-5">
                    <h6>Post</h6>
                </div>
                <div className="py-5 border rounded-3xl">
                    <div className="p-4">
                        <div className="">
                            <div className="relative flex justify-center items-center max-w-md w-full">
                                <button className="left-0 absolute mx-2 text-custom-400">
                                    <Search />
                                </button>
                                <input
                                    type="text"
                                    placeholder="Search for command"
                                    className="inline-block w-full py-2.5 pr-14 pl-10 border border-custom-200 rounded-md  placeholder:text-custom-200/50 text-sm"
                                />
                            </div>
                        </div>
                    </div>
                    <Table className="">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Date</TableHead>
                                {/* <TableHead>Status</TableHead> */}
                                <TableHead>Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {userPosts?.map((post) => (
                                <TableRow key={post._id}>
                                    <TableCell>{post.title}</TableCell>
                                    <TableCell>
                                        {format(post.createdAt, "PPpp")}
                                    </TableCell>
                                    <TableCell>
                                        <Button onClick={() => deletePost(post._id)} variant="icon" className="cursor-pointer text-custom-300">
                                            <Trash2Icon />
                                        </Button>
                                        <Link to="/dashboard/create">
                                            <Button onClick={() => setEdit(post)} variant="icon" className="cursor-pointer text-blue-500">
                                                <Edit2 />
                                            </Button>
                                        </Link>
                                        <Link to={`/post/${post._id}`}>
                                            <Button variant="icon"  className="cursor-pointer text-green-500">
                                                <Eye />
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};
