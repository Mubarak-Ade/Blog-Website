import { Image } from "lucide-react";
import React from "react";
import { Link } from "react-router";

interface Props {
	preview: string;
	handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const ImageCard = ({ preview, handleFileChange }: Props) => {
	return (
		<div className="h-fit p-4 bg-white rounded-md">
			<h4 className="text-base font-bold">Featured Image</h4>
			<div className="mt-4 relative h-40 border border-gray-300 rounded-md flex justify-center items-center cursor-pointer">
				<div className="w-full flex items-center justify-center flex-col h-full">
					<Image size={30} />
					<h6 className="text-sm ">Click to upload</h6>
					{preview && (
					<img
						src={preview}
						alt="Preview"
						className="absolute w-full h-full object-cover"
					/>
				)}
				</div>
				<input
					type="file"
					className="mt-2 absolute opacity-0 outline-none w-full h-full cursor-pointer"
					onChange={handleFileChange}
				/>
			</div>
		</div>
	);
};
