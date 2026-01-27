import { type InferSchemaType, Schema } from "mongoose";
declare const postSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    timestamps: true;
}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    author: import("mongoose").Types.ObjectId;
    tags: string[];
    content: string;
    title: string;
    image: string;
    views: number;
    category?: string | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    author: import("mongoose").Types.ObjectId;
    tags: string[];
    content: string;
    title: string;
    image: string;
    views: number;
    category?: string | null;
}>, {}> & import("mongoose").FlatRecord<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    author: import("mongoose").Types.ObjectId;
    tags: string[];
    content: string;
    title: string;
    image: string;
    views: number;
    category?: string | null;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
type Post = InferSchemaType<typeof postSchema>;
declare const Post: import("mongoose").Model<{
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    author: import("mongoose").Types.ObjectId;
    tags: string[];
    content: string;
    title: string;
    image: string;
    views: number;
    category?: string | null;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    author: import("mongoose").Types.ObjectId;
    tags: string[];
    content: string;
    title: string;
    image: string;
    views: number;
    category?: string | null;
}, {}> & {
    createdAt: NativeDate;
    updatedAt: NativeDate;
} & {
    author: import("mongoose").Types.ObjectId;
    tags: string[];
    content: string;
    title: string;
    image: string;
    views: number;
    category?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Post;
//# sourceMappingURL=Post.d.ts.map