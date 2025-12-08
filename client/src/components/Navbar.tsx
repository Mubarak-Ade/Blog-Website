import { useFetchUser } from "@/services/dashboard";
import { formatImage } from "@/util/imageFormat";
import {
	Check,
	LayoutDashboard,
	LogOut,
	Menu,
	Moon,
	NotebookText,
	Sun,
} from "lucide-react";
import { useEffect, useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuthProvider } from "../store/store";
import { NavList } from "./Navbar/NavList";
import { NavAvatar } from "./Navbar/NavAvatar";
import { NavMenu } from "./Navbar/NavMenu";
import { Button } from "./ui/button";
import { useThemeStore } from "@/store/ThemeStore";

const Navbar = () => {
	// const user = useStore((state) => state.user);
	const logout = useAuthProvider((state) => state.logout);
	const user = useAuthProvider((state) => state.user);
	const { theme, toggleTheme } = useThemeStore();
	// const {data, isLoading} = useFetchUser()
	const [isFixed, setIsFixed] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [showNav, setShowNav] = useState(false);

	// console.log(data);

	const navigate = useNavigate();
	const location = useLocation();

	const Logout = () => {
		logout();
		setShowMenu(false);
		navigate("/login");
	};

	useEffect(() => {
		setShowNav(false)
	}, [location]);
	return (
		<nav
			className={`flex justify-between w-full z-50 border-b text-gray-900 items-center bg-gray-100 dark:bg-gray-900 dark:text-white py-4 lg:py-2 px-4 fixed`}
		>
			<Menu
				onClick={() => setShowNav(true)}
				className="text-gray-900 dark:text-white  text-xl lg:hidden cursor-pointer"
			/>
			<Link className="font-alice ml-10 self-center text-center md:text-4xl text-3xl text-gray-900 dark:text-white  font-bold " to="/">
				<h1>
					AIM BLOG
				</h1>
			</Link>
			<NavList
				showNav={showNav}
				theme={theme}
				toggleTheme={toggleTheme}
				closeNav={() => setShowNav(false)}
			/>
			<div className="flex items-center gap-2">
				
				<NavAvatar
					user={user}
					showMenu={showMenu}
					onclick={() => setShowMenu(!showMenu)}
					profile={user?.profile}
				/>
			</div>

			<NavMenu
				user={user}
				showMenu={showMenu}
				logout={Logout}
			/>
		</nav>
	);
};

export default Navbar;
