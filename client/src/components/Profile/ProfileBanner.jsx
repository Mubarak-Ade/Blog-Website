import React from "react";
import Png from "../../assets/user (1).png";
import { Facebook, Instagram, Linkedin, Pen, Twitter } from "lucide-react";
import { Link } from "react-router";

export const ProfileBanner = ({user, loading, error}) => {

    const profilePic = `http://localhost:4000${user?.profilePic}`

    return (
        <div className="flex gap-5 mb-5 px-5 py-4 border rounded-2xl">
            <div className="flex flex-1 items-center gap-10">
                <img
                    src={profilePic}
                    alt=""
                    className="border rounded-full size-25 object-top-left"
                />
                <div className="flex-1 space-y-2">
                    <h4 className="font-bold text-xl capitalize">{user?.firstname} {user?.lastname}</h4>
                    <div className="flex gap-4 font-medium text-gray-400 text-sm">
                        <span>{user?.email}</span>
                        {/* <span>Kano, Nigeria</span> */}
                    </div>
                </div>
                <div className="flex gap-2">
                    <button className="p-3 border rounded-full">
                        <Facebook />
                    </button>
                    <button className="p-3 border rounded-full">
                        <Twitter />
                    </button>
                    <button className="p-3 border rounded-full">
                        <Linkedin />
                    </button>
                    <button className="p-3 border rounded-full">
                        <Instagram />
                    </button>
                </div>
            </div>
            <div className="block m-auto">
                <Link to="edit" className="flex justify-center items-center gap-2 px-4 py-2 border rounded-3xl">
                    <Pen size={15} /> Edit
                </Link>
            </div>
        </div>
    );
};
