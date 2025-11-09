import {
    DoorClosed,
    LayoutDashboard,
    LogOut,
    LucideDoorOpen,
    NotebookText,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useAuthProvider } from "../state/store";
import Profile from "../assets/user (1).png";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

const Navbar = () => {
    const user = useAuthProvider((state) => state.user);
    const logout = useAuthProvider((state) => state.logout);
    const [isFixed, setIsFixed] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const profilePic = `http://localhost:4000${user?.profile}`;

    const navigate = useNavigate();
    const Logout = () => {
        logout();
        setShowMenu(false);
        navigate("/login");
    };

    return (
        <nav
            className={`px-8 py-2 flex w-full bg-linear-120 from-custom-200 to-custom-400 fixed items-center z-50 text-custom-100 justify-between shadow-2xl`}
        >
            <div className="flex items-center gap-2 font-alice text-4xl font-bold ">
                <NotebookText size={30} />
                <h1 className="">AIM Blog</h1>
            </div>
            <ul className="flex items-center gap-10 font-light font-actor p-3 text-base">
                <Link to="/" className="hover:underline">
                    Home
                </Link>
                <Link className="hover:underline">Category</Link>
                <Link className="hover:underline">About</Link>
                <Link className="hover:underline">Contact</Link>
            </ul>
            {user ? (
                <div className="flex items-center gap-5">
                    <img
                        src={profilePic}
                        alt={profilePic}
                        className="size-15 rounded-full bg-custom-100/50 object-cover"
                    />
                    {/* <h4 className="capitalize font-bold">
                        {user.firstname} {user.firstname}
                    </h4> */}
                    <button
                        onClick={() => setShowMenu(!showMenu)}
                        className="text-2xl cursor-pointer text-custom-100"
                    >
                        {showMenu ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
                    </button>
                </div>
            ) : (
                <ul className="flex font-actor gap-4">
                    <Link to="login" className="hover:underline">
                        Login
                    </Link>
                    <Link to="register" className="hover:underline">
                        Register
                    </Link>
                </ul>
            )}

            {showMenu && (
                <ul className="fixed top-15 m-5 shadow-2xl rounded-lg right-0 max-w-3xs space-y-1 w-full text-start items-start bg-white text-gray-700 z-50 p-4">
                    <h6 className="text-sm m-4">{user.email}</h6>
                    <li className="px-4 py-2 flex gap-2 items-center hover:bg-custom-200/30">
                        <LayoutDashboard size={20} />
                        <Link to="dashboard">Dashboard</Link>
                    </li>

                    <div className="border-t">
                        <button
                            onClick={Logout}
                            className="px-4 py-2 flex gap-2 hover:bg-custom-200/30 w-full cursor-pointer rounded-md"
                        >
                            <LogOut />
                            Logout
                        </button>
                    </div>
                </ul>
            )}
        </nav>
    );
};

export default Navbar;
