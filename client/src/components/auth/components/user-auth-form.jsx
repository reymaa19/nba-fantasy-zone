import { Button } from "@/components/custom/button";
import { PasswordInput } from "@/components/custom/password-input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import userService from "@/services/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
	username: z.string().min(6, { message: "Please enter your username" }),
	password: z
		.string()
		.min(1, {
			message: "Please enter your password",
		})
		.min(6, {
			message: "Password must be at least 6 characters long",
		}),
});

export function UserAuthForm({ className, ...props }) {
	const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

	const form = useForm({
		resolver: zodResolver(formSchema),
		defaultValues: {
			username: "",
			password: "",
		},
	});

	function onSubmit(data) {
		setIsLoading(true);

		setTimeout(async () => {
			try {
				const response = await userService.login(data);

				if (response.status === 200) {
					window.localStorage.setItem("user", JSON.stringify(response.data));

					form.reset();
                    navigate("/")
				} else {
					form.setError("username", {
						type: "manual",
						message: response.response.data.username || "",
					});
					form.setError("password", {
						type: "manual",
						message: response.response.data.password || "",
					});
				}
			} catch (error) {
				form.setError("username", {
					type: "manual",
					message: "An unexpected error occurred",
				});
				form.setError("password", {
					type: "manual",
					message: "An unexpected error occurred",
				});
			} finally {
				setIsLoading(false);
			}
		}, 1000);
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid gap-2">
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<FormLabel>username</FormLabel>
									<FormControl>
										<Input placeholder="username" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="password"
							render={({ field }) => (
								<FormItem className="space-y-1">
									<div className="flex items-center justify-between">
										<FormLabel>Password</FormLabel>
										<Link
											to="/forgot-password"
											className="text-sm font-medium text-muted-foreground hover:opacity-75"
										>
											Forgot password?
										</Link>
									</div>
									<FormControl>
										<PasswordInput placeholder="••••••••" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button className="mt-2" loading={isLoading}>
							Login
						</Button>

						<div className="flex flex-col justify-center items-center mb-6">
							<p>
								Not Registered? <Link className="underline" to="/sign-up">Register</Link>
							</p>
						</div>
					</div>
				</form>
			</Form>
		</div>
	);
}
