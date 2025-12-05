import {
    Eye,
    EyeClosed,
    EyeIcon,
    EyeOff,
    Lock,
    Mail,
    Notebook,
    NotebookText,
    User,
} from "lucide-react";
import React, { useState } from "react";
import { useAuthProvider } from "../store/store";
import { Link, Navigate, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { FieldGroup, Field, FieldError, FieldDescription } from "@/components/ui/field";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { Login as LoginModel } from "@/model/auth";
import { useLogin } from "@/hooks/queries/useAuth";


export const Login = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const loginUser = useLogin()

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(4),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<LoginModel>({ resolver: zodResolver(schema) });

    const onSubmit = (data: LoginModel) => {
        try {
            const login  = loginUser.mutate(data)
            navigate("/");
        } catch (err: any) {
            setError("root", {
                type: "manual",
                message: err.response?.data?.message || "Login failed",
            });
        }
    };

    return (
        <div className="w-full block p-10 h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
            <div className="w-full max-w-5xl m-auto h-150">
                <Card className="p-0 overflow-hidden h-full">
                    <CardContent className="flex lg:flex-row flex-col justify-between p-0 h-full">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="h-full w-full p-8"
                        >
                            <CardHeader>
                                <div className="flex flex-col items-center mb-10">
                                    <NotebookText
                                        size={50}
                                        className="rounded-xl p-3"
                                    />
                                    <CardTitle className="text-3xl font-bold mb-2">
                                        Login to Your Account
                                    </CardTitle>
                                    <CardDescription>
                                        Welcome back! Please enter your details.
                                    </CardDescription>
                                </div>
                            </CardHeader>
                            <FieldGroup>
                                <Field>
                                    <Label htmlFor="">Email</Label>
                                    <InputGroup>
                                        <InputGroupInput
                                            type="text"
                                            {...register("email")}
                                        />
                                        <InputGroupAddon>
                                            <Mail />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {errors.email && (
                                        <FieldError>
                                            {errors.email.message}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <Label htmlFor="">Password</Label>
                                    <InputGroup>
                                        <InputGroupAddon
                                            onClick={() =>
                                                setPasswordVisible(
                                                    !passwordVisible
                                                )
                                            }
                                        >
                                            {passwordVisible ? (
                                                <EyeOff />
                                            ) : (
                                                <Eye />
                                            )}
                                        </InputGroupAddon>
                                        <InputGroupInput
                                            type={
                                                passwordVisible
                                                    ? "text"
                                                    : "password"
                                            }
                                            {...register("password")}
                                        />
                                        <InputGroupAddon align="inline-end">
                                            <Lock />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {errors.password && (
                                        <FieldError>
                                            {errors.password.message}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <Button type="submit" className=" cursor-pointer">Submit</Button>
                                    {errors.root && (
                                        <FieldError>
                                            {errors.root.message}
                                        </FieldError>
                                    )}
                                </Field>
                                <FieldDescription className="text-center">
                                    Dont Have an account  <Link className="hover:underline ml-1" to="/register">
                                        Register
                                    </Link>
                                </FieldDescription>
                            </FieldGroup>
                        </form>
                        <div className="bg-linear-to-bl w-full from-custom-400 to-custom-200"></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
