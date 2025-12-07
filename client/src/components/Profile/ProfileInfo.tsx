import React from "react";
import { Pen } from "lucide-react";
import { Link } from "react-router";

export const ProfileInfo = ({ user, loading, error }) => {
	return (
		<div className="flex justify-between p-6 border rounded-2xl">
			<div className="w-full max-w-xs">
				<h4 className="mb-10 font-bold text-lg">Personal Informaton</h4>
				<div className="gap-10 grid grid-cols-2">
					<div className="">
						<span className=" text-xs">First Name</span>
						<h6 className="font-bold  text-sm">
							{user?.firstname}
						</h6>
					</div>
					<div className="">
						<span className="text-xs">Last Name</span>
						<h6 className="font-bold text-sm">{user?.lastname}</h6>
					</div>
					<div className="">
						<span className="text-xs">Email</span>
						<h6 className="font-bold text-sm">{user?.email}</h6>
					</div>
					<div className="">
						<span className="text-xs">Phone Number</span>
					<h6 className="font-bold text-sm">{user?.phone}</h6>
					</div>
					<div className="">
						<span className="text-xs">Bio</span>
						<h6 className="font-bold text-sm">{user?.bio}</h6>
					</div>
				</div>
			</div>
			<button className="block mb-auto">
					<Link className="flex justify-center items-center gap-2 ml-auto px-4 py-2 border rounded-3xl" to="edit"><Pen size={15} /> Edit</Link>
			</button>
		</div>
	);
};
