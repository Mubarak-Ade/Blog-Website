import { type InferSchemaType, Schema } from "mongoose";
declare const CommentSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    user: import("mongoose").Types.ObjectId;
    text: string;
    post: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    user: import("mongoose").Types.ObjectId;
    text: string;
    post: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
}>, {}> & import("mongoose").FlatRecord<{
    user: import("mongoose").Types.ObjectId;
    text: string;
    post: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
type Comment = InferSchemaType<typeof CommentSchema>;
declare const Comment: import("mongoose").Model<{
    user: import("mongoose").Types.ObjectId;
    text: string;
    post: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    user: import("mongoose").Types.ObjectId;
    text: string;
    post: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
}, {}> & {
    user: import("mongoose").Types.ObjectId;
    text: string;
    post: import("mongoose").Types.ObjectId;
    createdAt: NativeDate;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default Comment;
//# sourceMappingURL=Comment.d.ts.map