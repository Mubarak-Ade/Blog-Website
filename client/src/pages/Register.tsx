import { Eye, EyeOff, Lock, Mail, NotebookText, User } from "lucide-react";
import { useState } from "react";
import { useAuthProvider } from "../store/store";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "@/components/ui/input-group";
import {
	FieldGroup,
	Field,
	FieldError,
	FieldDescription,
	FieldSet,
} from "@/components/ui/field";
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
import { Register as RegisterModel } from "@/model/auth";
import { useRegister } from "@/hooks/queries/useAuth";

export const Register = () => {
	const [passwordVisible, setPasswordVisible] = useState(false);
	const registerUser = useRegister();

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
	} = useForm<RegisterModel>({ resolver: zodResolver(schema) });

	const onSubmit = async (data: RegisterModel) => {
		try {
			registerUser.mutate(data);
			navigate("/");
		} catch (error: any) {
			setError("root", {
				type: "manual",
				message: error.response?.data?.message || "Registration failed",
			});
		}
	};

	return (
		<div className="w-full p-4 min-h-screen flex lg:items-center lg:justify-center bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
			<div className="w-full max-w-5xl m-auto">
				<Card className="p-0 overflow-hidden">
					<CardContent className="flex flex-col lg:flex-row p-0">
						<form
							onSubmit={handleSubmit(onSubmit)}
							className="h-full flex-1 w-full p-8"
						>
							<CardHeader>
								<div className="flex flex-col items-center mb-5">
									<NotebookText
										size={50}
										className=" rounded-xl p-3"
									/>
									<CardTitle className="md:text-3xl text-2xl text-center font-bold mb-2">
										Login to Your Account
									</CardTitle>
									<CardDescription>
										Welcome back! Please enter your details.
									</CardDescription>
								</div>
							</CardHeader>
							<FieldGroup>
								<FieldSet className="flex flex-col md:flex-row">
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

								<FieldSet className="flex flex-col lg:flex-row">
									<Field>
										<Label htmlFor="">Password</Label>
										<InputGroup>
											<InputGroupAddon
												className="cursor-pointer"
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
										<Label htmlFor="">
											Confirm Password
										</Label>
										<InputGroup>
											<InputGroupAddon
												className="cursor-pointer"
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
										className="cursor-pointer"
									>
										Submit
									</Button>
									{errors.root && (
										<FieldError>
											{errors.root.message}
										</FieldError>
									)}
								</Field>
								<FieldDescription className="text-center">
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
						<div className=" w-full bg-linear-to-bl lg:flex-1 from-custom-400 to-custom-200"></div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};
