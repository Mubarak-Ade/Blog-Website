import { Eye, EyeOff, Lock, Mail, NotebookText, User } from "lucide-react";
import { useState } from "react";
import { useAuthProvider } from "../state/store";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
} from "@/components/ui/input-group";
import { FieldGroup, Field, FieldError, FieldDescription, FieldSet } from "@/components/ui/field";
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

export const Register = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const API = useAuthProvider((state) => state.API);
    const setUser = useAuthProvider((state) => state.setUser);
    const setToken = useAuthProvider((state) => state.setToken);

    const navigate = useNavigate();

    const schema = z.object({
        firstname: z.string().min(3),
        lastname: z.string().min(3),
        email: z.string().email(),
        password: z.string().min(8),
    });

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm({ resolver: zodResolver(schema) });

    const onSubmit = async (data) => {
        try {
            const res = await API.post("/auth/register", data);
            setUser(res.data.user);
            setToken(res.data.token);
            navigate("/");
        } catch (error) {
            setError("apiError", {
                type: "manual",
                message: error.response?.data?.message || "Registration failed",
            });
        }
    };

    return (
        <div className="block w-full p-4">
            <div className="w-full max-w-5xl m-auto h-150">
                <Card className="p-0 overflow-hidden h-full">
                    <CardContent className="grid grid-cols-2 p-0 h-full">
                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="h-full bg-white p-8"
                        >
                            <CardHeader>
                                <div className="flex flex-col items-center mb-10">
                                    <NotebookText
                                        size={50}
                                        className="bg-custom-400 rounded-xl text-custom-100 p-3"
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
                                <FieldSet className="grid grid-cols-2">
                                    <Field>
                                    <Label htmlFor="">Firstname</Label>
                                    <InputGroup>
                                        <InputGroupInput
                                            type="text"
                                            {...register("firstname")}
                                        />
                                        <InputGroupAddon>
                                            <Mail />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {errors.firstname && (
                                        <FieldError>
                                            {errors.firstname.message}
                                        </FieldError>
                                    )}
                                </Field>
                                <Field>
                                    <Label htmlFor="">Lastname</Label>
                                    <InputGroup>
                                        <InputGroupInput
                                            type="text"
                                            {...register("lastname")}
                                        />
                                        <InputGroupAddon>
                                            <Mail />
                                        </InputGroupAddon>
                                    </InputGroup>
                                    {errors.lastname && (
                                        <FieldError>
                                            {errors.lastname.message}
                                        </FieldError>
                                    )}
                                </Field>
                                </FieldSet>
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

                                <FieldSet className="grid grid-cols-2">
                                    <Field>
                                        <Label htmlFor="">Password</Label>
                                        <InputGroup>
                                            <InputGroupAddon className="cursor-pointer"
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
                                        <Label htmlFor="">Confirm Password</Label>
                                        <InputGroup>
                                            <InputGroupAddon className="cursor-pointer"
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
                                </FieldSet>

                                <Field>
                                    <Button
                                        type="submit"
                                        className="bg-custom-400 hover:bg-custom-400/90 cursor-pointer"
                                    >
                                        Submit
                                    </Button>
                                    {errors.apiError && (
                                        <FieldError>
                                            {errors.apiError.message}
                                        </FieldError>
                                    )}
                                </Field>
                                <FieldDescription classNmae="text-center">
                                    Already Have an account
                                    <Link
                                        className="hover:underline ml-1"
                                        to="/login"
                                    >
                                        Login
                                    </Link>
                                </FieldDescription>
                            </FieldGroup>
                        </form>
                        <div className="flex-1 bg-linear-to-bl from-custom-400 to-custom-200"></div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};
