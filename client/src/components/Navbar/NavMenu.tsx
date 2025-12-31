import { User } from "@/model/user";
import { Check, LayoutDashboard, LogOut } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface Props {
	user: null | User;
	showMenu: boolean;
	logout: any;
}

export const NavMenu = ({ user, showMenu, logout }: Props) => {
	return (
		<>
			{showMenu && (
				<ul className="fixed top-15 m-5 shadow-2xl rounded-lg right-0 max-w-3xs space-y-1 w-full text-start items-start bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 border z-50 p-4">
					<h6 className="text-lg capitalize text-center m-4 text-white flex items-center gap-2">
						{user?.role === "admin" && (
							<Check
								className="p-0.5 border border-custom-200 text-custom-400 rounded-full"
								size={15}
							/>
						)}
						{user?.username}
					</h6>
					<li className="px-4 py-2 flex gap-2 items-center hover:bg-custom-200/30">
						<LayoutDashboard size={20} />
						<Link
							to={
								user?.role !== "admin"
									? "user/dashboard"
									: "admin/dashboard"
							}
						>
							Dashboard
						</Link>
					</li>

					<div className="border-t">
						<button
							onClick={logout}
							className="px-4 py-2 flex gap-2 hover:bg-custom-200/30 w-full cursor-pointer rounded-md"
						>
							<LogOut />
							Logout
						</button>
					</div>
				</ul>
			)}
		</>
	);
};
