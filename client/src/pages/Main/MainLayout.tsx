import React, { useEffect } from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";
import { useDashboardStore } from "../../store/dashboardStore";
import { Footer } from "@/components/layout/Home/Footer";

export const MainLayout = () => {
    return (
        <>
            <Navbar />
            <main className="pt-18">
                <Outlet />
            </main>
            <Footer />
        </>
    );
};
