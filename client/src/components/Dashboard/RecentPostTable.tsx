import React from "react";

import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Post } from "@/model/post";

interface PostProp {
    posts: Post
}

export const RecentPostTable = ({ posts }: PostProp) => {    

    console.log(posts);
    

    return (
        <Table className="bg-white rounded-md max-w-3xl w-full">
            <TableHeader>
                <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Post</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead className="p-6">Tags</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody className="">
                {posts.map((data : Post, index: number) => (
                    <TableRow key={index}>
                        <TableCell className="w-100">
                            <h4 className="text-wrap line-clamp-1">{data.title}</h4>
                        </TableCell>
                        <TableCell className="w-100"><p className="text-wrap line-clamp-1">{data.content}</p></TableCell>
                        <TableCell>{data.category}</TableCell>
                        <TableCell className="p-6">
                            {data.tags}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};
