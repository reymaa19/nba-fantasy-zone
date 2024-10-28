"use client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import userService from "@/services/user";
import { AlertCircle } from "lucide-react";
import { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";

export default function Register({ onRegisterChange }) {
    // @@@ 
    // TODO: FIX THE ERROR HANDLING
    // @@@
	const [values, setValues] = useState({
		username: "",
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [error, setError] = useState({});

	const handleChange = (e) => {
		const { name, value } = e.target;
		setValues({ ...values, [name]: value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const response = await userService.register(values);

		if (response.status === 201) {
			window.localStorage.setItem("user", JSON.stringify(response.data));
			//playerService.setToken(result.token);

			setValues({
				username: "",
				email: "",
				password: "",
				confirmPassword: "",
			});

			window.location.reload();
		} else {
			setError(response.data.error);
		}
	};

	return (
		<div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black mt-16">
			<h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
				Welcome to The NBA Fantasy Zone
			</h2>
			<p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
				See what this web app is capable of for free!
			</p>
			<form className="mt-8" onSubmit={handleSubmit}>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="username">Username</Label>
					<Input
						id="username"
						placeholder="username"
						name="username"
						value={values.username}
						onChange={handleChange}
					/>
				</LabelInputContainer>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="email">Email Address</Label>
					<Input
						id="email"
						placeholder="projectmayhem@fc.com"
						type="email"
						name="email"
						value={values.email}
						onChange={handleChange}
					/>
				</LabelInputContainer>
				<LabelInputContainer className="mb-4">
					<Label htmlFor="password">Password</Label>
					<Input
						id="password"
						placeholder="••••••••"
						type="password"
						name="password"
						value={values.password}
						onChange={handleChange}
					/>
				</LabelInputContainer>
				<LabelInputContainer className="mb-8">
					<Label htmlFor="confirmPassword">Confirm Password</Label>
					<Input
						id="confirmPassword"
						placeholder="••••••••"
						type="password"
						name="confirmPassword"
						value={values.confirmPassword}
						onChange={handleChange}
					/>
				</LabelInputContainer>

				<button
					className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
					type="submit"
					formNoValidate
				>
					Sign up &rarr;
					<BottomGradient />
				</button>

				<div className="flex flex-col justify-center items-center mt-6">
					<p>
						Already Registered?{" "}
						<a
							className="cursor-pointer"
							onClick={onRegisterChange}
						>
							Login
						</a>
					</p>
				</div>
			</form>

			{
				//   error && (
				//   <Alert
				//   	variant="destructive"
				//   	className="w-full max-w-sm m-auto mt-4"
				//   >
				//   	<AlertCircle className="h-4 w-4 " />
				//   	<AlertTitle>Error</AlertTitle>
				//   	<AlertDescription>
				//   		An error has occured in your registration
				//   	</AlertDescription>
				//   </Alert>
				// )
			}
		</div>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
			<span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
		</>
	);
};

const LabelInputContainer = ({ children, className }) => {
	return (
		<div className={cn("flex flex-col space-y-2 w-full", className)}>
			{children}
		</div>
	);
};
