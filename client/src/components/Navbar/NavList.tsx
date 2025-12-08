import React from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { Moon, Sun, X } from "lucide-react";

export const NavList = ({
	showNav,
	closeNav,
	toggleTheme,
	theme,
}: {
	showNav: boolean;
	theme: string;
	toggleTheme: () => void;
	closeNav: () => void;
}) => {
	return (
		<ul
			className={`${
				showNav ? "flex-col" : "hidden lg:flex "
			} lg:h-0 h-screen flex lg:static absolute top-0 right-0 lg:bg-transparent md:items-start md:px-6 bg-white dark:bg-gray-900 lg:text-black dark:text-white  text-black max-w-xl w-full md:max-w-xs lg:items-center items-center gap-10 font-light font-actor py-8 lg:py-4 px-2 text-base`}
		>
			<Button
				onClick={closeNav}
				size={"icon"}
				className="rounded-full absolute right-0 top-0 m-2 cursor-pointer lg:hidden"
				variant={"ghost"}
			>
				<X />
			</Button>
			<Link
				to="/"
				className="hover:underline"
			>
				Home
			</Link>
			<Link
				to="/posts"
				className="hover:underline"
			>
				Posts
			</Link>
			<Link to="/about" className="hover:underline">About</Link>
			<Link className="hover:underline">Contact</Link>
			<Button
				size={"icon-sm"}
				className="cursor-pointer absolute left-0 top-0 lg:top-auto lg:left-auto m-4 lg:right-50 text-xs rounded-full"
				onClick={toggleTheme}
			>
				{theme === "dark" ? <Sun /> : <Moon />}
			</Button>
		</ul>
	);
};
