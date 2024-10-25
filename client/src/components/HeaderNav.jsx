import React from "react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { CircleUser, Menu } from "lucide-react";
import NBAFantasyZoneLogo from "@/components/NBAFantasyZoneLogo";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/mode-toggle";

const HeaderNav = () => {
	const navigate = useNavigate();
    const user = JSON.parse(window.localStorage.getItem("user")) 
	const username = user?.username || "demo-user";

	const handleLogout = () => {
		window.localStorage.removeItem("user");
		navigate("sign-in");
	};

	return (
		<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
			<nav className="hidden flex-col gap-12 text-lg font-medium md:flex md:flex-row md:items-center md:gap-12 md:text-sm lg:gap-12">
				<Link className="flex items-center gap-2 text-lg font-semibold md:text-base" to="/">
					<NBAFantasyZoneLogo className="h-6 w-6" />
					<span className="sr-only">NBA Fantasy Zone</span>
				</Link>
				<Link className="text-foreground transition-colors hover:text-foreground" to="/">
					Dashboard
				</Link>
				<Link className="text-muted-foreground transition-colors hover:text-foreground" to="/leaderboard">
					Leaderboard
				</Link>
				<Link className="text-muted-foreground transition-colors hover:text-foreground" to="/draft">
					Draft
				</Link>
				<Link className="text-muted-foreground transition-colors hover:text-foreground" to="team">
					Team
				</Link>
			</nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button variant="outline" size="icon" className="shrink-0 md:hidden">
						<Menu className="h-5 w-5" />
						<span className="sr-only">Toggle navigation menu</span>
					</Button>
				</SheetTrigger>
				<SheetContent side="left">
					<nav className="grid gap-6 text-lg font-medium">
						<Link className="flex items-center gap-2 text-lg font-semibold" to="/">
							<NBAFantasyZoneLogo className="h-6 w-6" />
							<span className="sr-only">NBA Fantasy Zone</span>
						</Link>
						<Link href="#" className="hover:text-foreground" to="/">
							Dashboard
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-foreground" to="/leaderboard">
							Leaderboard
						</Link>
						<Link className="text-muted-foreground hover:text-foreground" to="/draft">
							Draft
						</Link>
						<Link href="#" className="text-muted-foreground hover:text-foreground" to="/team">
							Team
						</Link>
					</nav>
				</SheetContent>
			</Sheet>
			<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
				<div className="ml-auto flex-1 sm:flex-initial" />
				<ModeToggle />
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="secondary" size="icon" className="rounded-full">
							<CircleUser className="h-5 w-5" />
							<span className="sr-only">Toggle user menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuLabel>{username}</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<button className="w-full text-left">Settings</button>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem>
							<button className="w-full text-left" onClick={handleLogout}>
								Logout
							</button>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</header>
	);
};

export default HeaderNav;
