import { Loader } from "@/components/Loader";
import { ProfileBanner } from "../../../components/Profile/ProfileBanner";
import { ProfileInfo } from "../../../components/Profile/ProfileInfo";
import { useFetchUser } from "../../../services/dashboard";

export const Profile = () => {


    const {data, isLoading, error} = useFetchUser()

    if (isLoading) {
        <Loader loading={isLoading} message="fetching user info" />
    }
        
    return (
        <div className="mx-auto p-6 dark:bg-gray-900 pb-20">
            <div className="p-6 border rounded-2xl bg-white dark:bg-gray-900">
                <h3 className="mb-5 font-semibold text-lg">Profile</h3>
                <ProfileBanner user={data} loading={isLoading} error={error} />
                <ProfileInfo user={data} loading={isLoading} error={error} />
            </div>
        </div>
    );
};

