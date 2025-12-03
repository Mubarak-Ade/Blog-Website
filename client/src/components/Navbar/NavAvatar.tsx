import React from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";
import { Link } from "react-router";

interface Props {
	user: null | {};
	profile: string;
	showMenu: boolean;
	onclick: () => void;
}

export const NavAvatar = ({ user, profile, showMenu, onclick }: Props) => {
	return (
		<>
			{user ? (
				<div className="flex items-center gap-2">
					<img
						src={profile}
						alt={profile}
						className="lg:size-15 size-10 rounded-full bg-custom-100/50 object-cover"
					/>
					{/* <h4 className="capitalize font-bold">
                            {data.firstname} {data.firstname}
                        </h4> */}
					<button
						onClick={onclick}
						className="text-2xl cursor-pointer text-custom-100"
					>
						{showMenu ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
					</button>
				</div>
			) : (
				<ul className="flex font-actor gap-4">
					<Link
						to="login"
						className="hover:underline"
					>
						Login
					</Link>
					<Link
						to="register"
						className="hover:underline"
					>
						Register
					</Link>
				</ul>
			)}
		</>
	);
};
