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
	const { search, setFilter, category, setSearch, searchDraft, authorDraft, setAuthor, clearFilter } =
		useFilterStore();
	const { data, isLoading } = useFetchPosts();
	if (isLoading) {
		return <Loader loading={isLoading} />;
	}
	const categories = [...new Set(data.map((post: Post) => post.category))];

	console.log(search);

	const handleSearchSubmit = (e) => {
		e.preventDefault();
		setFilter("search", searchDraft);
	};

    const handleAuthorSearchSubmit = (e) => {
		e.preventDefault();
		setFilter("author", authorDraft);
	};

	return (
		<div className="mt-5 p-4 flex gap-4 w-full">
			<form onSubmit={handleSearchSubmit}>
				<InputGroup className="max-w-xl w-full flex">
					<InputGroupInput
						type="text"
						value={searchDraft}
						onChange={(e) => setSearch(e.target.value)}
						placeholder="Search by title, content."
					/>
					<InputGroupButton
						size={"icon-sm"}
						type="submit"
					>
						<Search />
					</InputGroupButton>
				</InputGroup>
			</form>
            <form onSubmit={handleAuthorSearchSubmit}>
				<InputGroup className="max-w-xl w-full flex">
					<InputGroupInput
						type="text"
						value={authorDraft}
						onChange={(e) => setAuthor(e.target.value)}
						placeholder="Search by author..."
					/>
					<InputGroupButton
						size={"icon-sm"}
						type="submit"
					>
						<Search />
					</InputGroupButton>
				</InputGroup>
			</form>
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
						<SelectItem value=" ">All</SelectItem>
						{categories.map((cat, index) => (
							<SelectItem
								key={index}
								value={cat}
							>
								{cat}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			<Select name="category">
				<SelectTrigger>
					<SelectValue placeholder="Select a tags" />
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Tags</SelectLabel>
						<SelectItem value="f">tags</SelectItem>
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
			<Button onClick={clearFilter} variant={"outline"} className="cursor-pointer">Clear all Filters</Button>
		</div>
	);
};
