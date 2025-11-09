import { RiArrowDownSLine, RiArrowDropDownLine } from "react-icons/ri"; 
import Profile from "../../assets/profile.png";
import { BellIcon, MenuIcon, Search, User } from "lucide-react";
import { useDashboardStore } from "../../state/dashboardStore";
import { useEffect } from "react";

export const AppBar = () => {

    const {user, loading, error, fetchUserInfo} = useDashboardStore();

    const profilePic = `http://localhost:4000${user?.profilePic}`
    
    return (
        <nav className="fixed z-50 flex justify-between right-0 left-0 top-0 items-center overflow-hidden bg-white border-b px-6 ml-(--sidebar-width)">
            <div className="flex items-center flex-1 gap-4 py-4 text-custom-200">
                <button className="p-2 border border-custom-200 rounded-md text-custom-400">
                    <MenuIcon size={25} />
                </button>
                <div className="relative flex justify-center items-center max-w-md w-full">
                    <button className="left-0 absolute mx-2 text-custom-400">
                        <Search />
                    </button>
                    <input
                        type="text"
                        placeholder="Search for command"
                        className="inline-block w-full py-2.5 pr-14 pl-10 border border-custom-200 rounded-md  placeholder:text-custom-200/50 text-sm"
                    />
                </div>
            </div>
            <div className="flex items-center gap-5 text-custom-400 ">
                <BellIcon />
                <div className="flex justify-center items-center gap-2">
                    <img src={profilePic} className="size-10 object-center rounded-full" alt="" />
                    <h4>{user?.firstname} {user?.lastname}</h4>
                    <button className="text-2xl cursor-pointer text-custom-400">
                        <RiArrowDownSLine />
                    </button>
                </div>
            </div>
        </nav>
    );
};
