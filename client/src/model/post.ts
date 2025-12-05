import { Author } from "./user"

export interface Post {
    _id: string,
    image?: any,
    editorImage?: File[],
    title: string
    content: string,
    category: string,
    tags: [string],
    createdAt: string,
    comment?: Comment
    author: Author
}

export interface Comment {
    _id?: string,
    text: string,
    user?: Author
}
