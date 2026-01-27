import Comment from "../../models/Comment.js";
export const getComments = async (req, res) => {
    const comment = await Comment.find({}).sort({ createdAt: -1 }).exec();
    res.json(comment);
};
