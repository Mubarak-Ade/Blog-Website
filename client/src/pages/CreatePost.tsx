import { CategoryCard } from "@/components/CreatePost/CategoryCard";
import { ImageCard } from "@/components/CreatePost/ImageCard";
import { PublishCard } from "@/components/CreatePost/PublishCard";
import { TagCard } from "@/components/CreatePost/TagCard";
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
import { useCreatePost, useEditPost } from "@/hooks/queries/usePost";
import { Post } from "@/model/post";
import { useDashboardStore } from "@/store/dashboardStore";
import { formatImage } from "@/util/imageFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, ArrowUpLeft } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { z } from "zod";

const schema = z.object({
	title: z.string().min(3, "Post title is required"),
	content: z.string().min(20),
	category: z.string().min(3, "Category field is empty"),
	tags: z.string().min(3, "Add at least 1 tags"),
});

export const ErrorMessage = ({ message }: { message: string }) => {
	if (!message) return null;
	return <p className="text-red-500 text-sm mt-1">{message}</p>;
};

export const CreatePost = () => {
	const edit = useDashboardStore((s) => s.edit);

	const editPost = useEditPost();
	const createPost = useCreatePost();

	const [preview, setPreview] = useState<string>("");
	const [imageFile, setImageFile] = useState<File | null>(null);
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		setError,
		watch,
		setValue,
		formState: { errors },
		reset,
	} = useForm<Post>({
		resolver: zodResolver(schema),
		defaultValues: {},
	});

	const content = watch("content");

	useEffect(() => {
		if (edit) {
			reset({
				title: edit?.title || "",
				content: edit?.content || "",
				category: edit?.category || "",
				tags: edit?.tags || "",
			});

			if (edit.image) {
				setPreview(formatImage(edit.image));
			}
		} else {
			reset();
		}
	}, [edit, reset]);

	useEffect(() => {
		return () => {
			if (preview && preview.startsWith("blob:")) {
				URL.revokeObjectURL(preview);
			}
		};
	}, [preview]);

	const success = () => {
		if (preview && preview.startsWith("blob:")) {
			URL.revokeObjectURL(preview);
		}
		reset();
		console.log("data created successfully");
		setPreview("");
		setImageFile(null);
		navigate(-1);
	};

	const onSubmit = useCallback(
		(data: Omit<Post, "image">) => {
			const imageToSave = imageFile || (edit?.image ? edit.image : null);
			const postData = { ...data, image: imageToSave };
			if (edit) {
				editPost.mutate(
					{ id: edit._id, data: postData },
					{
						onSuccess: success,
						onError: (error) => {
							console.log("Errors", error);
						},
					}
				);
			} else {
				createPost.mutate(postData, {
					onSuccess: success,
					onError: (error) => {
						console.log("Errors", error);
					},
				});
			}
			console.log(data);
		},
		[imageFile, createPost, editPost, edit, success]
	);

	const handleFileChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			const file = e.target.files?.[0];
			if (file) {
				setImageFile(file);
				if (preview) URL.revokeObjectURL(preview);
				setPreview(URL.createObjectURL(file));
			}
		},
		[preview]
	);

	if (createPost.isPending || editPost.isPending) {
		return <Loader loading={true} />;
	}

	return (
		<form
			id="create-post-form"
			onSubmit={handleSubmit(onSubmit)}
			className=" bg-gray-100 flex lg:flex-row flex-col gap-5 dark:bg-gray-950 p-8"
		>
			<div className="">
				<Link
					className="flex items-center gap-2"
					to="/"
				>
					{" "}
					<ArrowLeft />
					Go back Home
				</Link>
			</div>
			<div className="space-y-6 flex-1 min-w-0 w-full">
				<input
					type="text"
					{...register("title")}
					className="border w-full p-3 bg-white dark:bg-gray-900 rounded-md text-3xl font-bold placeholder:text-gray-300"
					placeholder="Your Post Title"
				/>
				<ErrorMessage message={errors.title?.message as string} />
				<BlogEditor
					value={content}
					onChange={(html) => setValue("content", html)}
				/>
				<ErrorMessage message={errors.title?.message as string} />
			</div>
			<div className="space-y-4 flex lg:flex-col flex-col-reverse w-full lg:w-100 lg:shrink-0 mx-auto">
				<PublishCard />
				<CategoryCard
					errors={errors}
					register={register}
				/>
				<TagCard
					setValue={setValue}
					errors={errors}
					defaultTag={edit && edit.tags}
					register={register}
				/>
				<ImageCard
					handleFileChange={handleFileChange}
					preview={preview}
				/>
			</div>
		</form>
	);
};
