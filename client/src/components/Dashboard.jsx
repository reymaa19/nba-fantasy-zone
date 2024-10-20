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
import { Input } from "@/components/ui/input";
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
	Activity,
	ArrowUpRight,
	CircleUser,
	CreditCard,
	DollarSign,
	Menu,
	Package2,
	Search,
	Users,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import NBAFantasyZoneLogo from "./NBAFantasyZoneLogo";

const LightModeIcon = () => {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M7.5 0C7.77614 0 8 0.223858 8 0.5V2.5C8 2.77614 7.77614 3 7.5 3C7.22386 3 7 2.77614 7 2.5V0.5C7 0.223858 7.22386 0 7.5 0ZM2.1967 2.1967C2.39196 2.00144 2.70854 2.00144 2.90381 2.1967L4.31802 3.61091C4.51328 3.80617 4.51328 4.12276 4.31802 4.31802C4.12276 4.51328 3.80617 4.51328 3.61091 4.31802L2.1967 2.90381C2.00144 2.70854 2.00144 2.39196 2.1967 2.1967ZM0.5 7C0.223858 7 0 7.22386 0 7.5C0 7.77614 0.223858 8 0.5 8H2.5C2.77614 8 3 7.77614 3 7.5C3 7.22386 2.77614 7 2.5 7H0.5ZM2.1967 12.8033C2.00144 12.608 2.00144 12.2915 2.1967 12.0962L3.61091 10.682C3.80617 10.4867 4.12276 10.4867 4.31802 10.682C4.51328 10.8772 4.51328 11.1938 4.31802 11.3891L2.90381 12.8033C2.70854 12.9986 2.39196 12.9986 2.1967 12.8033ZM12.5 7C12.2239 7 12 7.22386 12 7.5C12 7.77614 12.2239 8 12.5 8H14.5C14.7761 8 15 7.77614 15 7.5C15 7.22386 14.7761 7 14.5 7H12.5ZM10.682 4.31802C10.4867 4.12276 10.4867 3.80617 10.682 3.61091L12.0962 2.1967C12.2915 2.00144 12.608 2.00144 12.8033 2.1967C12.9986 2.39196 12.9986 2.70854 12.8033 2.90381L11.3891 4.31802C11.1938 4.51328 10.8772 4.51328 10.682 4.31802ZM8 12.5C8 12.2239 7.77614 12 7.5 12C7.22386 12 7 12.2239 7 12.5V14.5C7 14.7761 7.22386 15 7.5 15C7.77614 15 8 14.7761 8 14.5V12.5ZM10.682 10.682C10.8772 10.4867 11.1938 10.4867 11.3891 10.682L12.8033 12.0962C12.9986 12.2915 12.9986 12.608 12.8033 12.8033C12.608 12.9986 12.2915 12.9986 12.0962 12.8033L10.682 11.3891C10.4867 11.1938 10.4867 10.8772 10.682 10.682ZM5.5 7.5C5.5 6.39543 6.39543 5.5 7.5 5.5C8.60457 5.5 9.5 6.39543 9.5 7.5C9.5 8.60457 8.60457 9.5 7.5 9.5C6.39543 9.5 5.5 8.60457 5.5 7.5ZM7.5 4.5C5.84315 4.5 4.5 5.84315 4.5 7.5C4.5 9.15685 5.84315 10.5 7.5 10.5C9.15685 10.5 10.5 9.15685 10.5 7.5C10.5 5.84315 9.15685 4.5 7.5 4.5Z"
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
			></path>
		</svg>
	);
};

const DarkModeIcon = () => {
	return (
		<svg
			width="15"
			height="15"
			viewBox="0 0 15 15"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M2.89998 0.499976C2.89998 0.279062 2.72089 0.0999756 2.49998 0.0999756C2.27906 0.0999756 2.09998 0.279062 2.09998 0.499976V1.09998H1.49998C1.27906 1.09998 1.09998 1.27906 1.09998 1.49998C1.09998 1.72089 1.27906 1.89998 1.49998 1.89998H2.09998V2.49998C2.09998 2.72089 2.27906 2.89998 2.49998 2.89998C2.72089 2.89998 2.89998 2.72089 2.89998 2.49998V1.89998H3.49998C3.72089 1.89998 3.89998 1.72089 3.89998 1.49998C3.89998 1.27906 3.72089 1.09998 3.49998 1.09998H2.89998V0.499976ZM5.89998 3.49998C5.89998 3.27906 5.72089 3.09998 5.49998 3.09998C5.27906 3.09998 5.09998 3.27906 5.09998 3.49998V4.09998H4.49998C4.27906 4.09998 4.09998 4.27906 4.09998 4.49998C4.09998 4.72089 4.27906 4.89998 4.49998 4.89998H5.09998V5.49998C5.09998 5.72089 5.27906 5.89998 5.49998 5.89998C5.72089 5.89998 5.89998 5.72089 5.89998 5.49998V4.89998H6.49998C6.72089 4.89998 6.89998 4.72089 6.89998 4.49998C6.89998 4.27906 6.72089 4.09998 6.49998 4.09998H5.89998V3.49998ZM1.89998 6.49998C1.89998 6.27906 1.72089 6.09998 1.49998 6.09998C1.27906 6.09998 1.09998 6.27906 1.09998 6.49998V7.09998H0.499976C0.279062 7.09998 0.0999756 7.27906 0.0999756 7.49998C0.0999756 7.72089 0.279062 7.89998 0.499976 7.89998H1.09998V8.49998C1.09998 8.72089 1.27906 8.89997 1.49998 8.89997C1.72089 8.89997 1.89998 8.72089 1.89998 8.49998V7.89998H2.49998C2.72089 7.89998 2.89998 7.72089 2.89998 7.49998C2.89998 7.27906 2.72089 7.09998 2.49998 7.09998H1.89998V6.49998ZM8.54406 0.98184L8.24618 0.941586C8.03275 0.917676 7.90692 1.1655 8.02936 1.34194C8.17013 1.54479 8.29981 1.75592 8.41754 1.97445C8.91878 2.90485 9.20322 3.96932 9.20322 5.10022C9.20322 8.37201 6.82247 11.0878 3.69887 11.6097C3.45736 11.65 3.20988 11.6772 2.96008 11.6906C2.74563 11.702 2.62729 11.9535 2.77721 12.1072C2.84551 12.1773 2.91535 12.2458 2.98667 12.3128L3.05883 12.3795L3.31883 12.6045L3.50684 12.7532L3.62796 12.8433L3.81491 12.9742L3.99079 13.089C4.11175 13.1651 4.23536 13.2375 4.36157 13.3059L4.62496 13.4412L4.88553 13.5607L5.18837 13.6828L5.43169 13.7686C5.56564 13.8128 5.70149 13.8529 5.83857 13.8885C5.94262 13.9155 6.04767 13.9401 6.15405 13.9622C6.27993 13.9883 6.40713 14.0109 6.53544 14.0298L6.85241 14.0685L7.11934 14.0892C7.24637 14.0965 7.37436 14.1002 7.50322 14.1002C11.1483 14.1002 14.1032 11.1453 14.1032 7.50023C14.1032 7.25044 14.0893 7.00389 14.0623 6.76131L14.0255 6.48407C13.991 6.26083 13.9453 6.04129 13.8891 5.82642C13.8213 5.56709 13.7382 5.31398 13.6409 5.06881L13.5279 4.80132L13.4507 4.63542L13.3766 4.48666C13.2178 4.17773 13.0353 3.88295 12.8312 3.60423L12.6782 3.40352L12.4793 3.16432L12.3157 2.98361L12.1961 2.85951L12.0355 2.70246L11.8134 2.50184L11.4925 2.24191L11.2483 2.06498L10.9562 1.87446L10.6346 1.68894L10.3073 1.52378L10.1938 1.47176L9.95488 1.3706L9.67791 1.2669L9.42566 1.1846L9.10075 1.09489L8.83599 1.03486L8.54406 0.98184ZM10.4032 5.30023C10.4032 4.27588 10.2002 3.29829 9.83244 2.40604C11.7623 3.28995 13.1032 5.23862 13.1032 7.50023C13.1032 10.593 10.596 13.1002 7.50322 13.1002C6.63646 13.1002 5.81597 12.9036 5.08355 12.5522C6.5419 12.0941 7.81081 11.2082 8.74322 10.0416C8.87963 10.2284 9.10028 10.3497 9.34928 10.3497C9.76349 10.3497 10.0993 10.0139 10.0993 9.59971C10.0993 9.24256 9.84965 8.94373 9.51535 8.86816C9.57741 8.75165 9.63653 8.63334 9.6926 8.51332C9.88358 8.63163 10.1088 8.69993 10.35 8.69993C11.0403 8.69993 11.6 8.14028 11.6 7.44993C11.6 6.75976 11.0406 6.20024 10.3505 6.19993C10.3853 5.90487 10.4032 5.60464 10.4032 5.30023Z"
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"
			></path>
		</svg>
	);
};

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
						{theme === "light" ? (
							<DarkModeIcon />
						) : (
							<LightModeIcon />
						)}
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
					<Card x-chunk="dashboard-01-chunk-0">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<DollarSign className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">$45,231.89</div>
							<p className="text-xs text-muted-foreground">
								+20.1% from last month
							</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-1">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Subscriptions
							</CardTitle>
							<Users className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+2350</div>
							<p className="text-xs text-muted-foreground">
								+180.1% from last month
							</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-2">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Sales
							</CardTitle>
							<CreditCard className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+12,234</div>
							<p className="text-xs text-muted-foreground">
								+19% from last month
							</p>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-3">
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium">
								Active Now
							</CardTitle>
							<Activity className="h-4 w-4 text-muted-foreground" />
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">+573</div>
							<p className="text-xs text-muted-foreground">
								+201 since last hour
							</p>
						</CardContent>
					</Card>
				</div>
				<div className="grid flex-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
					<Card
						className="xl:col-span-2"
						x-chunk="dashboard-01-chunk-4"
					>
						<CardHeader className="flex flex-row items-center">
							<div className="grid gap-2">
								<CardTitle>Transactions</CardTitle>
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
							<CardTitle>Recent Sales</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-8">
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage
										src="/avatars/01.png"
										alt="Avatar"
									/>
									<AvatarFallback>OM</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Olivia Martin
									</p>
									<p className="text-sm text-muted-foreground">
										olivia.martin@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$1,999.00
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage
										src="/avatars/02.png"
										alt="Avatar"
									/>
									<AvatarFallback>JL</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Jackson Lee
									</p>
									<p className="text-sm text-muted-foreground">
										jackson.lee@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$39.00
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage
										src="/avatars/03.png"
										alt="Avatar"
									/>
									<AvatarFallback>IN</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Isabella Nguyen
									</p>
									<p className="text-sm text-muted-foreground">
										isabella.nguyen@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$299.00
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage
										src="/avatars/04.png"
										alt="Avatar"
									/>
									<AvatarFallback>WK</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										William Kim
									</p>
									<p className="text-sm text-muted-foreground">
										will@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$99.00
								</div>
							</div>
							<div className="flex items-center gap-4">
								<Avatar className="hidden h-9 w-9 sm:flex">
									<AvatarImage
										src="/avatars/05.png"
										alt="Avatar"
									/>
									<AvatarFallback>SD</AvatarFallback>
								</Avatar>
								<div className="grid gap-1">
									<p className="text-sm font-medium leading-none">
										Sofia Davis
									</p>
									<p className="text-sm text-muted-foreground">
										sofia.davis@email.com
									</p>
								</div>
								<div className="ml-auto font-medium">
									+$39.00
								</div>
							</div>
						</CardContent>
					</Card>
				</div>
			</main>
		</div>
	);
}
