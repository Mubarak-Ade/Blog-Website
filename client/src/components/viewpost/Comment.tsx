import { Comment as CommentModel } from '@/model/post'
import { formatImage } from '@/util/imageFormat'
import React from 'react'

export const Comment = ({comment} : {comment: CommentModel[]}) => {
  return (
    <div className="mt-10">
          {/* Comments will go here */}
          {comment && comment?.length > 0 ? (
            comment?.map((com) => (
              <div
                key={com._id}
                className="border rounded-lg border-custom-500 py-4 m-2 p-2 w-full"
              >
                <div className="grid grid-cols-[50px_100px] items-center">
                  <img
                    src={formatImage(com?.user?.profilePic)}
                    alt=""
                    className="size-10 border border-custom-500 rounded-full row-span-2 mr-4"
                  />
                  <h4 className="text-custom-500 font-bold">
                    {com?.user?.firstname} {com?.user?.lastname}
                  </h4>
                  <h6 className="text-custom-300">{com?.user?.email}</h6>
                </div>
                <p className="font-alive mt-5 ml-10">{com.text}</p>
              </div>
            ))
          ) : (
            <p className="mt-4">No comments yet.</p>
          )}
        </div>
  )
}
