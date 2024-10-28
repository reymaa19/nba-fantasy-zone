import HeaderNav from "@/components/HeaderNav";
import StatCard from "@/components/StatCard";
import { ModalBody, ModalContent, ModalProvider, ModalTrigger, useModal } from "@/components/ui/animated-modal";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import fantasyService from "@/services/fantasyService";
import newsService from "@/services/newsService";
import teamService from "@/services/teamService";
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
	const [teams, setTeams] = React.useState([]);
	const [team, setTeam] = React.useState([]);
	const [fantasyTeam, setFantasyTeam] = React.useState([]);
	const [playerFantasyPoints, setPlayerFantasyPoints] = React.useState({});
	const user = JSON.parse(window.localStorage.getItem("user"));
	const username = user?.username || "User";

	React.useEffect(() => {
		async function fetchNews() {
			const response = await newsService.getNews();
			setNews(shuffleArray(response.data));
		}

		async function fetchTeam() {
			const response = await teamService.getTeam();
			if (response.length === 0) return;
			const formattedData =
				response.data?.map((player) => ({
					...player,
					image_path: BASE_URL + "/" + player.image_path,
				})) || [];

			setTeam(formattedData);
		}

		async function fetchTeams() {
			const response = await teamService.getTeams();
			setTeams(response.data);
		}

		async function fetchFantasy() {
			const response = await fantasyService.getFantasy();
			const points = response.data.reduce((acc, { PLAYER_ID, NBA_FANTASY_PTS }) => {
				acc[PLAYER_ID] = NBA_FANTASY_PTS;
				return acc;
			}, {});

			setPlayerFantasyPoints(points);
			setFantasyTeam(response.data);
		}

		fetchTeams();
		fetchTeam();
		fetchNews();
		fetchFantasy();
	}, []);

	return (
		<ModalProvider>
			<ModalBody>
				<ModalContent>
					<div className="flex justify-between pb-4">
						<h1 className="w-[318px] ml-10 text-left mt-2">
							{username}'s 2024-2025 Fantasy Team Statistcs
						</h1>
					</div>
					<div className="flex flex-col h-[calc(100vh-200px)] overflow-y-auto pr-4">
						<div className="flex flex-row justify-center flex-wrap gap-[1rem] pt-4">
							{team.map((teamPlayer) => {
								const player = fantasyTeam.find((p) => p.PLAYER_ID == teamPlayer.id) || {
									PTS: 0,
									AST: 0,
									REB: 0,
									TOV: 0,
									BLK: 0,
									STL: 0,
									GP: 0,
									FG3M: 0,
								};
								return (
									<StatCard
										key={teamPlayer.id}
										player={{ ...player, details: teamPlayer }}
										onClick={() => {}}
									/>
								);
							})}
						</div>
					</div>
				</ModalContent>
			</ModalBody>
			<HeaderNav />
			<main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8 h-[93vh] w-full bg-background">
				<div className="flex flex-wrap justify-between gap-4">
					{news.slice(0, 6).map((story) => (
						<Card
							x-chunk="dashboard-01-chunk-0"
							key={story.id}
							className="relative group flex-1 max-w-[15%]"
						>
							<Link to={story.link} target="_blank" rel="noopener noreferrer">
								<AspectRatio ratio={16 / 8}>
									<img
										src={BASE_URL + "/" + story.img}
										alt={story.title + " image"}
										className="absolute inset-0 w-full h-full object-cover group-hover:opacity-30 rounded-xl"
									/>
								</AspectRatio>
								<div className="absolute inset-0 flex flex-col justify-center bg-black bg-opacity-50 text-white rounded-xl">
									<CardHeader>
										<CardTitle className="hidden text-sm xl:text-lg lg:block text-left tracking-wide">
											{story.title}
										</CardTitle>
									</CardHeader>
								</div>
							</Link>
						</Card>
					))}
				</div>
				<div className={`grid flex-1 gap-4 md:gap-8 lg:grid-cols-2 ${user ? "xl:grid-cols-3" : ""}`}>
					<Card className="xl:col-span-2" x-chunk="dashboard-01-chunk-4 ">
						<CardHeader className="flex flex-row items-center">
							<div className="grid gap-2">
								<CardTitle>Leaderboard</CardTitle>
								<CardDescription>Fantasy basketball team rankings</CardDescription>
							</div>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead className="text-left">Username</TableHead>
										<TableHead className="text-left">League</TableHead>
										<TableHead className="text-center">Players</TableHead>
										<TableHead className="text-right">Fantasy Points</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{teams
										?.sort(
											(a, b) =>
												b.players.reduce(
													(acc, cur) => acc + (playerFantasyPoints[cur.id] || 0),
													0,
												) -
												a.players.reduce(
													(acc, cur) => acc + (playerFantasyPoints[cur.id] || 0),
													0,
												),
										)
										.map((team) => {
											return (
												<TableRow key={team.username}>
													<TableCell>
														<div className="font-medium">{team.username}</div>
													</TableCell>
													<TableCell>
														<div className="font-medium">
															{team.username.includes("G") && "G League"}
															{team.username.includes("J") && "J Friends"}
														</div>
													</TableCell>
													<TableCell className="flex justify-center gap-4">
														{team.players.map((player) => (
															<Avatar className="hidden h-9 w-11 sm:flex" key={player.id}>
																<AvatarImage
																	src={BASE_URL + "/" + player.image_path}
																	alt="Avatar"
																/>
																<AvatarFallback>
																	{player.full_name + " profile"}
																</AvatarFallback>
															</Avatar>
														))}
													</TableCell>
													<TableCell className="text-right">
														{team.players
															.reduce(
																(acc, cur) => acc + (playerFantasyPoints[cur.id] || 0),
																0,
															)
															.toFixed(2)}
													</TableCell>
												</TableRow>
											);
										})}
								</TableBody>
							</Table>
						</CardContent>
					</Card>
					{user && (
						<Card x-chunk="dashboard-01-chunk-5">
							<CardHeader className="flex flex-row justify-between pt-6">
								<div className="flex flex-col gap-2">
									<CardTitle>{username}'s Team</CardTitle>
									<CardDescription>Your team's current players and fantasy points</CardDescription>
								</div>
								<ModalTrigger
									className="
inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300 border border-slate-200 bg-white hover:bg-slate-100 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-950 dark:hover:bg-slate-800 dark:hover:text-slate-50 h-9 rounded-md px-3
                                    "
								>
									Expand
								</ModalTrigger>
							</CardHeader>
							<div className="flex flex-row items-center justify-between pt-0 space-y-1.5 p-6">
								<p className="text-muted-foreground font-medium text-sm">Players</p>
								<p className="text-muted-foreground font-medium text-sm">Fantasy Points</p>
							</div>
							<CardContent className="flex flex-col gap-3 mt-[-12px]">
								{team
									.sort((a, b) => {
										const valueA = playerFantasyPoints[a.id] || 0;
										const valueB = playerFantasyPoints[b.id] || 0;
										if (valueB > valueA) return 1;
										else return -1;
									})
									?.map((player) => (
										<div className="flex items-center gap-4 justify-between" key={player.id}>
											<div className="flex items-center gap-4">
												<Avatar className="hidden h-[57px] w-[72px] sm:flex">
													<AvatarImage src={player.image_path} alt="Avatar" />
													<AvatarFallback>{player.full_name + " profile"}</AvatarFallback>
												</Avatar>
												<div className="gap-1">
													<p className="text-sm font-medium leading-none">
														{player.full_name}
													</p>
												</div>
											</div>
											<div className="text-right">{playerFantasyPoints[player.id] || 0}</div>
										</div>
									))}
							</CardContent>
						</Card>
					)}{" "}
				</div>
			</main>
		</ModalProvider>
	);
}
