import React from "react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useFilterStore } from "@/store/useFilterStore";
import { Post } from "@/model/post";
import { useFetchPosts } from "@/hooks/queries/usePost";
import { Button } from "../ui/button";
import { Search } from "lucide-react";
import {
	InputGroup,
	InputGroupButton,
	InputGroupInput,
} from "../ui/input-group";
import { Loader } from "../Loader";

export const PostsHeader = () => {
	const {
		search,
		setFilter,
		category,
		setSearch,
		searchDraft,
		authorDraft,
		author,
		setAuthor,
		clearFilter,
	} = useFilterStore();
	const { data, isLoading } = useFetchPosts();
	if (isLoading) {
		return <Loader loading={isLoading} />;
	}
	const categories = [...new Set(data.map((post: Post) => post.category))];
	const authors = [
		...new Map(
			data.map((post: Post) => [
			post.author?._id,
			{
				id: post.author?._id,
				name: `${post.author?.firstname} ${post.author?.lastname}`,
			}])
		).values(),
	];

	console.log(authors);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setFilter("search", searchDraft);
	};

	const handleAuthorSearchSubmit = (e) => {
		e.preventDefault();
		setFilter("author", author);
	};

	return (
		<div className="mt-5 p-4 block space-y-4 w-full">
			<form onSubmit={handleSearchSubmit}>
				<InputGroup className="flex max-w-4xl rounded-xl py-5 px-2 m-auto w-full">
					<InputGroupInput
						type="text"
						value={searchDraft}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search by title, content or tags."
					/>
					<InputGroupButton
						size={"icon-sm"}
						type="submit"
					>
						<Search />
					</InputGroupButton>
				</InputGroup>
			</form>
			<div className="flex m-auto items-center flex-wrap justify-center gap-4">
				<Select
					name="category"
					value={category}
					onValueChange={(value) => setFilter("category", value)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select a category" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>category</SelectLabel>
							<SelectItem value=" ">Category: All</SelectItem>
							{categories.map((cat, index) => (
								<SelectItem
									key={index}
									value={cat}
								>
									Category: {cat}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Select
					name="authors"
					value={author}
					onValueChange={(value) => setFilter("author", value)}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select Author" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>Authors</SelectLabel>
							<SelectItem value="f">Author: All</SelectItem>
							{authors.map((author, index) => (
								<SelectItem
									key={author.id}
									value={author.id}
									className="capitalize"
								>
									Author: {author.name}
								</SelectItem>
							))}
						</SelectGroup>
					</SelectContent>
				</Select>
				<Select name="category">
					<SelectTrigger>
						<SelectValue placeholder="Sort By" />
					</SelectTrigger>
					<SelectContent>
						<SelectGroup>
							<SelectLabel>category</SelectLabel>
							<SelectItem value="f">Category</SelectItem>
						</SelectGroup>
					</SelectContent>
				</Select>
				<Button
					onClick={clearFilter}
					variant={"outline"}
					className="cursor-pointer"
				>
					Clear all Filters
				</Button>
			</div>
		</div>
	);
};
