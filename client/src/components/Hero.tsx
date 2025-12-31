import { Post } from "@/model/post";
import { BlogCard } from "./BlogCard";

interface Props {
  posts: Post[],
}

export const Hero = ({posts} : Props) => {
  // Now data is guaranteed to exist
  const post = posts.at(0) as Post

  return (
    <div className="bg-gray-100 lg:flex-row dark:bg-gray-900 flex-col  overflow-hidden p-20 w-full flex items-center justify-center px-4">
      <div className=" max-w-3xl">
        <h1 className="lg:text-6xl text-4xl text-center font-bold text-wrap text-black dark:text-white">
          Discover Stories That  <br />
          <span className="text-custom-400">Inspire & Educates</span>
        </h1>
        <p className="md:text-xl mt-5 text-black dark:text-white">
          Explore insightful articles on technology, design, and development
          from industry experts
        </p>
      </div>
      <div className="max-w-sm w-full p-4 mt-4">
        <BlogCard
          key={post._id}
          {...post}
        />
      </div>
    </div>
  );
};
