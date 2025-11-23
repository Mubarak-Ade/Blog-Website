import { type InferSchemaType, model, Schema } from "mongoose";

const CommentSchema = new Schema({
    post: { type: Schema.Types.ObjectId, ref: "Blog", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});

type Comment = InferSchemaType<typeof CommentSchema>

const Comment = model<Comment>("Comment", CommentSchema);

export default Comment;
