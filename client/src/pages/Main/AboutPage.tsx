import React from "react";
import Image from "../../assets/image.png";
import { AtSign, Code, Facebook, Instagram, Link2 } from "lucide-react";

export const AboutPage = () => {
	return (
		<div className="p-8 block h-full">
			<div className="w-full m-auto max-w-5xl">
				<div className="flex lg:flex-row flex-col items-center gap-5 ">
					<div className="w-full shadow-2xl shadow-gray-900 rounded-md overflow-hidden shrink-0 max-w-md h-80">
						<img
							src={Image}
							className="object-cover size-full"
							alt={Image}
						/>
					</div>
					<div className="">
						<h1 className="text-5xl font-bold">
							Welcome to our corner of the Internet
						</h1>
						<p className="mt-4">
							Welcome to a space built for curious minds. Here, I
							break down ideas, share lessons I’m learning, and
							keep things honest — no fluff, no recycled content.
							If you’re into learning new things, exploring fresh
							perspectives, or just enjoying quality writing,
							you’ll feel at home here. Stick around. Read,
							question, and grow with me.
						</p>
						<button className="bg-cyan-600 px-8 mt-10 rounded-md font-bold py-2">
							Read the Blog
						</button>
					</div>
				</div>
				<hr className="mt-10" />

				<div className="flex lg:flex-row flex-col items-center justify-center gap-4 mt-5">
					<img
						src={Image}
						alt={Image}
						className="size-20 object-cover rounded-full"
					/>
					<div className="">
						<h1 className="text-xl font-bold">Meet The Author</h1>
						<p className="text-md">
							A short biography of the author their passion for
							the subject, and what drives them to share their
							knowledge.
						</p>
						<span className="text-sm">Founder & Lead Writer</span>
					</div>
					<button className="bg-sky-500 rounded-md cursor-pointer px-4 py-2 text-sm">
						Follow on LinkedIn
					</button>
				</div>
				<hr className="mt-10" />
				<div className="mt-5">
					<h2 className="text-xl font-semibold">Let's Connect</h2>
					<h6 className="text-sm">
						Follow our journey on social media or get in touch
						directly. we'd love to hear from you
					</h6>
                    <div className="mt-5 flex flex-wrap gap-4">
                        <button className="flex cursor-pointer bg-gray-200 px-6 py-2 dark:bg-gray-800 gap-2 rounded-md border dark:border-gray-200 border-gray-800">
                            <AtSign color="var(--color-sky-500)" />
                            Email
                        </button>
                        <button className="flex cursor-pointer bg-gray-200 px-6 py-2 dark:bg-gray-800 gap-2 rounded-md border dark:border-gray-200 border-gray-800">
                            <Link2 color="var(--color-sky-500)" />
                            LinkdedIn
                        </button><button className="flex cursor-pointer bg-gray-200 px-6 py-2 dark:bg-gray-800 gap-2 rounded-md border dark:border-gray-200 border-gray-800">
                            <Code color="var(--color-sky-500)" />
                            Twitter
                        </button><button className="flex cursor-pointer bg-gray-200 px-6 py-2 dark:bg-gray-800 gap-2 rounded-md border dark:border-gray-200 border-gray-800">
                            <Instagram color="var(--color-sky-500)" />
                            Instagram
                        </button>
                        <button className="flex cursor-pointer bg-gray-200 px-6 py-2 dark:bg-gray-800 gap-2 rounded-md border dark:border-gray-200 border-gray-800">
                            <Facebook color="var(--color-sky-500)" />
                            Email
                        </button>
                    </div>
				</div>
			</div>
		</div>
	);
};
