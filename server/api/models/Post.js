import { model, Schema } from "mongoose";
const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: "empty.png"
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: {
        type: [String]
    },
    category: {
        type: String,
    },
    views: {
        type: Number,
        default: 0
    }
}, { timestamps: true });
const Post = model("Blog", postSchema);
export default Post;
