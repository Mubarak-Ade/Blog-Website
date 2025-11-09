import React from "react";
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
import { Link } from "react-router";
import { BookCopyIcon, EditIcon, Home, MessageCircleMore, Plus, Settings, UserRoundPen } from "lucide-react";

const link = [
    {
        name: "Dashboard",
        path: "",
        icon: <Home />,
    },
    {
        name: "Create New Post",
        path: "create",
        icon: <Plus />
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
    return (
        <>
            <Sidebar className="space-y-4 bg-white shadow-2xl px-5">
                <SidebarHeader className="flex justify-center items-center bg-white pt-8 pb-7">
                    <Link to="/">
                        <h1 className="px-5 font-bold text-custom-400 text-4xl">Aim Blog</h1>
                    </Link>
                </SidebarHeader>
                <SidebarContent className="bg-white">
                    <SidebarGroup>
                        <SidebarMenu>
                            {link.map((l, index) => (
                                <SidebarMenuItem key={index}>
                                    <SidebarMenuButton
                                        asChild
                                        className="hover:bg-custom-200 mb-2 px-4 py-6 font-semibold text-custom-400 hover:text-custom-400 text-sm"
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
