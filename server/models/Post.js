import mongoose from "mongoose";

const postSchema = mongoose.Schema({
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    tags: {
        type: String
    },
    category: {
        type: String,
    }
}, {timestamps: true})

const Post = mongoose.model("Blog", postSchema)

export default Post;