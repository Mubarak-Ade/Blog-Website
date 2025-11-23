import { AppBar } from "@/components/Dashboard/AppBar";
import { SideBar } from "@/components/Dashboard/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import { Outlet } from "react-router";

export const AdminDashboardLayout = () => {
	return (
		<>
			<SidebarProvider>
				<SideBar />
				<div className="w-full relative overflow-hidden">
					<AppBar />
					<main className="pt-18">
						<Outlet />
					</main>
				</div>
			</SidebarProvider>
		</>
	);
};
