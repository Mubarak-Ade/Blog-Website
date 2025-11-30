import { Loader } from "@/components/Loader";
import { Comment } from "@/components/viewpost/Comment";
import { useFetchSinglePost, usePostComment } from "@/hooks/queries/usePost";
import { formatImage } from "@/util/imageFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router";
import { z } from "zod";
// import TextareaAutosize from "react-textarea-autosize";

export const ViewPost = () => {
  const schema = z.object({
    comment: z
      .string()
      .min(5, "comment should be atleast 5 character")
      .max(500, "comment is too long"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    resetField,
  } = useForm({ resolver: zodResolver(schema) });

  const { id } = useParams();

  const update = usePostComment();
  const { data, isLoading, error } = useFetchSinglePost(id!);

  if (isLoading) return <Loader loading={isLoading} />;
  if (error) return <p>Error: {error}</p>;

  // const tags:[] = data?.post?.tags?.split(",");

  const onSubmit = (data) => {
    try {

      update.mutate({
        id: id,
        data: data.comment,
      }, {onSuccess () {
          console.log("Post comment");
          
      },});

      resetField("comment");
    } catch (error) {
      setError("comment", {
        type: "manual",
        message: errors || error || "Comment can not be post",
      });
    }
  };  

  // const profilePic = `http://localhost:4000${user?.profilePic}`

  return (
    <div className="px-8 py-4 block h-full">
      <div className="w-full max-w-3xl m-auto">
        <div className="">
          <h1 className="text-4xl text-center font-bold font-actor">
            {data?.post?.title}
          </h1>
          <div className="my-5 max-w-4xl w-full h-100 border">
            <img src={`http://localhost:4000/${data?.post?.image}`} className="size-full object-cover" alt="" />
          </div>
          <h6 className="capitalize ">
            category:{" "}
            <span className="font-semibold ml-2">{data?.post?.category}</span>
          </h6>
        </div>
        <div className="mt-5">
          <div dangerouslySetInnerHTML={{__html: data.post.content}} className="p-4" />
          <div className="flex gap-1 capitalize mt-5">
            {data.post.tags ? (
              data.post.tags.map((tag, index) => {
                return (
                  <p
                    key={index}
                    className="overflow-hidden flex items-center justify-center bg-custom-500 text-xs text-white px-3 py-1.5 rounded-full"
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
        <div className="mt-10">
          <h2 className="text-3xl font-bold">Comments</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="relative">
            <textarea
              className="border w-full rounded-2xl p-4 border-custom-400 mt-4"
              rows={6}
              {...register("comment")}
              placeholder="Enter a comment"
            />
            <button className="bg-custom-500 px-4 py-2 bottom-0 m-4 left-0 text-custom-100 rounded-xl absolute">
              Submit
            </button>
            {errors.comment && (
              <p className="text-red-500 text-xl">{errors.comment.message}</p>
            )}
          </form>
        </div>
        <Comment comment={data?.comment} />
      </div>
    </div>
  )
};
