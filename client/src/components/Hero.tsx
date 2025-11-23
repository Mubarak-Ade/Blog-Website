import { useFetchPosts } from "@/hooks/queries/usePost";
import { formatImage } from "@/util/imageFormat";
import { BlogCard } from "./BlogCard";
import { ClipLoader } from "react-spinners";

export const Hero = () => {
  const { data, isLoading, error } = useFetchPosts()

  // Handle loading state
  if (isLoading) {
    return <ClipLoader
        color={"#001100"}
        loading={isLoading}
        // cssOverride={override}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />;
  }

  // Handle error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  // Now data is guaranteed to exist
  const post = data?.at(0) || {};

  return (
    <div className="bg-linear-120 from-custom-200 to-custom-400 overflow-hidden p-20 w-full flex items-center justify-center px-4">
      <div className="text-center max-w-3xl">
        <h1 className="text-6xl font-bold text-wrap text-custom-100">
          Discover Stories That  <br />
          <span className="text-custom-400">Inspire & Educate</span>
        </h1>
        <p className="text-xl mt-5 text-custom-100">
          Explore insightful articles on technology, design, and development
          from industry experts
        </p>
      </div>
      <div className="max-w-sm w-full p-4">
        <BlogCard
          key={post._id}
          {...post}
        />
      </div>
    </div>
  );
};
