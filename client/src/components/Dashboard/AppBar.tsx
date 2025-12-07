import { RiArrowDownSLine, RiArrowDropDownLine } from "react-icons/ri";
import Profile from "../../assets/profile.png";
import { BellIcon, MenuIcon, Moon, Search, Sun, User } from "lucide-react";
import { useDashboardStore } from "../../store/dashboardStore";
import { useEffect, useState } from "react";
import { formatImage } from "@/util/imageFormat";
import { useFetchUser } from "@/services/dashboard";
import { Button } from "../ui/button";
import { NavAvatar } from "../Navbar/NavAvatar";
import { useThemeStore } from "@/store/ThemeStore";
import { NavMenu } from "../Navbar/NavMenu";
import { useAuthProvider } from "@/store/store";
import { Link, useNavigate } from "react-router";
import { useSidebar } from "../ui/sidebar";

export const AppBar = ({toggleSidebar}) => {
	const { data, isLoading } = useFetchUser();
    const {isMobile, openMobile, setOpenMobile} = useSidebar()
    const navigate = useNavigate()


	const { theme, toggleTheme } = useThemeStore();
	const logout = useAuthProvider((state) => state.logout);
	const user = useAuthProvider((state) => state.user);
	const [showMenu, setShowMenu] = useState(false);
    const Logout = () => {
		logout();
		setShowMenu(false);
		navigate("/login");
	};

	// if(!isMobile) return null

	return (
		<nav className="fixed z-50 w-full bg-white dark:bg-gray-900 flex justify-between right-0 left-0 top-0 items-center overflow-hidden border-b px-6">
			<div className="flex items-center flex-1 gap-4 py-4 ">
				<button onClick={() => setOpenMobile(!openMobile)} className="p-2 border rounded-md ">
					<MenuIcon size={25} />
				</button>
				{/* <div className="relative flex justify-center items-center max-w-md w-full">
					<button className="left-0 absolute mx-2 ">
						<Search />
					</button>
					<input
						type="text"
						placeholder="Search for command"
						className="inline-block w-full py-2.5 pr-14 pl-10 border rounded-md  placeholder:/50 text-sm"
					/>
				</div> */}
				<Link to="/"><h1 className="text-3xl font-bold ml-3">AIM BLOG</h1></Link>
			</div>
			<div className="flex items-center gap-4">
				<BellIcon />
				<Button
					size={"icon"}
					className="cursor-pointer rounded-full"
					onClick={toggleTheme}
				>
					{theme === "dark" ? <Sun /> : <Moon />}
				</Button>
				<NavAvatar
					user={user}
					showMenu={showMenu}
					onclick={() => setShowMenu(!showMenu)}
					profile={user?.profilePic}
				/>

				<NavMenu
					user={user}
					showMenu={showMenu}
					logout={Logout}
				/>
			</div>
		</nav>
	);
};
