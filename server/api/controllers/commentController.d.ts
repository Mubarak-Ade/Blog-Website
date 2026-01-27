import { type RequestHandler } from "express";
interface CommentBody {
    text: string;
}
interface PostParams {
    postId?: string;
}
export declare const postComment: RequestHandler<PostParams, unknown, CommentBody, unknown>;
export declare const getComments: RequestHandler;
export {};
//# sourceMappingURL=commentController.d.ts.map