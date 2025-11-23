import React, {useEffect} from "react";
import { Outlet } from "react-router";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppBar } from "@/components/Dashboard/AppBar";
import { SideBar } from "@/components/Dashboard/SideBar";

export const UserDashboardLayout = () => {

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
