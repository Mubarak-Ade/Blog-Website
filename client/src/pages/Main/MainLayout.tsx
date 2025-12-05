import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import { useDashboardStore } from "../../store/dashboardStore";
import { Footer } from "@/components/layout/Home/Footer";

export const MainLayout = () => {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <Navbar />
            <main className="pt-18">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};
