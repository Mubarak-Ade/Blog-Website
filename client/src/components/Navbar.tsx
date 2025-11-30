import { useFetchUser } from "@/services/dashboard";
import { formatImage } from "@/util/imageFormat";
import {
    Check,
    LayoutDashboard,
    LogOut,
    NotebookText
} from "lucide-react";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import { useAuthProvider } from "../store/store";

const Navbar = () => {
    // const user = useStore((state) => state.user);
    const logout = useAuthProvider((state) => state.logout);
    // const {data, isLoading} = useFetchUser()
    const user = useAuthProvider((state) => state.user);
    const [isFixed, setIsFixed] = useState(false);
    const [showMenu, setShowMenu] = useState(false);

    const profilePic = formatImage(user?.profile);

    // console.log(data);
    

    const navigate = useNavigate();
    const Logout = () => {
        logout();
        setShowMenu(false);
        navigate("/login");
    };

    return (
        <nav
            className={`px-8 py-2 h-20 flex w-full bg-linear-120 from-custom-200 to-custom-400 fixed items-center z-50 text-custom-100 justify-between shadow-2xl`}
        >
            <div className="flex items-center gap-2 font-alice text-4xl font-bold ">
                <NotebookText size={30} />
                <h1 className="">AIM Blog</h1>
            </div>
            <ul className="flex items-center gap-10 font-light font-actor p-3 text-base">
                <Link to="/" className="hover:underline">
                    Home
                </Link>
                <Link to="/posts" className="hover:underline">Posts</Link>
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
                        {data.firstname} {data.firstname}
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
                    <h6 className="text-lg text-center m-4 flex items-center gap-2">{user?.name} {user?.role === "admin" && <Check className="p-0.5 border border-custom-200 text-custom-400 rounded-full" size={15} />}</h6>
                    <li className="px-4 py-2 flex gap-2 items-center hover:bg-custom-200/30">
                        <LayoutDashboard size={20} />
                        <Link to={user?.role !== "admin" ? "user/dashboard" : "admin/dashboard"}>Dashboard</Link>
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
