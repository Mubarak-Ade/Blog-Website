import { Loader } from "@/components/Loader";
import { Comment } from "@/components/viewpost/Comment";
import { CommentSection } from "@/components/viewpost/CommentSection";
import { useFetchSinglePost, usePostComment } from "@/hooks/queries/usePost";
import { formatImage } from "@/util/imageFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { z } from "zod";
// import TextareaAutosize from "react-textarea-autosize";

export const ViewPost = () => {

  const { id } = useParams();

  const { data, isLoading, error } = useFetchSinglePost(id!);

  if (isLoading) return <Loader loading={isLoading} />;
  if (error) return <p>Error: {error}</p>;

  // const tags:[] = data?.post?.tags?.split(",");

  console.log(data)

  

  return (
    <div className="px-8 py-4 block h-full">
      <div className="w-full max-w-3xl  m-auto">
        <div className="">
          <h1 className="text-4xl text-center font-bold font-actor">
            {data?.post?.title}
          </h1>
          <div className="mt-4 flex flex-wrap gap-4 items-center">
              <img src={data.post.author?.profilePic} className="size-15 rounded-full" alt="" />
              <h6 className="font-bold">By {data.post.author?.firstname} {data.post.author?.lastname}</h6>
              <p>Published on {format(data.post.createdAt, "PPpp")}</p>
          </div>
          <div className="my-5 max-w-4xl w-full h-100 border">
            <img src={data?.post?.image} className="size-full object-cover" alt="" />
          </div>
          <h6 className="capitalize ">
            category:{" "}
            <span className="font-semibold ml-2">{data?.post?.category}</span>
          </h6>
        </div>
        <div className="mt-5">
          <div dangerouslySetInnerHTML={{__html: data.post.content}} className="" />
          <div className="flex flex-wrap gap-1 capitalize mt-5">
            {data.post.tags ? (
              data.post.tags.map((tag, index) => {
                return (
                  <p
                    key={index}
                    className="dark:bg-gray-100 bg-gray-900 text-gray-100 px-3 py-1 text-center dark:text-gray-900 text-sm  rounded-full"
                  >
                    {tag}
                  </p>
                );
              })
            ) : (
              <p>No tags</p>
            )}
          </div>
        </div>
       <CommentSection id={id} />
      </div>
    </div>
  )
};
