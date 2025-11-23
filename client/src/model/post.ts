export interface Post {
    _id: string,
    image?: any,
    editorImage?: File[],
    title: string
    content: string,
    category: string,
    tags: string,
    createdAt: string,
    author: {
        _id: string,
        firstname: string,
        lastname: string,
        email: string,
        profilePic?: string
    }
}