import React from "react";
import { Link } from "react-router";

export const PublishCard = () => {
	return (
		<div className="bg-white dark:bg-gray-900 p-4 rounded-md">
			<h4 className="text-base font-bold">Publish</h4>
			<div className="mt-2 space-y-2 text-gray-400 text-sm">
				<h6>Status: Draft</h6>
				<h6>Status: Draft</h6>
			</div>
			<div className="flex justify-between space-x-2 mt-4">
				<button type="submit" form="create-post-form" className="w-full py-2 cursor-pointer bg-cyan-500 rounded-md text-white">
					Publish
				</button>
				<button className="w-full py-2 bg-cyan-500 rounded-md text-white">
					Draft
				</button>
			</div>
			<Link className="text-center text-xs block mt-2 text-cyan-500 font-semibold">
				Preview
			</Link>
		</div>
	);
};
