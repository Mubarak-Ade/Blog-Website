import { Comment as CommentModel } from '@/model/post'

export const Comment = ({comment} : {comment: CommentModel[]}) => {  
  return (
    <div className="flex items-center gap-8 flex-col">
          {/* Comments will go here */}
          {comment && comment?.length > 0 ? (
            comment?.slice(0,5).map((com) => (
              <div
                key={com._id}
                className="flex m-2 rounded-lg w-full"
              >
                  <img
                    src={com?.user?.profilePic}
                    alt=""
                    className="size-12 rounded-full"
                  />
                <div className="px-4 space-y-1">
                  <h4 className="font-bold">
                    {com?.user?.firstname} {com?.user?.lastname}
                  </h4>
                  <p className="font-alive">{com.text}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="mt-4">No comments yet.</p>
          )}
        </div>
  )
}
