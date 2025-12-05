import { useFetchPosts } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import { ErrorMessage } from "@/pages/CreatePost";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface CategoryProps {
	register: UseFormRegister<Post>;
	errors: FieldErrors<Post>;
}

const num = 5

export const CategoryCard = ({ register, errors }: CategoryProps) => {
	const { data, isLoading, isError } = useFetchPosts();

	if (isLoading) {
		return (
			<div className="bg-white p-4 text-sm rounded-md">
				<h4 className="text-base font-bold">Category</h4>
				<p className="text-gray-400 mt-2">Loading categories...</p>
			</div>
		);
	}

	if (isError || !data) {
		return (
			<div className="bg-white p-4 text-sm rounded-md">
				<h4 className="text-base font-bold">Category</h4>
				<p className="text-red-500 mt-2">Failed to load categories</p>
			</div>
		);
	}

	const uniqueCategories = [...new Set(data.map((d) => d.category))];
	const displayCategories = uniqueCategories.slice(0, num)

	return (
		<div className="bg-white p-4 text-sm rounded-md">
			<h4 className="text-base font-bold">Category</h4>
			{displayCategories.splice(0, 5).map((cat, index) => (
				<div
					key={`category-${index}`}
					className="flex items-center space-x-2 mt-2"
				>
					<input
						type="radio"
						id={`category-${index}`}
						className="mr-2 cursor-pointer"
						value={cat}
						{...register("category")}
					/>
					<label className="cursor-pointer" htmlFor={`category-${index}`}>{cat}</label>
				</div>
			))}

			<ErrorMessage message={errors.title?.message as string} />

			<button className="text-xs mt-4 text-cyan-500">
				+ Add new Category
			</button>
		</div>
	);
};
