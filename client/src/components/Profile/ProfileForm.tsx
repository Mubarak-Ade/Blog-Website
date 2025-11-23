import { Button } from "@/components/ui/button";
import {
    Field,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSet
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useEditUser, useFetchUser } from "@/services/dashboard";
import { UserProfile } from "@/model/user";
import { formatImage } from "@/util/imageFormat";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import z from "zod";
import Profile from "../../assets/user (2).png";

export const ProfileForm = () => {
    const {data, isLoading} = useFetchUser()
    const editUser = useEditUser()

    const navigate = useNavigate();

    const [preview, setPreview] = useState(
        data?.Profile ? formatImage(data?.profilePic) : Profile
    );

    
    
    const schema = z.object({
        profile: z.any().optional(),
        firstname: z.string().min(3, "first name must be atleast 3 character"),
        lastname: z.string().min(3, "last name must be atleast 3 character"),
        email: z.string(),
        phone: z.any(),
        bio: z.string().min(10, "must be atleast 10 char long"),
        x: z.string(),
        facebook: z.string(),
        linkedin: z.string(),
        instagram: z.string(),
    });

    console.log(data);
    

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        reset
    } = useForm<UserProfile>({
        resolver: zodResolver(schema),
    });
    
    useEffect(() => {
        reset({
            profile: data?.profilePic,
            firstname: data?.firstname,
            lastname: data?.lastname,
            email: data?.email,
            phone: data?.phone,
            bio: data?.bio,
            x: data?.social?.x,
            facebook: data?.social?.facebook,
            linkedin: data?.social?.linkedin,
            instagram: data?.social?.instagram,
        },)
    }, [reset]);
    const handleChange = (e: any) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    const onSubmit = async (user: UserProfile) => {
        try {
            editUser.mutate(user);
            navigate("/user/dashboard/profile");
        } catch (err: any) {
            setError("root", { type: "manual", message: err.message });
        }
    };

    return (
        <div className="bg-white p-6 w-full">
            <form onSubmit={handleSubmit(onSubmit)} className="max-w-3xl">
                <div className="flex justify-between items-center">
                    <div className="mb-5">
                        <h1 className="font-bold text-3xl">
                            Edit Personal Information
                        </h1>
                        <span>
                            Update your info to keep your profile upto date
                        </span>
                    </div>
                    <div className="">
                        <Link
                            to="/dashboard/profile"
                            className="bg-custom-400 text-white px-6 py-3 rounded-2xl"
                        >
                            Go Back
                        </Link>
                    </div>
                </div>
                <FieldGroup>
                    <FieldGroup>
                        <FieldLegend>
                            Change or upload your profile pic
                        </FieldLegend>
                        <Field>
                            <div className="flex gap-5 items-center">
                                <img src={preview} alt="" className="size-20" />
                                <Input
                                    {...register("profile")}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleChange}
                                />
                            </div>
                            {errors.profile && (
                                <FieldError>
                                    {errors.profile.message}
                                </FieldError>
                            )}
                        </Field>
                    </FieldGroup>
                    <FieldSet>
                        <FieldLegend>Social Link</FieldLegend>
                        <FieldGroup className="grid grid-cols-2">
                            <Field>
                                <FieldLabel>Facebook</FieldLabel>
                                <Input
                                    type="text"
                                    {...register("facebook")}
                                    placeholder="Your facebook account...."
                                />
                            </Field>
                            <Field>
                                <FieldLabel>X.com</FieldLabel>
                                <Input
                                    type="text"
                                    {...register("x")}
                                    placeholder="Your twitter(X) account...."
                                />
                            </Field>
                            <Field>
                                <FieldLabel>LinkedIn</FieldLabel>
                                <Input
                                    type="text"
                                    {...register("linkedin")}
                                    placeholder="Your linkedin account...."
                                />
                            </Field>
                            <Field>
                                <FieldLabel>Instagram</FieldLabel>
                                <Input
                                    type="text"
                                    {...register("instagram")}
                                    placeholder="Your instagram account...."
                                />
                            </Field>
                        </FieldGroup>
                    </FieldSet>
                    <FieldSet>
                        <FieldLegend>Personal Information</FieldLegend>
                        <FieldGroup className="grid grid-cols-2">
                            <Field>
                                <FieldLabel>First Name</FieldLabel>
                                <Input
                                    type="text"
                                    {...register("firstname")}
                                    // placeholder="Enter your first name...."
                                />
                                {errors.firstname && (
                                    <FieldError>
                                        {errors.firstname.message}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel>Last Name</FieldLabel>
                                <Input
                                    type="text"
                                    {...register("lastname")}
                                    placeholder="Enter your last name...."
                                />
                                {errors.lastname && (
                                    <FieldError>
                                        {errors.lastname.message}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input
                                    type="email"
                                    {...register("email")}
                                    placeholder="Enter your email...."
                                />
                                {errors.email && (
                                    <FieldError>
                                        {errors.email.message}
                                    </FieldError>
                                )}
                            </Field>
                            <Field>
                                <FieldLabel>Phone</FieldLabel>
                                <Input
                                    type="number"
                                    {...register("phone")}
                                    placeholder="Enter your phone number...."
                                />
                            </Field>
                            {errors.phone && (
                                <FieldError>{errors.phone.message}</FieldError>
                            )}
                        </FieldGroup>
                        <FieldGroup>
                            <Field>
                                <FieldLabel>Bio</FieldLabel>
                                <Input
                                    type="text"
                                    {...register("bio")}
                                    placeholder="write something on your bio...."
                                />
                                {errors.bio && (
                                    <FieldError>
                                        {errors.bio.message}
                                    </FieldError>
                                )}
                            </Field>
                        </FieldGroup>
                        {errors.root && (
                            <FieldError>{errors.root.message}</FieldError>
                        )}
                        <Button type="submit">
                            <Upload />
                            Save
                        </Button>
                    </FieldSet>
                </FieldGroup>
            </form>
        </div>
    );
};
