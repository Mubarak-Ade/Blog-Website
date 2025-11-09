import React, {useEffect} from "react";
import { Outlet } from "react-router";
import { AppBar } from "../../components/Dashboard/AppBar";
import { SideBar } from "../../components/Dashboard/SideBar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { usePostStore } from "../../state/blogStore";
import { useDashboardStore } from "../../state/dashboardStore";

export const DashboardLayout = () => {

    const {loading, error, fetchUserInfo, fetchUserPost} = useDashboardStore();
    
     useEffect(() => {
        fetchUserPost()
        fetchUserInfo()
    }, [])

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
