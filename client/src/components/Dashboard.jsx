import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import {
	ArrowUpRight,
	CircleUser,
	DollarSign,
	Menu,
	Moon,
	Sun,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NBAFantasyZoneLogo from "./NBAFantasyZoneLogo";

export default function Dashboard({
	user,
	onUserChange,
	theme,
	onThemeChange,
}) {
	const navigate = useNavigate();
	const username = user.username;

	const handleLogout = () => {
		onUserChange(null);
		window.localStorage.removeItem("user");
		navigate("/");
	};

	const handleThemeChange = () => {
		if (theme === "light") {
			window.localStorage.setItem("theme", "dark");
			onThemeChange("dark");
		} else {
			window.localStorage.setItem("theme", "light");
			onThemeChange("light");
		}
	};

	const testData = [
		{
			img: "test_img",
			title: "test_title",
			description: "test_description",
		},
		{
			img: "test_img",
			title: "test_title",
			description: "test_description",
		},
		{
			img: "test_img",
			title: "test_title",
			description: "test_description",
		},
		{
			img: "test_img",
			title: "test_title",
			description: "test_description",
		},
	];

	return (
		<div className="flex min-h-screen w-full flex-col">
			<header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
				<nav className="hidden flex-col gap-12 text-lg font-medium md:flex md:flex-row md:items-center md:gap-12 md:text-sm lg:gap-12">
					<Link
						href="#"
						className="flex items-center gap-2 text-lg font-semibold md:text-base"
					>
						<NBAFantasyZoneLogo className="h-6 w-6" />
						<span className="sr-only">NBA Fantasy Zone</span>
					</Link>
					<Link
						href="#"
						className="text-foreground transition-colors hover:text-foreground"
					>
						Dashboard
					</Link>
					<Link
						href="#"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						Leaderboard
					</Link>
					<Link
						href="#"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						Draft
					</Link>
					<Link
						href="#"
						className="text-muted-foreground transition-colors hover:text-foreground"
					>
						Team
					</Link>
				</nav>
				<Sheet>
					<SheetTrigger asChild>
						<Button
							variant="outline"
							size="icon"
							className="shrink-0 md:hidden"
						>
							<Menu className="h-5 w-5" />
							<span className="sr-only">
								Toggle navigation menu
							</span>
						</Button>
					</SheetTrigger>
					<SheetContent side="left">
						<nav className="grid gap-6 text-lg font-medium">
							<Link
								href="#"
								className="flex items-center gap-2 text-lg font-semibold"
							>
								<NBAFantasyZoneLogo className="h-6 w-6" />
								<span className="sr-only">
									NBA Fantasy Zone
								</span>
							</Link>
							<Link href="#" className="hover:text-foreground">
								Dashboard
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								Leaderboard
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								Draft
							</Link>
							<Link
								href="#"
								className="text-muted-foreground hover:text-foreground"
							>
								Team
							</Link>
						</nav>
					</SheetContent>
				</Sheet>
				<div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
					<div className="ml-auto flex-1 sm:flex-initial" />
					<Button
						onClick={handleThemeChange}
						variant="ghost"
						size="icon"
						className="rounded-full"
					>
						{theme === "light" ? <Moon /> : <Sun />}
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="secondary"
								size="icon"
								className="rounded-full"
							>
								<CircleUser className="h-5 w-5" />
								<span className="sr-only">
									Toggle user menu
								</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>{username}</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<button className="w-full text-left">
									Settings
								</button>
							</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem>
								<button
									className="w-full text-left"
									onClick={handleLogout}
								>
									Logout
								</button>
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</header>
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
				<div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
					{testData.map((data, i) => (
						<Card x-chunk="dashboard-01-chunk-0" key={i}>
							<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
								<CardTitle className="text-2xl font-bold">
									{data.title}
								</CardTitle>
							</CardHeader>
							<CardContent>
								<p className="text-xs text-muted-foreground">
									{data.img}
								</p>
								<div className="text-sm font-medium">
									{data.description}
								</div>
							</CardContent>
						</Card>
					))}
				</div>
				<div className="grid flex-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
					<Card
						className="xl:col-span-2"
						x-chunk="dashboard-01-chunk-4"
					>
						<CardHeader className="flex flex-row items-center">
							<div className="grid gap-2">
								<CardTitle>Leaderboard</CardTitle>
								<CardDescription>
									Recent transactions from your store.
								</CardDescription>
							</div>
							<Button asChild size="sm" className="ml-auto gap-1">
								<Link href="#">
									View All
									<ArrowUpRight className="h-4 w-4" />
								</Link>
							</Button>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Customer</TableHead>
										<TableHead className="hidden xl:table-column">
											Type
										</TableHead>
										<TableHead className="hidden xl:table-column">
											Status
										</TableHead>
										<TableHead className="hidden xl:table-column">
											Date
										</TableHead>
										<TableHead className="text-right">
											Amount
										</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>
											<div className="font-medium">
												Liam Johnson
											</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												liam@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Sale
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge
												className="text-xs"
												variant="outline"
											>
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-23
										</TableCell>
										<TableCell className="text-right">
											$250.00
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">
												Olivia Smith
											</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												olivia@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Refund
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge
												className="text-xs"
												variant="outline"
											>
												Declined
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-24
										</TableCell>
										<TableCell className="text-right">
											$150.00
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">
												Noah Williams
											</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												noah@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Subscription
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge
												className="text-xs"
												variant="outline"
											>
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-25
										</TableCell>
										<TableCell className="text-right">
											$350.00
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">
												Emma Brown
											</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												emma@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Sale
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge
												className="text-xs"
												variant="outline"
											>
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-26
										</TableCell>
										<TableCell className="text-right">
											$450.00
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell>
											<div className="font-medium">
												Liam Johnson
											</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												liam@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">
											Sale
										</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge
												className="text-xs"
												variant="outline"
											>
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-27
										</TableCell>
										<TableCell className="text-right">
											$550.00
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-5">
						<CardHeader>
							<CardTitle>Team</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-8">
							{testData.map((data, i) => (
								<div
									className="flex items-center gap-4"
									key={i}
								>
									<Avatar className="hidden h-9 w-9 sm:flex">
										<AvatarImage
											src="/avatars/01.png"
											alt="Avatar"
										/>
										<AvatarFallback>{i}</AvatarFallback>
									</Avatar>
									<div className="grid gap-1">
										<p className="text-sm font-medium leading-none">
											{data.title}
										</p>
										<p className="text-sm text-muted-foreground">
											{data.img}
										</p>
									</div>
									<div className="ml-auto font-medium">
										{data.description}
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
