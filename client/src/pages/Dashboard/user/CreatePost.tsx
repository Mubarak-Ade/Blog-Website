import React from "react";
import {
	Card,
	CardTitle,
	CardDescription,
	CardHeader,
	CardContent,
	CardFooter,
} from "@/components/ui/card";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Field,
	FieldLabel,
	FieldGroup,
	FieldError,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDashboardStore } from "../../../state/dashboardStore";
import { useState } from "react";
import { formatImage } from "@/util/imageFormat";
import { useCreatePost, useEditPost } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import { BlogEditor } from "@/components/BlogEditor";

export const Create = () => {
	// const { createPost, error, loading } = usePostStore();
	const createPost = useCreatePost();

	const edit = useDashboardStore((s) => s.edit);

	const editPost = useEditPost();

	const [preview, setPreview] = useState(
		edit?.image && formatImage(edit?.image)
	);

	console.log(preview);

	const navigate = useNavigate();

	const schema = z.object({
		image: z.any().optional(),
		title: z.string().min(3, "Post title is required"),
		content: z.string().min(20),
		category: z.string().min(3, "Category field is empty"),
		tags: z.string().min(3, "Add at least 1 tags"),
	});
	const {
		register,
		handleSubmit,
		setError,
		formState: { errors },
		reset,
		setValue,
		watch,
	} = useForm({
		resolver: zodResolver(schema),
		defaultValues: {
			title: edit?.title || "",
			content: edit?.content || "",
			category: edit?.category || "",
			tags: edit?.tags || "",
		},
	});

	console.log(edit);

	const content = watch("content");

	const onSubmit = (data: Post) => {
		edit ? editPost.mutate({id: edit._id, data}) : createPost.mutate(data);
		navigate("/");
		reset();
		// setError("root", { type: "manual", message: error });
	};

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setPreview(URL.createObjectURL(file));
		}
	};

	return (
		<div className="w-full bg-custom-100 flex items-center justify-center p-4">
			<Card className="max-w-2xl w-full">
				<CardHeader>
					<CardTitle className="text-xl text-center">
						Create a Post
					</CardTitle>
					{/* <CardDescription></CardDescription> */}
				</CardHeader>
				<CardContent className="overflow-y-scroll h-110">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className=""
					>
						<FieldGroup className="flex items-center justify-center p-2">
							<div
								style={{
									backgroundImage: `url(${preview})`,
								}}
								className="w-full h-60 border border-dashed bg-cover rounded-2xl flex items-center justify-center"
							></div>
							<Field className="mb-5">
								<Input
									{...register("image")}
									type="file"
									accept="image/*"
									onChange={handleChange}
								/>
							</Field>
						</FieldGroup>
						<FieldGroup className="gap-2">
							<Field>
								<FieldLabel>Post Title</FieldLabel>
								<Input
									{...register("title")}
									type="text"
									placeholder="Post Title"
								/>
								{errors.title && (
									<FieldError>
										{errors.title.message}
									</FieldError>
								)}
							</Field>
							<Field>
								<FieldLabel>Post Content</FieldLabel>
								{/* <Textarea
                                    name=""
                                    {...register("content")}
                                    placeholder="Enter the content"
                                ></Textarea> */}
								<BlogEditor
									value={content}
									onChange={(html) =>
										setValue("content", html)
									}
								/>

								{errors.content && (
									<FieldError>
										{errors.content.message}
									</FieldError>
								)}
							</Field>
							<FieldGroup>
								<Field>
									<FieldLabel>Post Category</FieldLabel>
									<Input
										{...register("category")}
										type="text"
										placeholder="Post Categry"
									/>
									{errors.category && (
										<FieldError>
											{errors.category.message}
										</FieldError>
									)}
								</Field>
								<Field>
									<FieldLabel>Post Tags</FieldLabel>
									<Input
										{...register("tags")}
										type="text"
										placeholder="Enter Tags"
									/>
									{errors.tags && (
										<FieldError>
											{errors.tags.message}
										</FieldError>
									)}
								</Field>
							</FieldGroup>
							<Button
								className="w-full hover:bg-custom-400 cursor-pointer bg-custom-500 text-custom-100"
								size="lg"
								type="submit"
							>
								Post
							</Button>
						</FieldGroup>
					</form>
				</CardContent>
				{errors.root && <FieldError>{errors.root.message}</FieldError>}
			</Card>
		</div>
	);
};
