import React, { useState } from "react";
import {
	Sidebar,
	SidebarHeader,
	SidebarProvider,
	SidebarContent,
	SidebarFooter,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarGroup,
	SidebarMenu,
} from "@/components/ui/sidebar";
import { Link, Navigate } from "react-router";
import {
	BookCopyIcon,
	EditIcon,
	Home,
	MessageCircleMore,
	Plus,
	Settings,
	UserRoundPen,
} from "lucide-react";
import { useAuthProvider } from "@/store/store";
import { NavMenu } from "../Navbar/NavMenu";
import { log } from "console";

const link = [
	{
		name: "Dashboard",
		path: "",
		icon: <Home />,
	},
	{
		name: "Manage Post",
		path: "posts",
		icon: <BookCopyIcon />,
	},
	{
		name: "Comments",
		path: "",
		icon: <MessageCircleMore />,
	},
	{
		name: "User Profile",
		path: "profile",
		icon: <UserRoundPen />,
	},
	{
		name: "Setting",
		path: "",
		icon: <Settings />,
	},
];

export const SideBar = () => {
	const user = useAuthProvider((state) => state.user);
	const logout = useAuthProvider((state) => state.logout);
	const [showMenu, setShowMenu] = useState(false);

	const Logout = () => {
		logout();
		setShowMenu(false);
		<Navigate to="/login" />;
	};

	return (
		<>
			<Sidebar
				collapsible="offcanvas"
				className="space-y-4 shadow-2xl px-5 dark:bg-gray-900"
			>
				<SidebarHeader className="flex relative justify-center bg-white dark:bg-gray-900 items-center pt-8 pb-7">
					<Link to="/">
						<h1 className="lg:mt-12 font-bold text-4xl">
							AIM BLOG
						</h1>
					</Link>
					<div
						onClick={() => setShowMenu(!showMenu)}
						className="flex items-center gap-4 mt-4 border w-full p-2 rounded-md"
					>
						<img
							src={user?.profile}
							className="size-12 rounded-full"
							alt={user?.profile}
						/>
						<div className="">
							<h4>{user?.name || ""}</h4>
							<h6 className="text-sm text-gray-400/90 font-light">
								{user?.email}
							</h6>
						</div>
					</div>
					<NavMenu
						user={user}
						showMenu={showMenu}
						logout={Logout}
					/>
				</SidebarHeader>
				<SidebarContent className="bg-white dark:bg-gray-900">
					<SidebarGroup>
						<SidebarMenu>
							{link.map((l, index) => (
								<SidebarMenuItem key={index}>
									<SidebarMenuButton
										asChild
										className="mb-2 px-4 py-6 font-semibold text-sm hover:bg-gray-900 dark:hover:bg-gray-700 hover:text-gray-100"
									>
										<Link to={`${l.path}`}>
											{l.icon}
											<span>{l.name}</span>
										</Link>
									</SidebarMenuButton>
								</SidebarMenuItem>
							))}
						</SidebarMenu>
					</SidebarGroup>
				</SidebarContent>
				{/* <SidebarFooter></SidebarFooter> */}
			</Sidebar>
		</>
	);
};
