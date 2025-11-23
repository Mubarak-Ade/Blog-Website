export interface User {
    id?: string,
    name?: string,
    role: string,
    email: string,
    profile: string,
}

export interface UserProfile {
    id?: string,
    firstname: string,
    lastname: string
    email: string,
    profile?: string,
    phone: any,
    bio: string
    x: string,
    facebook: string,
    linkedin: string,
    instagram: string,
}