import { Plus, Search } from "lucide-react";
import React from "react";
import { RecentPostTable } from "../../../components/Dashboard/RecentPostTable";
import { useUserPost } from "@/services/dashboard";
import { Link } from "react-router";
import { Loader } from "@/components/Loader";

export const ManagePost = () => {
	const { data, isLoading } = useUserPost();

	if (isLoading) {
		return <Loader loading={isLoading} message="fetching user posts" />
	}

	return (
		<div className="min-h-screen dark:bg-gray-900 space-y-6 p-4">
			<div className="flex justify-between items-center p-4">
				<h1 className="text-2xl text-start font-bold">Manage Post</h1>
				<Link to="/create-post">
					<button className="px-4 gap-2 cursor-pointer py-2 bg-cyan-500 rounded-md flex items-center text-white"><Plus />Create Post</button>
				</Link>
			</div>
			<div className=" rounded-2xl border bg-white dark:bg-gray-900 p-4 w-full">
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
									className="inline-block w-full py-2.5 pr-14 pl-10 border rounded-md   text-sm"
								/>
							</div>
						</div>
					</div>
					<RecentPostTable posts={data} />
				</div>
			</div>
		</div>
	);
};
