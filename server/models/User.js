import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
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
        default: "user",
    },
});

const User = mongoose.model("User", UserSchema);

export default User;
