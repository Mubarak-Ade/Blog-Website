import { type InferSchemaType, Schema } from "mongoose";
declare const UserSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profilePic: string;
    social?: {
        x?: string | null;
        facebook?: string | null;
        linkedin?: string | null;
        instagram?: string | null;
    } | null;
    phone?: number | null;
    bio?: string | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profilePic: string;
    social?: {
        x?: string | null;
        facebook?: string | null;
        linkedin?: string | null;
        instagram?: string | null;
    } | null;
    phone?: number | null;
    bio?: string | null;
}>, {}> & import("mongoose").FlatRecord<{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profilePic: string;
    social?: {
        x?: string | null;
        facebook?: string | null;
        linkedin?: string | null;
        instagram?: string | null;
    } | null;
    phone?: number | null;
    bio?: string | null;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
type User = InferSchemaType<typeof UserSchema>;
declare const User: import("mongoose").Model<{
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profilePic: string;
    social?: {
        x?: string | null;
        facebook?: string | null;
        linkedin?: string | null;
        instagram?: string | null;
    } | null;
    phone?: number | null;
    bio?: string | null;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profilePic: string;
    social?: {
        x?: string | null;
        facebook?: string | null;
        linkedin?: string | null;
        instagram?: string | null;
    } | null;
    phone?: number | null;
    bio?: string | null;
}, {}> & {
    firstname: string;
    lastname: string;
    email: string;
    password: string;
    role: "user" | "admin";
    profilePic: string;
    social?: {
        x?: string | null;
        facebook?: string | null;
        linkedin?: string | null;
        instagram?: string | null;
    } | null;
    phone?: number | null;
    bio?: string | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=User.d.ts.map