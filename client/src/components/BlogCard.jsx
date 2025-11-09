import {
    Card,
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Img from "../assets/user (1).png";
import { Link } from "react-router";


/**
 * A card component to display blog post previews
 * @param {Object} props
 * @param {string} props.title - The title of the blog post
 * @param {string} props.content - The content of the blog post
 * @param {string} props.category - The category of the blog post
 * @param {string} props.tags - Comma-separated list of tags
 * @param {string} props.id - The unique identifier of the blog post
 * @param {string} props.image - The URL of the blog post image
 * @param {Object} props.author - The author object
 * @param {string} props.author.username - The username of the author
 */
export const BlogCard = ({
    title,
    content,
    category,
    tags = "",
    id,
    image,
    author = { username: "User" },
}) => {
    
    tags = tags.split(",");

    console.log(image);

    return (
        <Card className="w-full shadow-2xl border border-custom-400 h-full max-h-120 space-y-6 overflow-hidden text-custom-400">
            <CardHeader className="">
                <div className="h-45 w-full overflow-hidden rounded-md">
                    <img
                        src={image}
                        alt=""
                        className=""
                    />
                </div>
            </CardHeader>
            <CardContent>
                <CardTitle className="text-2xl flex line-clamp-2">
                    <h2>{title}</h2>
                </CardTitle>
                <CardDescription className="capitalize text-base">
                    <p>{category}</p>
                    <span></span>
                </CardDescription>
            </CardContent>
            <CardFooter className="block space-y-4">
                <div className="flex gap-1 capitalize">
                    {tags ? (
                        tags.map((tag, index) => {
                            return (
                                <p
                                    key={index}
                                    className="h-5 overflow-hidden text-wrap py-2 px-2 flex items-center justify-center bg-custom-200 text-xs border rounded-full text-custom-100"
                                >
                                    {tag}
                                </p>
                            );
                        })
                    ) : (
                        <p>No tags</p>
                    )}
                </div>
                <div className="">
                    <Link to={`/post/${id}`}>
                        <Button className="w-full cursor-pointer bg-custom-400 hover:bg-custom-500">
                            Read more
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
};
