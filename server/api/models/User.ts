import { type InferSchemaType, model, Schema } from "mongoose";

const UserSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    social: {
        x: { type: String },
        facebook: { type: String },
        linkedin: { type: String },
        instagram: { type: String },
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "profile.png",
    },
    bio: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user",
    },
});

type User = InferSchemaType<typeof UserSchema>

const User = model<User>("User", UserSchema);

export default User;
