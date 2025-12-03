import React from "react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { X } from "lucide-react";

export const NavList = ({showNav, closeNav}: {showNav: boolean, closeNav: () => void}) => {
	return (
		<ul className={`${showNav ? "flex-col" : "hidden lg:flex "} lg:h-0 h-screen flex lg:static absolute top-0 right-0 lg:bg-transparent md:items-start md:px-6 bg-white lg:text-white text-custom-400 max-w-xl w-full md:max-w-xs lg:items-center items-center gap-10 font-light font-actor py-8 px-2 lg:p-3 text-base`}>
			<Button onClick={closeNav} size={"icon"} className="rounded-full absolute right-0 top-0 m-2 cursor-pointer lg:hidden" variant={"ghost"}><X /></Button>
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
			<Link className="hover:underline">About</Link>
			<Link className="hover:underline">Contact</Link>
		</ul>
	);
};
