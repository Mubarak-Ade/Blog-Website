import React, {useEffect, useState} from "react";
import { Outlet } from "react-router";
import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
import { AppBar } from "@/components/Dashboard/AppBar";
import { SideBar } from "@/components/Dashboard/SideBar";

export const UserDashboardLayout = () => {


    return (
        <div className="bg-white dark:bg-gray-900">
            <SidebarProvider>
                <SideBar  />
                <div className="relative overflow-hidden">
                    <AppBar />
                    <main className="pt-18 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
                        <Outlet />
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
};
