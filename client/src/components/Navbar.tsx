import { useFetchUser } from "@/services/dashboard";
import { formatImage } from "@/util/imageFormat";
import {
	Check,
	LayoutDashboard,
	LogOut,
	Menu,
	NotebookText,
} from "lucide-react";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Link, useNavigate } from "react-router";
import { useAuthProvider } from "../store/store";
import { NavList } from "./Navbar/NavList";
import { NavAvatar } from "./Navbar/NavAvatar";
import { NavMenu } from "./Navbar/NavMenu";

const Navbar = () => {
	// const user = useStore((state) => state.user);
	const logout = useAuthProvider((state) => state.logout);
	// const {data, isLoading} = useFetchUser()
	const user = useAuthProvider((state) => state.user);
	const [isFixed, setIsFixed] = useState(false);
	const [showMenu, setShowMenu] = useState(false);
	const [showNav, setShowNav] = useState(false);

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
			className={`flex justify-between w-full z-50 text-white items-center bg-linear-120 py-4 px-6 from-custom-200 to-custom-400 fixed`}
		>
			<Menu
				onClick={() => setShowNav(true)}
				className="text-white text-xl lg:hidden cursor-pointer"
			/>
			<Link to="/">
				<h1 className="font-alice  text-4xl text-white font-bold ">
					AIM Blog
				</h1>
			</Link>
			<NavList
				showNav={showNav}
				closeNav={() => setShowNav(false)}
			/>

			<NavAvatar
				user={user}
				showMenu={showMenu}
				onclick={() => setShowMenu(!showMenu)}
				profile={profilePic}
			/>

			<NavMenu
				user={user}
				showMenu={showMenu}
				logout={LogOut}
			/>
		</nav>
	);
};

export default Navbar;
