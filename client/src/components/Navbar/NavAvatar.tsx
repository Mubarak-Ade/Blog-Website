import React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Link } from "react-router";

interface Props {
	user: null | {};
	profile: string | undefined;
	showMenu: boolean;
	onclick: () => void;
}

export const NavAvatar = ({ user, profile, showMenu, onclick }: Props) => {
	return (
		<>
			{user ? (
				<div className="flex items-center gap-1">
					<img
						src={profile}
						alt={profile}
						className="lg:size-15 size-10 rounded-full object-cover"
					/>
					{/* <h4 className="capitalize font-bold">
                            {data.firstname} {data.firstname}
                        </h4> */}
					<button
						onClick={onclick}
						className="text-xl cursor-pointer"
					>
						{showMenu ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
					</button>
				</div>
			) : (
				<ul className="flex font-actor gap-4">
					<Link
						to="login"
						className="hover:underline bg-sky-500 py-2 px-4 rounded-md"
					>
						Get Started
					</Link>
				</ul>
			)}
		</>
	);
};
