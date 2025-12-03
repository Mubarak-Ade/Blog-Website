import { useFetchPosts } from "@/hooks/queries/usePost";
import { formatImage } from "@/util/imageFormat";
import { BlogCard } from "./BlogCard";
import { ClipLoader } from "react-spinners";
import { Loader } from "./Loader";

export const Hero = () => {
  const { data, isLoading, error } = useFetchPosts()

  // Handle loading state
  if (isLoading) {
    return <Loader loading={isLoading} />
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Now data is guaranteed to exist
  const post = data?.at(0) || {};

  return (
    <div className="bg-linear-120 lg:flex-row flex-col from-custom-200 to-custom-400 overflow-hidden p-20 w-full flex items-center justify-center px-4">
      <div className=" max-w-3xl">
        <h1 className="lg:text-6xl text-4xl text-center font-bold text-wrap text-custom-100">
          Discover Stories That  <br />
          <span className="text-custom-400">Inspire & Educates</span>
        </h1>
        <p className="md:text-xl mt-5 text-custom-100">
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
