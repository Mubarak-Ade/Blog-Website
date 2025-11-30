import { BlogEditor } from "@/components/Editor/BlogEditor";
import { Loader } from "@/components/Loader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCreatePost } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

export const CreatePost = () => {
	const schema = z.object({
		title: z.string().min(3, "Post title is required"),
		content: z.string().min(20),
		category: z.string().min(3, "Category field is empty"),
		tags: z.string().min(3, "Add at least 1 tags"),
	});
	const {
		register,
		handleSubmit,
		setError,
		watch,
		setValue,
		formState: { errors },
		reset,
	} = useForm<Post>({ resolver: zodResolver(schema) });


	const [preview, setPreview] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null)

	const content = watch("content");

	const createPost = useCreatePost();

	if (createPost.isPending) {
		return <Loader loading={createPost.isPending} />
	}

	const navigate = useNavigate();

	const onSubmit = (data: Omit<Post, 'image'>) => {
        const postData = {...data, image: imageFile}
		createPost.mutate(postData);
		navigate("/");
        console.log(data);
		reset();
	};

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setImageFile(file)
            setPreview(URL.createObjectURL(file))
        }
    }

	return (
		<div className="min-h-screen w-full bg-custom-100 flex items-center justify-center p-10">
			<Link to="/">
				<Button className="absolute top-0 hover:bg-custom-400 cursor-pointer bg-custom-300 text-custom-100 rounded-full right-0 m-4">
					Go Home
				</Button>
			</Link>
			<Card className="max-w-2xl w-full">
				<CardHeader>
					<CardTitle className="text-xl text-center">
						Create a Post
					</CardTitle>
					{/* <CardDescription></CardDescription> */}
				</CardHeader>
				<CardContent>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="overflow-y-scroll max-h-120 h-full"
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
									type="file"
									accept="image/*"
                                    onChange={handleFileChange}
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

								<BlogEditor
									value={content}
									onChange={(html) =>
										setValue("content", html)
									}
								/>

								{/* <Textarea
                                    {...register("content")}
                                    placeholder="Enter the content"
                                ></Textarea> */}
								{errors.content && (
									<FieldError>
										{errors.content.message}
									</FieldError>
								)}
							</Field>
							<FieldGroup className="grid grid-cols-2">
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
