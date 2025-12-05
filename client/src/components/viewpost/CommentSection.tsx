import { Comment as CommentModel, Post } from "@/model/post";
import React from "react";
import { Comment } from "./Comment";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useGetPostComment, usePostComment } from "@/hooks/queries/usePost";
import { Loader } from "../Loader";

export const CommentSection = ({ id }: { id?: string }) => {
	const {data, isLoading} = useGetPostComment(id)
	const update = usePostComment();

	const schema = z.object({
		text: z
			.string()
			.min(5, "comment should be atleast 5 character")
			.max(500, "comment is too long"),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
		setError,
		reset,
	} = useForm({ resolver: zodResolver(schema) });

	const onSubmit = (data: Omit<CommentModel, "_id">) => {
		try {
			update.mutate(
				{
					id: id,
					data,
				},
				{
					onSuccess() {
						console.log("Post comment");
					},
				}
			);

			reset();
		} catch (error) {
			setError("text", {
				type: "manual",
				message: errors || error || "Comment can not be post",
			});
		}
	};

	if (isLoading) {
		<Loader loading={isLoading} />
	}

	return (
		<>
			<div className="mt-10">
				<h2 className="text-2xl font-bold">Comments ({data?.length})</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="block"
				>
					<textarea
						className="border w-full rounded-2xl p-4 bg-white border-custom-400 mt-4"
						rows={4}
						{...register("text")}
						placeholder="Enter a comment"
					/>
					<button className="bg-blue-500 px-6 py-2 mt-2 text-custom-100 rounded-xl block ml-auto">
						Post Comment
					</button>
					{errors.text && (
						<p className="text-red-500 text-xl">
							{errors.text.message}
						</p>
					)}
				</form>
			</div>
			<Comment comment={data} />
		</>
	);
};
