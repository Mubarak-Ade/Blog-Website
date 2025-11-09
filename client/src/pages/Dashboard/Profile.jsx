import React, { useEffect, useState } from "react";
import { ProfileBanner } from "../../components/Profile/ProfileBanner";
import { ProfileInfo } from "../../components/Profile/ProfileInfo";
import { ProfileForm } from "../../components/Profile/ProfileForm";
import { useDashboardStore } from "../../state/dashboardStore";

export const Profile = () => {

    const { user, loading, error, fetchUserInfo } = useDashboardStore();

    useEffect(() => {
        fetchUserInfo()
    }, [])
    

    return (
        <div className="mx-auto p-6 pb-20">
            <div className="bg-white p-6 border rounded-2xl">
                <h3 className="mb-5 font-semibold text-lg">Profile</h3>
                <ProfileBanner user={user} loading={loading} error={error} />
                <ProfileInfo user={user} loading={loading} error={error} />
            </div>
        </div>
    );
};

