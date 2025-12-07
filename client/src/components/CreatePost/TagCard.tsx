import { Post } from "@/model/post";
import { ErrorMessage } from "@/pages/CreatePost";
import { X } from "lucide-react";
import React, { KeyboardEvent, useState } from "react";
import { FieldErrors, UseFormRegister, UseFormSetValue } from "react-hook-form";

interface Props {
	register: UseFormRegister<Post>;
	errors: FieldErrors<Post>;
	setValue: UseFormSetValue<Post>;
	defaultTag: string;
}

export const TagCard = ({ register, errors, setValue, defaultTag }: Props) => {
	const [tags, setTags] = useState<string[]>(defaultTag ? defaultTag.split(",").map(t => t.trim()).filter(Boolean) : []);
	const [inputValue, setInputValue] = useState("");

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter" || e.key === ",") {
			e.preventDefault();
			addTag();
		}
	};

	const addTag = () => {
		const trimmedTag = inputValue.trim();

		if (trimmedTag && !tags.includes(trimmedTag)) {
			const newTags = [...tags, trimmedTag];
			setTags(newTags);

			if (setValue) {
				setValue("tags", newTags.join(", "), {
					shouldValidate: true,
					shouldDirty: true,
				});
			}
			setInputValue("");
		}
	};

	const removeTag = (tagToRemove: string) => {
		const newTags = tags.filter((tag) => tag !== tagToRemove);
		setTags(newTags);

		if (setValue) {
			setValue("tags", newTags.join(", "), {
				shouldValidate: true,
				shouldDirty: true,
			});
		}
	};

	return (
		<div className="bg-white dark:bg-gray-900 p-4 rounded-md">
			<h4 className="text-base font-bold">Tags</h4>
			{tags.length > 0 && (
				<div className="flex gap-2 flex-wrap mt-2">
					{tags.map((tag, index) => (
						<span className="text-xs text-cyan-500 bg-cyan-500/30 px-3 py-1 rounded-xl flex gap-1 items-center">
							{tag}
							<button
								onClick={() => removeTag(tag)}
								className="cursor-pointer"
							>
								<X size={10} />
							</button>
						</span>
					))}
				</div>
			)}
			<input
				{...register("tags")}
				type="hidden"
			/>
			<input
				type="text"
				value={inputValue}
				onChange={(e) => setInputValue(e.target.value)}
				onKeyDown={handleKeyDown}
				onBlur={addTag}
				className="border mt-4 w-full py-2 px-4 placeholder:text-gray-500/50 text-sm rounded-md"
				placeholder="Enter tags separated by comma"
			/>
			<ErrorMessage message={errors.tags?.message as string} />
		</div>
	);
};
