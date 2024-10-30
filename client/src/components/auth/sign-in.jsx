import Logo from "@/components/NBAFantasyZoneLogo";
import { UserAuthForm } from "./components/user-auth-form.jsx";
import { WavyBackground } from "@/components/ui/wavy-background.jsx";

export default function SignIn() {
	return (
		<>
			<div className="container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0">
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-zinc-900" />
					<div className="relative z-20 flex items-center text-lg font-medium">
						<Logo />
						NBA Fantasy Zone
					</div>
					<div className="absolute inset-0 overflow-hidden">
						<WavyBackground
							colors={["#cc5d00", "#d5d5d5", "#2a4599", "#542dde"]}
							waveWidth={100}
							blur={10}
							speed="slow"
							waveOpacity={0.5}
							className="absolute inset-0 w-full h-full"
						/>
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								"Welcome back, coach! Your fantasy team is waiting for your next big move."
							</p>
							<footer className="text-sm">NBA Fantasy Zone</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-left">
							<h1 className="text-2xl font-semibold tracking-tight">Login</h1>
							<p className="text-sm text-muted-foreground">
								Enter your username and password below to log into your account
							</p>
						</div>
						<UserAuthForm />
					</div>
				</div>
			</div>
		</>
	);
}
