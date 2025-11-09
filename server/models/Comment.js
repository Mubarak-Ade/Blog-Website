import mongoose from "mongoose";

const CommentSchema = mongoose.Schema({
    post: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() },
});

const Comment = mongoose.model("Comment", CommentSchema);

export default Comment;
