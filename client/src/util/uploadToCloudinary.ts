import axios from "axios"

export const uploadToCloudinary = async (file: File, folder: string) => {
	try {
		const formData = new FormData()
		formData.append("file", file)
		formData.append("upload_preset", "mern_blog")
		formData.append("folder", folder)
		const {data} = await axios.post("https://api.cloudinary.com/v1_1/dh6dzewha/image/upload", formData)
		return data.secure_url
	} catch (error) {
		console.error("Cloudinary upload failed: ", error);
		return null		
	}
}
