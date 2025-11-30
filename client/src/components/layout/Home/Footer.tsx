import { Facebook, Github, Instagram, Linkedin, Twitter } from "lucide-react";
import React from "react";

export const Footer = () => {
	return (
		<div className="bg-linear-120 px-4  text-white from-custom-200 to-custom-400">
			<div className="w-full flex py-12 items-center justify-center">

				<div className="w-full p-4 space-y-4">
					<h1 className="text-4xl ">
						Empowering developers with cutting-edge insights on modern
						web technologies
					</h1>
					<button className="border p-2 mt-2">Explore now</button>
				</div>
				<div className="max-w-xl w-full flex gap-4 bg-custom-400 rounded-md shadow-2xl shadow-custom-200 p-4">

					<ul className="p-4 space-y-2">
						<h6 className="font-semibold">Explore By</h6>
						<li className="flex items-center gap-1 text-sm">Category</li>
						<li className="flex items-center gap-1 text-sm">Tags</li>
						<li className="flex items-center gap-1 text-sm">Author</li>
						<li className="flex items-center gap-1 text-sm">Trending</li>
					</ul>

					<ul className="p-4 space-y-2">
						<h6 className="font-semibold">Quick Links</h6>
						<li className="flex items-center gap-1 text-sm">About Us</li>
						<li className="flex items-center gap-1 text-sm">Contact Us</li>
						<li className="flex items-center gap-1 text-sm">Privacy Policy</li>
						<li className="flex items-center gap-1 text-sm">Terms of Service</li>
					</ul>
				</div>
			</div>
			<hr className="w-full mt-4" />
			<div className="flex p-4 justify-between">
				<p>Copyright 2025 All Right Reserve</p>
				<ul className="flex gap-2">
						<li className="flex items-center font-bold gap-1 text-xs"><Linkedin size={20} /></li>
						<li className="flex items-center font-bold gap-1 text-xs"><Twitter size={20} /></li>
						<li className="flex items-center font-bold gap-1 text-xs"><Instagram size={20} /></li>
						<li className="flex items-center font-bold gap-1 text-xs"><Github size={20} /></li>
						<li className="flex items-center font-bold gap-1 text-xs"><Facebook size={20} /></li>
					</ul>
			</div>
		</div>
	);
};
