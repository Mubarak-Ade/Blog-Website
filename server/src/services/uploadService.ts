import cloudinary from "../config/cloudinary"
import createHttpError from 'http-errors';

export const uploadImage = async (buffer: Buffer) => {
    try {
        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "mern_blog" },
                (error, uploadResult) => {
                    if (error) reject(error)
                    else resolve(uploadResult)
                }
            ).end(buffer)
        })
        return result.secure_url
    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        throw createHttpError(400, "Image upload failed");
    }
}