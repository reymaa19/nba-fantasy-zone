import HeaderNav from "@/components/HeaderNav";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import newsService from "@/services/newsService";
import teamService from "@/services/teamService";
import { ArrowUpRight } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;

const shuffleArray = (array) => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
};

export default function Dashboard() {
	const [news, setNews] = React.useState([]);
	const [team, setTeam] = React.useState([]);
	const user = JSON.parse(window.localStorage.getItem("user"));
	const username = user?.username || "demo-user";

	React.useEffect(() => {
		async function fetchNews() {
			const response = await newsService.getNews();
			setNews(shuffleArray(response.data));
		}

		async function fetchTeam() {
			const response = await teamService.getTeam();
			setTeam(response.data);
		}

		fetchTeam();
		fetchNews();
	}, []);

	return (
		<>
			<HeaderNav />
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 h-[93vh] w-full bg-background">
				<div className="flex flex-wrap justify-between gap-4">
					{news.slice(0, 6).map((story) => (
						<Card
							x-chunk="dashboard-01-chunk-0"
							key={story.id}
							className="relative group flex-1 max-w-[16%]"
						>
							<Link to={story.link} target="_blank" rel="noopener noreferrer">
								<AspectRatio ratio={16 / 9}>
									<img
										src={BASE_URL + "/" + story.img}
										alt={story.title + " image"}
										className="absolute inset-0 w-full h-full object-cover group-hover:opacity-50 rounded-xl"
									/>
								</AspectRatio>
								<div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white p-4 rounded-xl">
									<CardHeader className="flex flex-row items-center justify-between space-y-0">
										<CardTitle className="text-2xl font-bold">{story.title}</CardTitle>
									</CardHeader>
									<div className="absolute inset-0 flex flex-col justify-center items-center opacity-0 hover:opacity-100 bg-background bg-opacity-100 text-muted-foreground pt-4 rounded-xl">
										<CardContent>
											<div className="text-sm font-medium">{story.description}</div>
										</CardContent>
									</div>
								</div>
							</Link>
						</Card>
					))}
				</div>
				<div className="grid flex-1 gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
					<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4">
						<CardHeader className="flex flex-row items-center">
							<div className="grid gap-2">
								<CardTitle>Leaderboard</CardTitle>
								<CardDescription>Recent transactions from your store.</CardDescription>
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
										<TableHead className="hidden xl:table-column">Type</TableHead>
										<TableHead className="hidden xl:table-column">Status</TableHead>
										<TableHead className="hidden xl:table-column">Date</TableHead>
										<TableHead className="text-right">Amount</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									<TableRow>
										<TableCell>
											<div className="font-medium">Liam Johnson</div>
											<div className="hidden text-sm text-muted-foreground md:inline">
												liam@example.com
											</div>
										</TableCell>
										<TableCell className="hidden xl:table-column">Sale</TableCell>
										<TableCell className="hidden xl:table-column">
											<Badge className="text-xs" variant="outline">
												Approved
											</Badge>
										</TableCell>
										<TableCell className="hidden md:table-cell lg:hidden xl:table-column">
											2023-06-23
										</TableCell>
										<TableCell className="text-right">$250.00</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</CardContent>
					</Card>
					<Card x-chunk="dashboard-01-chunk-5">
						<CardHeader>
							<CardTitle>{username}'s Team</CardTitle>
						</CardHeader>
						<CardContent className="grid gap-3">
							{team?.map((player) => (
								<div className="flex items-center gap-4" key={player.id}>
									<Avatar className="hidden h-9 w-9 sm:flex">
										<AvatarImage src={BASE_URL + "/" + player.image_path} alt="Avatar" />
										<AvatarFallback>{player.full_name + " profile"}</AvatarFallback>
									</Avatar>
									<div className="grid gap-1">
										<p className="text-sm font-medium leading-none">{player.full_name}</p>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</main>
		</>
	);
}
